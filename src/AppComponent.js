
import { Outlet, useParams } from 'react-router-dom';
import Header from './components/header';
import TelaPrincipal from './components/TelaPrincipal';
import UserProvider from './components/context';
import $ from 'jquery';
import bg_logo  from './bg_logo.png';

function AppComponent() {
    // const { nome, perfil, senha, status } = useContext(UserContext);
    //  const params = useParams();
    // console.log(params);

    //PERIMITE EXIBIR MODAL DE MODAL
    sessionStorage.setItem('modal_notas', 'show');



    return (
        <UserProvider >
            <Header />
            <Outlet />
            <div class="modal fade" id="myModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticeditCategoria" aria-hidden="true">
                <div class="modal-dialog  modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                           
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                 
                            </button>
                           <small style={{marginLeft:'10px'}}>Fechar</small>
                        </div>
                        <div class="modal-body d-flex align-items-center justify-content-center">


                            <img src={bg_logo} class="img-fluid  mb-4" alt="Example image" width="300" height="500"  />


                        </div>
                    </div>
                </div>
            </div>
        </UserProvider>

    )

}

export default AppComponent;
