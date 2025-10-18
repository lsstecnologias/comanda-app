
import Comanda from './components/comanda';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Produto from './components/produtos';
import Header from './components/header';
import Usuarios from './components/usuarios';
import Imagens from './components/Imagens';
import ReactPaginate from 'react-paginate';
import AppComponent from './AppComponent';
import Acesso from './components/acesso';

import { useEffect, useState } from 'react';
import axios from "axios";


const $ = require("jquery");


function App() {

  const [statusTela, setStatusTela] = useState('');

  window.addEventListener('load', () => {
    $('#preloader').hide(500);
    setStatusTela("block");
  });
 
  function getSessionAdminUser() {
    const dataUserJson = sessionStorage.getItem("user_admin");
    return dataUserJson ? JSON.parse(dataUserJson) : [];
  }

  var session_admin_user = getSessionAdminUser();
  console.log(session_admin_user);
  return (

    <div class="container-fluid m-0 p-0 " >
      <div id="preloader" style={{ display: statusTela }}>

        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acesso />} />
          <Route path="/admin" element={<AppComponent />} >
            <Route path="produto" index  element={<Produto />} />
            <Route path="usuario" element={<Usuarios />} />
            <Route path="comanda" element={<Comanda />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )

}

export default App;
