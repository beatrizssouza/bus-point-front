import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import AppBarComponent from './components/appbar/appbar';
import FormCadastroLogin from './components/login/createUser/form';

function App() {
  return (
    <div className="App">
      <AppBarComponent />
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/Login' element={<Login/>} />
        <Route path='/cadastro-login' element={<FormCadastroLogin/>} />
      </Routes>
    </div>
  );
}

export default App;