
import Comanda from './components/comanda';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Produto from './components/produtos';
import Header from './components/header';
import Usuarios from './components/usuarios';
import Imagens from './components/Imagens';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import 'animate.css';
import Login from './acesso';
const $ = require("jquery");


function App() {

  const [statusTela, setStatusTela] = useState('');

  window.addEventListener('load', () => {
    $('#preloader').hide(500);
    setStatusTela("block");
  });

  return (
    <div class="container " >
      <div id="preloader" style={{ display: statusTela }}>

        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Header />}>
           
            <Route path="comanda" element={<Comanda />} />
            <Route path="produto" element={<Produto />} />
            <Route path="usuario" element={<Usuarios />} />
            <Route path='imagens' element={<Imagens />} />
          </Route>
         



        </Routes>
      </BrowserRouter>

    </div >
  )

}

export default App;
