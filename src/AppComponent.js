import { UserContext } from './components/context';
import { useContext, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Header from './components/header';
import TelaPrincipal from './components/TelaPrincipal';
import UserProvider from './components/context';
import ModalPrincipal from './components/modal_principal';
import $ from 'jquery';


function AppComponent() {

    //  const params = useParams();
    // console.log(params);


    //PERIMITE EXIBIR MODAL DE MODAL
    sessionStorage.setItem('modal_notas', 'show');
   

    return (
        <UserProvider >
            <Header />
            <Outlet />
            <ModalPrincipal />
        </UserProvider>

    )

}

export default AppComponent;
