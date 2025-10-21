
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import TelaPrincipal from './components/TelaPrincipal';
import UserProvider from './components/context';

function AppComponent() {
 
    return (
        <>
        <UserProvider>
            <Header /> 
            <Outlet />
            <TelaPrincipal />
        </UserProvider>
        </>
    )

}

export default AppComponent;
