import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import https from "https";
import cors from "cors";
import neo4j from "neo4j-driver";
require("dotenv").config();

const username = process.env.LOGIN;
const password = process.env.PASSWORD;
const uri = process.env.NEO4J_URI;
const usernameNEO4J = process.env.NEO4J_USER;
const passwordNEO4J = process.env.NEO4J_PASSWORD;

interface Aircraft {
    id: string;
    BasicDescription: string[];
    InteriorDescription: string[];
    PriceDescription: string[];
    Aircraft: string;
    AircraftCategory: string;
    SeatCapacity: string;
    CabinHeight: string;
    CargoVolume: string;
    Range: string;
    MaxTakeoffWeight: string;
    CruisingSpeed: string;
    MaximumFlightAltitude: string;
    AircraftLength: string;
    AircraftHeight: string;
    Wingspan: string;
    MaximumNumberOfPassengers: string;
    CabinWidth: string;
    CabinLength: string;
    CabinVolume: string;
    AircraftName: string;
    MainImg: string;
    SliderImages: string[];
}

interface ElasticsearchResponse<T> {
    hits: {
        hits: Array<{
            _source: T;
        }>;
    };
}

interface Bucket {
    key: string;
    doc_count: number;
}

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

const basicAuth = "Basic " + btoa(username + ":" + password);

const app = express();
app.use(cors());
const port = 3000;
console.log(username, password);

app.use(bodyParser.json());

if (!uri || !usernameNEO4J || !passwordNEO4J) {
    throw new Error("Missing necessary environment variables for Neo4j configuration");
}

const driver = neo4j.driver(
    uri,
    neo4j.auth.basic(usernameNEO4J, passwordNEO4J)
);

interface Node {
    identity: {low: number; high: number};
    labels: string[];
    properties: Aircraft;
    elementId: string;
}

app.post("/search", async (req, res) => {
    const {query} = req.body;
    try {
        const response = await axios.post<ElasticsearchResponse<Aircraft>>(
            `https://localhost:9200/aircraft_data/_search`,
            {
                size: 300,
                query: {
                    multi_match: {
                        query: query,
                        fields: [
                            // "BasicDescription",
                            // "InteriorDescription",
                            "Aircraft",
                            // "AircraftCategory",
                            "AircraftName",
                        ],
                        fuzziness: "AUTO",
                    },
                },
            },
            {
                headers: {
                    Authorization: basicAuth,
                },
                httpsAgent: httpsAgent,
            },
        );
        // console.log(response.data.hits.hits.map((hit) => hit._source));
        res.json(response.data.hits.hits.map((hit) => hit._source));
    } catch (error) {
        res.status(500).send("An error occurred while processing your request.");
    }
});

app.get("/allCategories", async (req, res) => {
    try {
        const response = await axios.post(
            `https://localhost:9200/aircraft_data/_search`,
            {
                size: 0,
                aggs: {
                    unique_categories: {
                        terms: {
                            field: "AircraftCategory.keyword",
                            size: 300,
                        },
                    },
                },
            },
            {
                headers: {
                    Authorization: basicAuth,
                },
                httpsAgent: httpsAgent,
            },
        );

        const categories = response.data.aggregations.unique_categories.buckets.map(
            (bucket: Bucket) => bucket.key,
        );
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching categories.");
    }
});

app.get("/maxPassengers", async (req, res) => {
    try {
        const response = await axios.post(
            `https://localhost:9200/aircraft_data/_search`,
            {
                size: 0,
                aggs: {
                    unique_maxNumbers: {
                        terms: {
                            field: "MaximumNumberOfPassengers.keyword",
                            size: 300,
                        },
                    },
                },
            },
            {
                headers: {
                    Authorization: basicAuth,
                },
                httpsAgent: httpsAgent,
            },
        );

        const maxNumber = response.data.aggregations.unique_maxNumbers.buckets.map(
            (bucket: Bucket) => bucket.key,
        );
        const numberArray = maxNumber.map(Number);
        const maxValue = Math.max(...numberArray);
        res.json(maxValue);
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "An error occurred while calculating the maximum number of passengers.",
        );
    }
});
app.get("/allManufacturers", async (req, res) => {
    try {
        const response = await axios.post(
            `https://localhost:9200/aircraft_data/_search`,
            {
                size: 0,
                aggs: {
                    unique_manufacturers: {
                        terms: {
                            field: "AircraftName.keyword",
                            size: 300,
                        },
                    },
                },
            },
            {
                headers: {
                    Authorization: basicAuth,
                },
                httpsAgent: httpsAgent,
            },
        );

        const manufacturers = response.data.aggregations.unique_manufacturers.buckets.map(
            (bucket: Bucket) => bucket.key.split(" ")[0],
        );
        const uniqueArray = [...new Set(manufacturers)];
        res.json(uniqueArray);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching manufacturers.");
    }
});



app.post("/recommendations", async (req, res) => {
    const {Id} = req.body;

    if (!Id) {
        return res.status(400).send({error: "ID is required"});
    }

    console.log("Request ID: ", Id);
    const session = driver.session();
    let aircrafts: Node[] = [];
    const queries = [
        `MATCH (a:Aircraft {id: $id})-[:HAS_CATEGORY]->(c), (a)-[:HAS_TYPE]->(t), (a)-[:HAS_MANUFACTURER]->(m), 
         (b)-[:HAS_CATEGORY]->(c), (b)-[:HAS_TYPE]->(t), (b)-[:HAS_MANUFACTURER]->(m)
         RETURN DISTINCT b LIMIT 3`,
        `MATCH (a:Aircraft {id: $id})-[:HAS_TYPE]->(t), (a)-[:HAS_MANUFACTURER]->(m),
         (b)-[:HAS_TYPE]->(t), (b)-[:HAS_MANUFACTURER]->(m)
         RETURN DISTINCT b LIMIT 3`,
        `MATCH (a:Aircraft {id: $id})-[:HAS_TYPE]->(t), (a)-[:HAS_CATEGORY]->(c),
         (b)-[:HAS_TYPE]->(t), (b)-[:HAS_CATEGORY]->(c)
         RETURN DISTINCT b LIMIT 3`,
        `MATCH (a:Aircraft {id: $id})-[:HAS_TYPE]->(t),
         (b)-[:HAS_TYPE]->(t)
         RETURN DISTINCT b LIMIT 3`,
        `MATCH (a:Aircraft {id: $id}), (b:Aircraft) WHERE a <> b
         RETURN DISTINCT b LIMIT 3`,
    ];

    try {
        for (const query of queries) {
            const queryResult = await session.executeRead((tx) => tx.run(query, {id: Id}));
            const newAircrafts = queryResult.records.map((row) => row.get("b"));

            aircrafts = [...aircrafts, ...newAircrafts].slice(0, 3);
            if (aircrafts.length >= 3) break;
        }

        if (aircrafts.length < 3) {
            return res.status(404).send({error: "Not enough recommendations found"});
        }

        res.json(aircrafts.map((node) => node.properties));
    } catch (error) {
        console.error("Failed to get recommendations:", error);
        res.status(500).send({error: "Failed to get recommendations"});
    }
});

const server = app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

async function gracefulShutdown() {
    console.log("Closing server...");
    server.close(async (err) => {
        if (err) {
            console.error("Error during server shutdown", err);
            process.exit(1);
        }

        console.log("Server closed");

        try {
            await driver.close();
            console.log("Neo4j driver has been closed.");
        } catch (err) {
            console.error("Error during Neo4j driver shutdown", err);
        }

        process.exit(0);
    });
}

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
