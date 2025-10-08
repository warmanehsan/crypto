import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptos } from "../../api/cryptoApi";
import { readFromIndexedDB, saveToIndexedDB } from "../indexedDB";

export const loadFromCache = createAsyncThunk(
  "crypto/loadFromCache",
  async (_, { rejectWithValue }) => {
    try {
      const data = await readFromIndexedDB("cryptoList");
      return data || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const syncWithAPI = createAsyncThunk(
  "crypto/syncWithAPI",
  async (_, { rejectWithValue }) => {
    try {
      const apiData = await fetchCryptos(1, 100);
      const list = apiData.data.cryptoCurrencyList || [];
      const sortedList = list.slice().sort((a, b) => a.cmcRank - b.cmcRank);
      await saveToIndexedDB("cryptoList", sortedList);
      return sortedList;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
