
import './App.css';
import Comanda from './components/comanda';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Produto from './components/produtos';
import Header from './components/header';
import { useEffect, useState } from 'react';

const $ = require("jquery");
function App() {

  const [statusTela, setStatusTela] = useState();
  /*
   const domain = window.location.hostname;
  const protocolo = window.location.protocol;
  const path = window.location.pathname;
  const port = 8080;
  const dns = (protocolo + path + path + domain + ':' + port);
*/


  
    window.addEventListener('load', () => {
      setStatusTela("none");
      $('#preloader').delay(500)
    });
   
  
  return (
    <div id="preloader">
      <div class="container" style={{ display: statusTela }}>

        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Comanda />} />
          <Route path="/produtos" element={<Produto />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
