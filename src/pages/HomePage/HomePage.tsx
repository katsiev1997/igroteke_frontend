import React from 'react';
import cls from './HomePage.module.scss';
import { useSelector } from 'react-redux';

import {
  CaretDownOutlined,
  CaretRightOutlined,
  HomeOutlined,
  LoadingOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

import { Status, Time } from 'src/widgets';
import { Reserve } from 'src/features';
import { clubType, fetchClubs } from 'src/entities/Club';
import {
  RootState,
  useAppDispatch,
} from 'src/app/provider/StoreProvider/config/store';
import { customerAuth } from 'src/entities/Customer';
import { setTimeReserve } from 'src/features/Reserve';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clubs, status } = useSelector((state: RootState) => state.club);

  const [open, setOpen] = React.useState<boolean>(false);
  const [room, setRoom] = React.useState<number>(0);
  const [club, setClub] = React.useState<clubType>();

  React.useEffect(() => {
    const getClubs = async () => {
      dispatch(fetchClubs());
      dispatch(customerAuth());
    };
    getClubs();
  }, [dispatch]);

  React.useEffect(() => {
    if (clubs && clubs.length > 0) {
      setClub(clubs[0]);
    }
  }, [clubs]);

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
          <h2 onClick={() => setOpen(!open)}>
            {club && club.name}{' '}
            <CaretDownOutlined style={{ fontSize: '18px' }} />{' '}
          </h2>
          <h3>
            {' '}
            <HomeOutlined /> {club?.address}
          </h3>
          <h3>
            {' '}
            <PhoneOutlined /> +7{club?.phone}
          </h3>
          {open && clubs && (
            <ul>
              {clubs.map((club, i) => (
                <li
                  key={i}
                  className={cls.list_group_item}
                  onClick={() => {
                    // dispatch(setTimeReserve(100));
                    setOpen(!open);
                    setRoom(0);
                    setClub(club);
                  }}
                >
                  <CaretRightOutlined /> {club.name}
                </li>
              ))}
            </ul>
          )}
          <hr />
          <div className={cls.time_status_rooms}>
            {club && (
              <div className={cls.time_status}>
                <Time />
                <Status timeSlots={club.rooms[room].availableTimeSlots} />
              </div>
            )}
            {club && club.rooms && (
              <div className={cls.play_rooms}>
                <h3>Play room </h3>
                <div>
                  {club.rooms.map((item, i) => (
                    <div
                      onClick={() => {
                        dispatch(setTimeReserve(100));
                        setRoom(i);
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
                  nameClub={club.name}
                  idClub={club._id}
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
