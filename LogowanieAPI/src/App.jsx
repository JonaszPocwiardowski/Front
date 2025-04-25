import React from 'react';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import Element from './components/Element';
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      {!isAuthenticated && <AuthForm />}
        {isAuthenticated && <Element />}
      {isAuthenticated && <Navbar />}
    </div>
  );
};

export default App;
