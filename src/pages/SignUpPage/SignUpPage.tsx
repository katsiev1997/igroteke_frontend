import React from 'react';
import cls from './SignUpPage.module.scss';
import { SignUpForm } from 'src/features/auth';

export const SignUpPage: React.FC = () => {
  return (
    <div className={cls.signup}>
      <h2>Registration</h2>
      <SignUpForm />
    </div>
  );
};
