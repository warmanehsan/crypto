import { createSlice } from "@reduxjs/toolkit";
import { loadFromCache, syncWithAPI } from "./cryptoThunks";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    lastSync: null,
    currentPage: 1,
    pageSize: 50,
    searchQuery: "",
    filteredItems: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      if (action.payload.trim() === "") {
        state.filteredItems = [];
      } else {
        const query = action.payload.toLowerCase();
        state.filteredItems = state.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.symbol.toLowerCase().includes(query)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFromCache.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadFromCache.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadFromCache.rejected, (state) => {
        state.status = "loading";
      })
      .addCase(syncWithAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.lastSync = new Date().toISOString();
      })
      .addCase(syncWithAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPage, setSearchQuery } = cryptoSlice.actions;
export default cryptoSlice.reducer;
