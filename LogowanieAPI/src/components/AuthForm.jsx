import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/AuthSlice';
import axios from 'axios';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';



//import "primereact/resources/themes/lara-light-cyan/theme.css";


const AuthForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: login,
        password,
        expiresInMins: 1,
      });
      //const { token } = response.data;
      const { accessToken, refreshToken } = response.data;

      //const  token  = data.accessToken;
      //console.log(accessToken);
      //dispatch(loginSuccess(token));
      //dispatch(loginSuccess({ accessToken, refreshToken }));
      dispatch(loginSuccess({ accessToken, refreshToken }));
      alert('Zalogowano pomyślnie!');
    } catch (error) {
      console.error(error);
      alert('Nieprawidłowe dane logowania!');
    }
  };

  return (
    <div className="card">
    <div className="flex flex-column md:flex-row align-items-center justify-content-center gap-3 ">
        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-2">
            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                <InputText id="username" type="text" placeholder='Login' value={login} onChange={(e) => setLogin(e.target.value)} className="w-12rem" />
            </div>
            <div className="flex flex-wrap justify-content-center align-items-center gap-1">
                <InputText id="password" placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-12rem" />
            </div>
            <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" onClick={handleLogin}></Button>
        </div>
    </div>
</div>

  );
};

export default AuthForm;
