import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $api } from 'src/shared/api';
import {
  StatusCustomer,
  customerSliceType,
  customerType,
} from '../types/types';
import { LOCAL_STORAGE_TOKEN } from 'src/shared/consts/localStorage';
import { customerData } from '../types/customer';

const initialState: customerSliceType = {
  status: StatusCustomer.LOADING,
  customer: null,
};

export const customerLogin = createAsyncThunk<customerType, customerData>(
  'customer/login',
  async (values) => {
    const { phone, password } = values;
    const res = await $api.post('/login', { phone, password });
    console.log(res.data.message)
    localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.access_token);
    return res.data.customer;
  }
);
export const customerAuth = createAsyncThunk('customer/auth', async () => {
  try {
    const res = await $api.get('/refresh_token');
    localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.access_token);
    return res.data.customer;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
});
export const customerLogout = createAsyncThunk<any>('customer/logout', async () => {
  try {
    const res = await $api.post('/logout');
    console.log(res.data.message);
    localStorage.setItem(LOCAL_STORAGE_TOKEN, '');
    return null;
  } catch (error: any) {
    alert(error.response.data.message);
  }
});

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(customerAuth.pending, (state) => {
      state.status = StatusCustomer.LOADING;
      state.customer = null;
    });
    builder.addCase(customerAuth.fulfilled, (state, action) => {
      state.status = StatusCustomer.SUCCESS;
      state.customer = action.payload;
    });
    builder.addCase(customerAuth.rejected, (state) => {
      state.status = StatusCustomer.ERROR;
      state.customer = null;
    });
    builder.addCase(customerLogin.pending, (state) => {
      state.status = StatusCustomer.LOADING;
      state.customer = null;
    });
    builder.addCase(customerLogin.fulfilled, (state, action) => {
      state.status = StatusCustomer.SUCCESS;
      state.customer = action.payload;
    });
    builder.addCase(customerLogin.rejected, (state) => {
      state.status = StatusCustomer.ERROR;
      state.customer = null;
    });
    builder.addCase(customerLogout.pending, (state) => {
      state.status = StatusCustomer.LOADING;
      state.customer = null;
    });
    builder.addCase(customerLogout.fulfilled, (state, action) => {
      state.status = StatusCustomer.SUCCESS;
      state.customer = action.payload;
    });
    builder.addCase(customerLogout.rejected, (state) => {
      state.status = StatusCustomer.ERROR;
      state.customer = null;
    });
  },
});

export const customer = customerSlice.reducer;
