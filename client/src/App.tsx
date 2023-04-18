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
import Ranking from '@pages/Ranking';
import UserProfile from '@pages/UserProfile';
import IndividualCollection from '@pages/IndividualCollection';
import NotFound from '@pages/NotFound';
import { MyProfileImpl } from '@store/MyProfileStore';
import useVerifyToken from '@hooks/useVerifyToken';
import AdminDashBoard from '@pages/AdminDashBoard';
import BrandCollection from '@pages/BrandCollection';
import RequestModel from '@pages/RequestModel';
import AdminMail from '@pages/AdminMail';

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
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/request' element={<RequestModel />} />
          <Route path='/:username' element={<UserProfile />} />
          <Route path='/model/:brand' element={<IndividualCollection />} />
          <Route path='/register/complete' element={<SuccessRegister />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/dashboard' element={<AdminDashBoard />} />
          <Route path='/admin/mail' element={<AdminMail />} />
          <Route path='/collection/:brand' element={<BrandCollection />} />
        </Route>
        {/* <Route path='/dashboard/YWRtaW5pc3RyYXRvcg==' /> */}
      </Routes>
    </AppProvider>
  );
};

export default App;
