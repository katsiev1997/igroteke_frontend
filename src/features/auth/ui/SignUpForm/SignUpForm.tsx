import {
  CheckCircleOutlined,
  IdcardOutlined,
  LockOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import cls from './SignUpForm.module.scss';
import { Link } from 'react-router-dom';
import { customerData } from '../../model/types/customer';
import { adminData } from '../../model/types/admin';
import { $api } from 'src/shared/api';

export const SignUpForm = () => {
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = (text: string) => {
    messageApi.open({
      type: 'success',
      content: text,
      style: {
        fontSize: '16px',
        marginTop: '20vh',
      },
    });
  };
  const errorMessage = (text: string) => {
    messageApi.open({
      type: 'error',
      content: text,
      style: {
        fontSize: '16px',
        marginTop: '20vh',
      },
    });
  };
  const fetchSignup = async (values: customerData | adminData) => {
    if (isAdmin) {
      console.log(isAdmin);
    } else {
      const { phone, password, confirmPassword, code } = values;
      if (password !== confirmPassword) {
        errorMessage('Пароли не совпадают');
        return;
      }
      try {
        const res = await $api.post('/signup', { phone, password, code });
        successMessage(res.data.message);
      } catch (error: any) {
        errorMessage(error.response.data.message);
      }
    }
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
    <div className={cls.form}>
      {contextHolder}
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
            prefix={
              <div>
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
          rules={[{ required: true, message: 'Пожалуйста, повторите пароль!' }]}
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
  );
};
