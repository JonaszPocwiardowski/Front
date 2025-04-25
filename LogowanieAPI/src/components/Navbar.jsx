import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/AuthSlice';
import { Button } from 'primereact/button';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-wrap justify-content-center align-items-center m-2">
      <Button onClick={handleLogout} label='Wyloguj'></Button>  
    </div>
  );
};

export default Navbar;
