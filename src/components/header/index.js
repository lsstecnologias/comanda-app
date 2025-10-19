import { Link, Outlet } from 'react-router-dom';
const Header = () => {
    return (
        <div className="container-fluid bg-body-tertiary mb-4 fixed-top ">
         
            <nav class=" navbar navbar-expand-lg bg-body-tertiary">
                <div class="container">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-lg-0">
                            <li class="nav-item">
                              
                                <Link to="/" aria-current="page" class="nav-link active">Admin</Link>
                            </li>
                            
                            <li class="nav-item dropdown">
                               <Link to="/admin/produto" class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">Produto</Link>
                                 <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/admin/usuario">Usuários</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>

                                </ul>
                            </li>
                             <li class="nav-item">
                                <Link to="/admin/imagen" class="nav-link">Imagens</Link>
                            </li>
                              <li class="nav-item">
                                <Link to="/admin/comanda" class="nav-link">Comanda</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   <button class="btn btn-outline-primary btn-sm"> <i class="bi bi-person-circle"></i> Acesso</button>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/admin/usuario">Usuários</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>

                                </ul>

                            </li>
                           
                       
                        </ul>
                        

                    </div>

                </div >
            </nav >

        </div >
    )
}
export default Header;
