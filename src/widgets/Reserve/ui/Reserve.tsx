import React from 'react';
import cls from './Reserve.module.scss'
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { times } from '../model/times';
import axios, { AxiosResponse } from 'axios';

function generateNumbersString(num1: number, num2: number): string {
  if (num1 > num2) {
    [num1, num2] = [num2, num1]; // Обеспечиваем, чтобы num1 было меньше num2
  }

  const numbersArray: number[] = Array.from(
    { length: num2 - num1 + 1 },
    (_, index) => num1 + index
  );
  const numbersString: string = numbersArray.join(' ');

  return numbersString;
}

interface IReservationProps {
  nameClub: string;
  idClub: string;
  roomNum: number;
  from: number;
  to: number;
}

export const Reserve: React.FC<IReservationProps> = (props) => {
  // Устанавливаем URL сервера
  const apiUrl: string = 'http://localhost:5000/api/create_reserve';

  const { nameClub, idClub, roomNum, from, to } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const createBooking = async () => {
    const times = generateNumbersString(1, 5);
    axios
      .post(
        apiUrl,
        {
          idClub: idClub,
          reserve: times,
          roomNum: roomNum + 1,
        },
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.error('Error:', error);
      });
  };

  return (
    <React.Fragment>
      <button onClick={() => setOpen(true)}>
        <img
          className={cls.booking}
          src='https://img.icons8.com/?size=160&id=79996&format=png'
          alt=''
        />
        Reserve
      </button>
      <div className={open ? `${cls.create_booking} ${cls.active}` : cls.create_booking}>
          <CloseOutlined
            style={{
              fontSize: '40px',
              position: 'absolute',
              right: '20px',
              top: '20px',
            }}
            onClick={() => setOpen(false)}
          />
          <h3>{nameClub}</h3>
          <h3>Room: {roomNum + 1}</h3>
          <div className={cls.time_reserve}>
            <h3>From: {times[from].label}</h3>
            <h3>To: {times[to].label}</h3>
          </div>
          <Button onClick={createBooking} size='large' type='primary'>
            Reserve
          </Button>
      </div>
    </React.Fragment>
  );
};
