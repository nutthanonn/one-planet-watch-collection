import React from 'react';
import Home from '@pages/Home';
import Layout from '@shared/Layout';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
