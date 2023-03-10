import React from 'react';
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

const App: React.FC = () => {
  return (
    <AppProvider theme={light}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/user' element={<UserProfile />} />
          <Route path='/model/:brand' element={<IndividualCollection />} />
          {/* <Route path='/model/:brand?model=' element={<UserProfile />} /> */}
          <Route path='/sign-up/complete' element={<SuccessRegister />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default App;
