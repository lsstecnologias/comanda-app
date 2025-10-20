//import sessao_start from './Sessaostart';
import Comanda from './components/comanda';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Produto from './components/produtos';
import Header from './components/header';
import Usuarios from './components/usuarios';
import Imagens from './components/Imagens';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import axios from "axios";
import 'animate.css';
import Breadcrumb from './components/breadcrumb';

const $ = require("jquery");


function AppComponent() {
   
    const [statusTela, setStatusTela] = useState('');
    var [statusSessao,setStatusSessao] = useState(null);
    window.addEventListener('load', () => {
        $('#preloader').hide(500);
        setStatusTela("block");
    });
    //sessao_start();
  
    return (
        <>
        <Header />
       
        <Outlet />
        </>
    )

}

export default AppComponent;
