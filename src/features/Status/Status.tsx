import React from 'react';
import cls from './Status.module.scss';

interface StatusProps {
  timeSlots: boolean[];
}

export const Status: React.FC<StatusProps> = ({ timeSlots }) => {
  return (
    <div className={cls.status}>
      {timeSlots.map((status, i) => (
        <div
          key={i}
          className={
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
