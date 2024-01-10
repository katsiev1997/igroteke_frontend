import React from 'react';
import cls from './HomePage.module.scss';
import { useSelector } from 'react-redux';

import {
  HomeOutlined,
  LoadingOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

import { Status, Time } from 'src/widgets';
import { Reserve } from 'src/features';
import { fetchClubs } from 'src/entities/Club';
import { setClub, setRoom, setTimeReserve } from 'src/features/Reserve';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { StateSchema } from 'src/app/provider/StoreProvider/config/StateSchema';
import { Select } from 'antd';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clubs, status } = useSelector((state: StateSchema) => state.club);
  const { club, room } =useSelector((state: StateSchema) => state.reserve);
  const Club = clubs[club]
  React.useEffect(() => {
    const getClubs = () => {
     dispatch(fetchClubs());
    }
      getClubs()
  }, [dispatch]);

  React.useEffect(() => {
    if (clubs && clubs.length > 0) {
      (Club);
    }
  }, [clubs, Club]);

  const clubNames = clubs.map((club, i) => ({
    value: i,
    label: `Клуб: ${club.name}`,
  }));

  return (
    <main>
      {status === 'error' ? (
        <div>
          <h2 className='error'>Произошла ошибка</h2>
          <p className='error-text'>
            К сожалению, возникла ошибка при загрузке страницы. Пожалуйста,
            попробуйте перезагрузить страницу.
          </p>
        </div>
      ) : status === 'loading' ? (
        <div>
          <h2>
            Loading ... <LoadingOutlined style={{ fontSize: '40px' }} />
          </h2>
        </div>
      ) : (
        <div>
          <Select
            showSearch
            size='large'
            style={{ width: 300, margin: '10px' }}
            placeholder={`Клуб: ${Club?.name}`}
            className={cls.clubName}
            popupClassName={cls.clubName}
            onChange={(i) => {
              dispatch(setRoom(0))
              dispatch(setClub(i))
            } }
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={clubNames}
          />
          <p>
            {' '}
            <HomeOutlined /> {Club?.address}
          </p>
          <p className={cls.phone}>
            {' '}
            <PhoneOutlined /> +7{Club?.phone}
          </p>
          <hr />
          <div className={cls.time_status_rooms}>
            {Club && (
              <div className={cls.time_status}>
                <Time />
                <Status timeSlots={Club.rooms[room].availableTimeSlots} />
              </div>
            )}
            {Club && Club.rooms && (
              <div className={cls.play_rooms}>
                <h3>Play room </h3>
                <div>
                  {Club.rooms.map((item, i) => (
                    <div
                      onClick={() => {
                        dispatch(setTimeReserve(100));
                        dispatch(setRoom(i));
                      }}
                      key={i}
                      className={
                        room === i ? `${cls.room} ${cls.active}` : cls.room
                      }
                    >
                      {item.name}
                    </div>
                  ))}
                </div>

                <Reserve
                  nameClub={Club.name}
                  idClub={Club._id}
                  roomNum={room}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
