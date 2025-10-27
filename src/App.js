
import { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProvider from './components/context';
import Comanda from './components/comanda';
import Produto from './components/produtos';
import Usuarios from './components/usuarios';
import Loja from './components/loja';
import AppComponent from './AppComponent';
import Acesso from './components/acesso';
import Categorias from './components/categorias';
import QRCode from './components/qrcode';
import Atendimento from './components/atendimento';
import TabelaAtendimento from './components/tabela_atendimento';
import AgendamentoPedido from './components/agendamento_pedido';
import Template from './components/template';

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
            <Route path="produto" element={<Produto />} />
            <Route path="agendamento-pedido" element={<AgendamentoPedido />} />
            <Route path="usuario" element={<Usuarios />} />
            <Route path="loja" element={<Loja />} />
            <Route path="categoria" element={<Categorias />} />
            <Route path="template-view" element={<Template />} />
            <Route path="qr" element={<QRCode />} />
            <Route path="atendimento" element={<Atendimento />} />
            <Route path="lista-atendimento" element={<TabelaAtendimento />} />
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
