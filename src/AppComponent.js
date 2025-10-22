
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import TelaPrincipal from './components/TelaPrincipal';
import UserProvider from './components/context';
import { useContext } from 'react';
import { UserContext } from './components/context';
function AppComponent() {
  //<TelaPrincipal />
    return (
        <UserProvider>
            <Header />
            <Outlet />    
        </UserProvider>
         
    )

}

export default AppComponent;
