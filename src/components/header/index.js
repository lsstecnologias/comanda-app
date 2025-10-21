import { Link } from 'react-router-dom';
import { UserContext } from '../../components/context';
import 'animate.css';
import { useContext } from 'react';
import Breadcrumb from '../breadcrumb';
const Header = () => {
      const { data } = useContext(UserContext);
      console.log(data);
    return (
        <div className="container-fluid bg-body-tertiary mb-4 fixed-top m-0 p-0 ">
         
            <nav class="navbar navbar-expand-lg bg-body-tertiary shadow   animate__animated animate__fadeIn bg-body-tertiary">
                <div class="container animate__animated animate__fadeIn">
                    <button class="navbar-toggler btn-toogler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand   animate__animated animate__fadeIn" href="#">Navbar</a>
                   
                    <div class="collapse navbar-collapse  animate__animated animate__fadeIn" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-lg-0">
                            <li class="nav-item ">
                              
                                <Link to="/" aria-current="page" class="nav-link active">Admin</Link>
                            </li>
                            
                           
                             <li class="nav-item">
                                <Link to="/admin/imagen" class="nav-link">Imagens</Link>
                            </li>
                             <li class="nav-item">
                                <Link to="/admin/qr" class="nav-link">Gerar QRCode</Link>
                            </li>
                              <li class="nav-item">
                                <Link to="/admin/comanda" class="nav-link">Comanda</Link>
                            </li>
                              <li class="nav-item dropdown">
                               <Link to="/admin/produto" class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">Produtos</Link>
                                 <ul class="dropdown-menu fw-light">
                                    <li><a class="dropdown-item fw-light" href="/admin/produto">Lista de produtos</a></li>
                                    <li><a class="dropdown-item fw-light" href="/admin/categoria">Adicionar categoria</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>

                                </ul>
                            </li>                           
                        
                        </ul>
                        

                    </div>
                     <div class="nav-item dropdown">
                        
                        <a class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <button class="btn btn-outline-primary btn-sm"> <i class="bi bi-lock-fill"></i> <small>Acesso </small></button>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item fw-light" href="/admin/usuario">Usuários</a></li>
                            <li><a class="dropdown-item fw-light" href="#">Another action</a></li>
                          
                       

                        </ul>

                    </div>
                
                </div >
                
            </nav>
              <Breadcrumb/>
        </div >
    );
   
}

export default Header;
