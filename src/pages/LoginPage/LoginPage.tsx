import React from 'react';
import cls from './LoginPage.module.scss';
import { LoginForm } from 'src/features/auth';

export const LoginPage: React.FC = () => {
  return (
    <div className={cls.login}>
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};
