import React, { createContext, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom'
import { DataUser, AuxProps, ContextType } from '../@types/DataUser';
import { getAllListPoint, postLogin, postSignUp } from '../services/http-common';

const Context = createContext({} as ContextType);

function AuthProvider({ children }: AuxProps) {

  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  
    
  async function SubmitRegister(data: DataUser) {
    postSignUp(data);
  }

 
  async function SubmitLogin(data: DataUser) {
     //salvamos a resposta da funçao "postLogin" em uma constante e validamos se existe um "token"
    const responseData:any = await postLogin(data);
    if (responseData?.token) {
        //o "token" é armazenado no "localStorage" e o usuário é definido como autenticado.
        localStorage.setItem('token', responseData.token);
        setAuthenticated(true);
    
        navigate('/admin')
      }
  }

  async function GetAllPoint(){
    getAllListPoint();
  }

  return (
    <Context.Provider value={{ SubmitRegister, SubmitLogin, authenticated , GetAllPoint }}>
      {children}
    </Context.Provider>
  );
}

const useAuth = () => {
  return useContext(Context)
}
export { Context, AuthProvider , useAuth};