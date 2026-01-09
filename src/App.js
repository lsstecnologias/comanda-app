
import { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import UserProvider from './components/context';
import Comanda from './components/comanda';
import NovaComanda from './components/comanda';
import Produto from './components/produtos';
import Usuarios from './components/usuarios';
import UploadImagens from './components/upload_imagens';
import AppComponent from './AppComponent';
import Acesso from './components/acesso';
import Categorias from './components/categorias';
import Keygen from './components/keygen';
import QRCode from './components/qrcode';
import Atendimento from './components/atendimento';
import TabelaAtendimento from './components/tabela_atendimento';
import AgendamentoPedido from './components/agendamento_pedido';
import Template from './components/template';

import { UserContext } from './components/context';
import Estabelecimento from './components/Estabelecimento';
import Sistema from './components/sistema';
import TabelaCliente from './components/tabela_estabelecimento';
import TelaPrincipal from './components/TelaPrincipal';
import Pagamento from './components/pagamento';

const $ = require("jquery");

function App() {
  sessionStorage.setItem('modal_notas', 'hide');
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
            <Route path="estabelecimento" element={<Estabelecimento />} />
            <Route path="listar-estabelecimento" element={<TabelaCliente />} />
            <Route path="usuario" element={<Usuarios />} />
            <Route path="imagens" element={<UploadImagens />} />
            <Route path="categoria" element={<Categorias />} />            
            <Route path="template-view" element={<Template />} />
            <Route path="pagamento" element={<Pagamento />} />
            <Route path="sistema" element={<Sistema />} />
            <Route path="comanda/:cod" element={<Comanda />} />
            <Route path="qr" element={<QRCode />} />
            <Route path="keygen" element={<Keygen />} />
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
