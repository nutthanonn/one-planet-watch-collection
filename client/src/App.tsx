import React, { useEffect } from 'react';
import Home from '@pages/Home';
import Layout from '@shared/Layout';
import { Routes, Route } from 'react-router-dom';
import AppProvider from '@provider/AppProvider';
import light from '@styles/theme/light';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';
import SuccessRegister from '@pages/SuccessRegister';
import Collection from '@pages/Collection';
import UserProfile from '@pages/UserProfile';
import IndividualCollection from '@pages/IndividualCollection';
import NotFound from '@pages/NotFound';
import { MyProfileImpl } from '@store/MyProfileStore';
import useVerifyToken from '@hooks/useVerifyToken';
import AdminDashBoard from '@pages/AdminDashBoard';
import BrandCollection from '@pages/BrandCollection';
import RequestModel from '@pages/RequestModel';
import AdminMail from '@pages/AdminMail';
import PasswordReset from '@pages/PasswordReset';
import ForgotPassword from '@pages/ForgotPassword';

interface AppProps {
  MyProfileStore: MyProfileImpl;
}

const App: React.FC<AppProps> = (props) => {
  const { claims } = useVerifyToken();

  useEffect(() => {
    props.MyProfileStore.getMyProfile(claims ?? null);
  }, [claims]);

  return (
    <AppProvider theme={light}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/request' element={<RequestModel />} />
          <Route path='/:username' element={<UserProfile />} />
          <Route path='/model/:brand' element={<IndividualCollection />} />
          <Route path='/register/complete' element={<SuccessRegister />} />
          <Route path='/password/reset/send' element={<SuccessRegister />} />
          <Route path='/dashboard' element={<AdminDashBoard />} />
          <Route path='/admin/mail' element={<AdminMail />} />
          <Route path='/collection/:brand' element={<BrandCollection />} />
          <Route path='/password/reset/:token' element={<PasswordReset />} />
          <Route path='/forgot/password' element={<ForgotPassword />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default App;
