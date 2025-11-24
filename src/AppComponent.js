
import { Outlet, useParams } from 'react-router-dom';
import Header from './components/header';
import TelaPrincipal from './components/TelaPrincipal';
import UserProvider from './components/context';

function AppComponent() {
   // const { nome, perfil, senha, status } = useContext(UserContext);
  //  const params = useParams();
   // console.log(params);
    return (
        <UserProvider >
            <Header />
            <Outlet />
                   
        </UserProvider>

    )

}

export default AppComponent;
