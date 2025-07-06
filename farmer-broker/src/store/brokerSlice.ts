import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Broker {
  _id: string;
  fullname: string;
  email: string;
  phoneNo: string;
  location: string;
  profilePhoto?: string;
  rating?: number;
  ratingCount?: number;
}

interface BrokerState {
  brokers: Broker[];
  brokersWithRatings: Broker[];
}

const initialState: BrokerState = {
  brokers: [],
  brokersWithRatings: [],
};

const brokerSlice = createSlice({
  name: "broker",
  initialState,
  reducers: {
    setBrokers: (state, action: PayloadAction<Broker[]>) => {
      state.brokers = action.payload;
    },
    clearBrokers: (state) => {
      state.brokers = [];
    },
    setBrokersWithRatings: (state, action: PayloadAction<Broker[]>) => {
      state.brokersWithRatings = action.payload;
    },
    clearBrokersWithRatings: (state) => {
      state.brokersWithRatings = [];
    },
  },
});

export const {
  setBrokers,
  clearBrokers,
  setBrokersWithRatings,
  clearBrokersWithRatings,
} = brokerSlice.actions;

export default brokerSlice.reducer;
