
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
import Categorias from './components/categorias';
import QRCode from './components/qrcode';


const $ = require("jquery");


function App() {

  const [statusTela, setStatusTela] = useState('');

  window.addEventListener('load', () => {
    $('#preloader').hide(500);
    setStatusTela("block");
  });
 
  const page404 = () => {
    return (
      <div class="container-fluid">
        <h1>404 - Pagina não encontrada</h1>
      </div>
    )
  }
  return (

    <div class="container-fluid m-0 p-0 " >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acesso />} />
          <Route path="/admin" element={<AppComponent />} >
            <Route path="produto" index element={<Produto />} />
            <Route path="usuario" element={<Usuarios />} />
             <Route path="imagen" element={<Imagens />} />
             <Route path="categoria" element={<Categorias />} />
             <Route path="qr" element={<QRCode />} />
             <Route path="comanda" element={<Comanda />} />
            <Route path="*" element={page404()}></Route>
          </Route>
          <Route path="*" element={page404()}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  )

}

export default App;
