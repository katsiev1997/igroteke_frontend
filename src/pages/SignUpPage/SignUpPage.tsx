import React from 'react';
import cls from './SignUpPage.module.scss'
import {
  LockOutlined,
  PhoneOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { Link } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
  phone: string;
  password: string;
  confirmPassword?: string;
  code?: string;
}

export const SignUpPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const fetchSignup = (values: IValues) => {
    const { phone, password, confirmPassword, code } = values;
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    axios
      .post('http://localhost:5000/api/signup', {
        phone,
        password,
        code,
      })
      .then((res) => alert(res.data.message))
      .catch((error) => alert(error.response.data.message));
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const onChange = (e: CheckboxChangeEvent) => {
    setIsAdmin(e.target.checked);
  };
  return (
    <div>
      <h2>Registration</h2>
      <div className={cls.form}>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={fetchSignup}
        >
          <Form.Item
            name='phone'
            rules={[
              {
                required: true,
                message:
                  'Пожалуйста введите свой номер телефона без восьмерки, 10 цифр! ',
              },
            ]}
          >
            <Input
              prefix={<div>
                <PhoneOutlined className='site-form-item-icon' /> +7
              </div>
                }
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
            />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            rules={[
              { required: true, message: 'Пожалуйста, повторите пароль!' },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Повторите пароль...'
            />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[{ required: true, message: 'Введите код!' }]}
          >
            <Input
              prefix={<CheckCircleOutlined className='site-form-item-icon' />}
              placeholder='Проверочный код...'
            />
          </Form.Item>
          {isAdmin && (
            <Form.Item
              name='idClub'
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста введите ID клуба! ',
                },
              ]}
            >
              <Input
                prefix={<IdcardOutlined className='site-form-item-icon' />}
                placeholder='ID club'
              />
            </Form.Item>
          )}
          <Form.Item>
            <Checkbox onChange={onChange} style={{ color: '#fff' }}>
              Администратор
            </Checkbox>
          </Form.Item>
          <Form.Item style={{ color: '#fff' }}>
            У вас уже есть аккаунт?{' '}
            <Link style={{ color: '#09f' }} to='/login'>
              Войти сейчас!
            </Link>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

