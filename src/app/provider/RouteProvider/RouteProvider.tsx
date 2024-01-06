import { Route, Routes } from 'react-router-dom';
import {
  AboutPage,
  CreateClubPage,
  HomePage,
  LoginPage,
  SignUpPage,
} from 'src/pages';

const RouteProvider = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/create_club' element={<CreateClubPage />} />
      <Route path='/about' element={<AboutPage />} />
    </Routes>
  );
};

export default RouteProvider;
