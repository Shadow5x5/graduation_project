import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

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

interface AircraftState {
    aircrafts: Aircraft[];
    aircraftCategories: string[];
    manufacturers: string[];
    maxPassengerCapacity: string;
    filteredSortedAircrafts: Aircraft[];
    selectedCategories: string[];
    selectedManufacturers: string[];
    passengerCountRange: {min: number; max: number};
    sortOrder: "CruisingSpeed" | "Range" | "MaximumNumberOfPassengers" | "";
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | undefined;
}

const initialState: AircraftState = {
    aircrafts: [],
    aircraftCategories: [],
    manufacturers: [],
    maxPassengerCapacity: "0",
    filteredSortedAircrafts: [],
    selectedCategories: [],
    selectedManufacturers: [],
    passengerCountRange: {min: 0, max: Infinity},
    sortOrder: "",
    status: "idle",
    error: undefined,
};

export const fetchAircrafts = createAsyncThunk("aircraft/fetchAircrafts", async (query: string) => {
    const response = await axios.post<Aircraft[]>("http://localhost:3000/search", {query});
    return response.data;
});

export const fetchAircraftCategories = createAsyncThunk(
    "aircraft/fetchAircraftCategories",
    async () => {
        const response = await axios.get<string[]>("http://localhost:3000/allCategories");
        return response.data;
    },
);

export const fetchAircraftManufacturers = createAsyncThunk(
    "aircraft/fetchAircraftManufacturers",
    async () => {
        const response = await axios.get<string[]>("http://localhost:3000/allManufacturers");
        return response.data;
    },
);

export const fetchMaxPassengerCapacity = createAsyncThunk(
    "aircraft/fetchMaxPassengerCapacity",
    async () => {
        const response = await axios.get<string>("http://localhost:3000/maxPassengers");
        return response.data;
    },
);

const aircraftSlice = createSlice({
    name: "aircraft",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Aircraft[]>) => {
            if (state.filteredSortedAircrafts.length === 0) {
                state.filteredSortedAircrafts = action.payload;
            } else {
                state.filteredSortedAircrafts = action.payload;
                aircraftSlice.caseReducers.applyFiltersAndSort(state);
            }
        },
        setSelectedTypes: (state, action: PayloadAction<string>) => {
            const type = action.payload;
            if (state.selectedCategories.includes(type)) {
                state.selectedCategories = state.selectedCategories.filter((t) => t !== type);
            } else {
                state.selectedCategories = [...state.selectedCategories, type];
            }
            aircraftSlice.caseReducers.applyFiltersAndSort(state);
        },
        setSelectedManufacturers: (state, action: PayloadAction<string>) => {
            const manufacturer = action.payload;
            console.log(manufacturer);
            if (state.selectedManufacturers.includes(manufacturer)) {
                state.selectedManufacturers = state.selectedManufacturers.filter(
                    (m) => m !== manufacturer,
                );
            } else {
                state.selectedManufacturers = [...state.selectedManufacturers, manufacturer];
            }
            aircraftSlice.caseReducers.applyFiltersAndSort(state);
        },

        setPassengerCountRange: (state, action: PayloadAction<{min: number; max: number}>) => {
            let min = action.payload.min;
            let max = action.payload.max;
            if (isNaN(min)) min = 0;
            if (isNaN(max)) max = Number(state.maxPassengerCapacity);
            state.passengerCountRange = {min, max};
            aircraftSlice.caseReducers.applyFiltersAndSort(state);
        },
        setSortOrder: (
            state,
            action: PayloadAction<"CruisingSpeed" | "Range" | "MaximumNumberOfPassengers" | "">,
        ) => {
            state.sortOrder = action.payload;
            aircraftSlice.caseReducers.applyFiltersAndSort(state);
        },
        applyFiltersAndSort: (state) => {
            const filteredItems = state.aircrafts.filter(
                (item) =>
                    (state.selectedCategories.length === 0 ||
                        state.selectedCategories.includes(item.AircraftCategory)) &&
                    (state.selectedManufacturers.length === 0 ||
                        state.selectedManufacturers.some((manufacturer) =>
                            item.AircraftName.includes(manufacturer),
                        )) &&
                    Number(item.MaximumNumberOfPassengers) >= state.passengerCountRange.min &&
                    Number(item.MaximumNumberOfPassengers) <= state.passengerCountRange.max,
            );
            switch (state.sortOrder) {
                case "Range":
                    filteredItems.sort((a, b) => {
                        const rangeA = a.Range ? Number(a.Range.replace(/\s+/g, "")) : 0;
                        const rangeB = b.Range ? Number(b.Range.replace(/\s+/g, "")) : 0;
                        return rangeA - rangeB;
                    });
                    break;
                case "MaximumNumberOfPassengers":
                    filteredItems.sort((a, b) => {
                        const maxPassengersA = a.MaximumNumberOfPassengers
                            ? Number(a.MaximumNumberOfPassengers.replace(/\s+/g, ""))
                            : 0;
                        const maxPassengersB = b.MaximumNumberOfPassengers
                            ? Number(b.MaximumNumberOfPassengers.replace(/\s+/g, ""))
                            : 0;

                        return maxPassengersA - maxPassengersB;
                    });
                    break;
                case "CruisingSpeed":
                    filteredItems.sort((a, b) => {
                        const cruisingSpeedA = a.CruisingSpeed
                            ? Number(a.CruisingSpeed.replace(/\s+/g, ""))
                            : 0;
                        const cruisingSpeedB = b.CruisingSpeed
                            ? Number(b.CruisingSpeed.replace(/\s+/g, ""))
                            : 0;

                        return cruisingSpeedA - cruisingSpeedB;
                    });
                    break;
                default:
                    break;
            }
            state.filteredSortedAircrafts = filteredItems;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAircrafts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAircrafts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.aircrafts = action.payload;
                const simulatedAction = {type: "setItems", payload: action.payload};
                aircraftSlice.caseReducers.setItems(state, simulatedAction);
            })
            .addCase(fetchAircrafts.rejected, (state, action) => {
                state.status = "failed";
                console.error(action.error);
                state.error = action.error.message;
            })
            .addCase(fetchAircraftCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAircraftCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.aircraftCategories = action.payload;
            })
            .addCase(fetchAircraftCategories.rejected, (state, action) => {
                state.status = "failed";
                console.error(action.error);
                state.error = action.error.message;
            })
            .addCase(fetchAircraftManufacturers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAircraftManufacturers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.manufacturers = action.payload;
            })
            .addCase(fetchAircraftManufacturers.rejected, (state, action) => {
                state.status = "failed";
                console.error(action.error);
                state.error = action.error.message;
            })
            .addCase(fetchMaxPassengerCapacity.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMaxPassengerCapacity.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.maxPassengerCapacity = action.payload;
                state.passengerCountRange.min = 0;
                state.passengerCountRange.max = Number(action.payload);
            })
            .addCase(fetchMaxPassengerCapacity.rejected, (state, action) => {
                state.status = "failed";
                console.error(action.error);
                state.error = action.error.message;
            });
    },
});

export default aircraftSlice.reducer;
export const {
    setItems,
    setSelectedTypes,
    setSelectedManufacturers,
    setPassengerCountRange,
    setSortOrder,
    applyFiltersAndSort,
} = aircraftSlice.actions;
