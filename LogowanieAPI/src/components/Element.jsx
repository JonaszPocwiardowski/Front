import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
 import { DataTable } from 'primereact/datatable';
// import { Tree } from 'primereact/tree';
// import { TreeTable } from 'primereact/treetable';
 import { Column } from 'primereact/column';
//import { Table } from "flowbite-react";
//import '../App.css';
        
        

const UserProfile = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const response = await axios.get('https://dummyjson.com/auth/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserData(response.data); 
        } catch (error) {
          console.error('Błąd podczas pobierania danych użytkownika:', error);
        }
      }
    };

    fetchUserData();
  }, [accessToken]); 

  if (!userData) return <p>Ładowanie...</p>;
  console.log(userData);

  const Tab = [
    { key: 'Imię', value: userData.firstName },
    { key: 'Nazwisko', value: userData.lastName },
    { key: 'Email', value: userData.email },
    { key: 'Rola', value: userData.role },
    { key: 'Data urodzenia', value: userData.birthDate },
  ]
  return (   
    <div className=" flex flex-wrap justify-content-center align-items-center">
    <DataTable showGridlines value={Tab}>
        <Column field="key"></Column>
        <Column field="value"></Column>  
    </DataTable>     
    </div>
  );

};

export default UserProfile;

