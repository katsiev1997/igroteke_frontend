import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { club } from 'src/entities/Club'
import { customer } from 'src/entities/Customer';
import { reserve } from 'src/features/Reserve';

export const store = configureStore({
  reducer: {
    club,
    customer,
    reserve
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
