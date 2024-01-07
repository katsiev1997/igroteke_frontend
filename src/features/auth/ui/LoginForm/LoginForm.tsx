import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import cls from './LoginForm.module.scss';
import React from 'react';
import { customerData } from '../../model/types/customer';
import { adminData } from '../../model/types/admin';
import { useAppDispatch } from 'src/app/provider/StoreProvider/config/store';
import { customerLogin } from '../../model/slice/slice';


export const LoginForm = () => {
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onChange = (e: CheckboxChangeEvent) => {
    setIsAdmin(e.target.checked);
  };
  
  const loginFetch = (values: customerData | adminData) => {
    dispatch(customerLogin(values))
    setTimeout(() => navigate('/'), 500)
  };
  console.log(isAdmin);
  return (
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
  );
};
