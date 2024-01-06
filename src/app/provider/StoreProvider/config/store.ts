import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { club } from 'src/entities/Club/index'

export const store = configureStore({
  reducer: {
    club,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
