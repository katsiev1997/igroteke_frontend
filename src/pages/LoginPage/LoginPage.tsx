import React from 'react';
import cls from './LoginPage.module.scss'
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import axios from 'axios';
import { IValues } from '../SignUpPage/SignUpPage';

export const LoginPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const onChange = (e: CheckboxChangeEvent) => {
    setIsAdmin(e.target.checked);
  };
  const logoutFetch = () => {
    axios
      .post('https://localhost:5000/api/logout')
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  };
  const loginFetch = (values: IValues) => {
    const { phone, password } = values;
    axios
      .post(
        'http://localhost:5000/api/login',
        {
          phone,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => alert(res.data.message))
      .catch((error) => alert(error.response.data.message));
  };
  console.log(isAdmin);
  return (
    <div>
      <h2>Login</h2>
      <div className={cls.form}>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={loginFetch}
        >
          <Form.Item
            name='phone'
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите номер телефона!',
              },
            ]}
          >
            <Input
              prefix={
                <div>
                  <PhoneOutlined className='site-form-item-icon' /> +7
                </div>
              }
              className='input'
              placeholder='Номер телефона...'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Пароль...'
              className='input'
            />
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={onChange} style={{ color: '#fff' }}>
              Администратор
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Войти
            </Button>
            <span style={{ color: '#fff' }}> или </span>{' '}
            <Link style={{ color: '#09f' }} to='/signup'>
              Зарегистрироваться сейчас!
            </Link>
          </Form.Item>
        </Form>
      </div>
      <button onClick={logoutFetch}>Logout</button>
    </div>
  );
};

