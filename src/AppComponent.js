
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

const $ = require("jquery");


function AppComponent() {

    const [statusTela, setStatusTela] = useState('');

    window.addEventListener('load', () => {
        $('#preloader').hide(500);
        setStatusTela("block");
    });
    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    useEffect(() => {


        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                'mode': 'no-cors'
            }
        }

        const param_api_get_autenticar = "?api=sessaoUser";
        const listCategoria = () => {
            axios.get(urlApi + nameApi + param_api_get_autenticar, config)
                .then((res) => {
                    var vl = res.data;

                    console.log(vl);
                }).catch((error) => { alert(error); });

        };
        listCategoria();
        function getSessionUser() {
            const carrinhoJson = localStorage.getItem("user");
            return carrinhoJson ? JSON.parse(carrinhoJson) : [];
        }

        var session_user = getSessionUser();
        console.log(session_user);
    }, []);

    return (

        <div class="container-fluid">
            <Header />
            <Outlet />
        </div>
    )

}

export default AppComponent;
