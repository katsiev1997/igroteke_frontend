import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import { clubType, ClubSliceState, Status } from './types';

const initialState: ClubSliceState = {
  clubs: [],
  status: Status.LOADING,
};

export const fetchClubs = createAsyncThunk<clubType[]>(
  'clubs/fetchClubsStatus',
  async () => {
    const { data } = await axios.get<clubType[]>(
      'http://localhost:5000/api/clubs'
    );
    return data;
  }
);

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    setClubs: (state, action) => {
      state.clubs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClubs.pending, (state) => {
      state.status = Status.LOADING;
      state.clubs = [];
    });
    builder.addCase(
      fetchClubs.fulfilled,
      (state, action: PayloadAction<clubType[]>) => {
        state.status = Status.SUCCESS;
        state.clubs = action.payload;
      }
    );
    builder.addCase(fetchClubs.rejected, (state) => {
      state.status = Status.ERROR;
      state.clubs = [];
    });
  },
});

export const { setClubs } = clubSlice.actions;

export const club = clubSlice.reducer;
