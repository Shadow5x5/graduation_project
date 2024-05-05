import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import https from "https";
import cors from "cors";
require("dotenv").config();

const username = process.env.LOGIN;
const password = process.env.PASSWORD;

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
        console.log(response.data.hits.hits.map((hit) => hit._source));
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
        console.log("t")
        res.json(uniqueArray);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching manufacturers.");
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
