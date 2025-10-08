import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "../redux/crypto/cryptoSlice.js";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});
