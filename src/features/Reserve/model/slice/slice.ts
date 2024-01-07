import { createSlice } from '@reduxjs/toolkit';
import { timeReserveType } from '../types/timeReserveType';

const initialState: timeReserveType = {
  from: null,
  to: null,
};

const reserveSlice = createSlice({
  name: 'timeReserve',
  initialState,
  reducers: {
    setTimeReserve: (state, action) => {
      if (action.payload === 100) {
        state.from = null;
        state.to = null;
      } else if (state.from === null) {
        state.from = action.payload;
      } else if (action.payload < state.from) {
        // alert('Сначала выберите на какое время бронировать, а затем конец брони');
        state.from = null;
      } else if (state.to === null) {
        state.to = action.payload;
      } else {
        state.to = null;
        state.from = null;
      }
    },
  },
});

export const { setTimeReserve } = reserveSlice.actions;

export const reserve = reserveSlice.reducer;
