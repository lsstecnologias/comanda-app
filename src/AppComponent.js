
import { Outlet, useParams } from 'react-router-dom';
import Header from './components/header';
import TelaPrincipal from './components/TelaPrincipal';
import UserProvider from './components/context';
import $ from 'jquery';
function AppComponent() {
    // const { nome, perfil, senha, status } = useContext(UserContext);
    //  const params = useParams();
    // console.log(params);
    
                
    return (
        <UserProvider >
            <Header />
            <Outlet />
<div class="modal fade"  id="myModal"  tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticeditCategoria" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
           
        </UserProvider>

    )

}

export default AppComponent;
