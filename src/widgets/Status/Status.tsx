import React from 'react';
import cls from './Status.module.scss';
import {
  RootState,
  useAppDispatch,
} from 'src/app/provider/StoreProvider/config/store';
import { setTimeReserve } from 'src/features/Reserve';
import { useSelector } from 'react-redux';

interface StatusProps {
  timeSlots: boolean[];
}

export const Status: React.FC<StatusProps> = ({ timeSlots }) => {
  const dispatch = useAppDispatch();
  const { from, to } = useSelector((state: RootState) => state.reserve);
  console.log(from, to);
  const setTime = (time: number) => {
    dispatch(setTimeReserve(time));
  };
  return (
    <div className={cls.status}>
      {timeSlots.map((status, i) => (
        <div
          onClick={() => setTime(i)}
          key={i}
          className={from && to && from <= i && i <= to ? `${cls.status_slot} ${cls.reserve}` :
            status
              ? `${cls.status_slot} ${cls.free}`
              : `${cls.status_slot} ${cls.occupied}`
          }
        >
          {' '}
          <h5> {status ? 'free' : 'reserved'}</h5>
        </div>
      ))}
    </div>
  );
};
