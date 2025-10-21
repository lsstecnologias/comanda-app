
import { Outlet,useContext } from 'react-router-dom';
import Header from './components/header';
import 'animate.css';
import UserProvider from './components/context';

function AppComponent() {
 
    return (
        <>
        <UserProvider>
            <Header /> 
            <Outlet />
        </UserProvider>
        </>
    )

}

export default AppComponent;
