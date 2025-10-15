import { Link, Outlet } from 'react-router-dom';
const Header = () => {
    return (
        <div className="container-fluid bg-body-tertiary mb-4">
         
            <nav class=" navbar navbar-expand-lg bg-body-tertiary">
                <div class="container">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                              
                                <Link to="/acesso" aria-current="page" class="nav-link active">Admin</Link>
                            </li>
                            
                            <li class="nav-item">
                               <Link to="/admin/produto" class="nav-link">Produto</Link>
                            </li>
                           
                              <li class="nav-item">
                                <Link to="/admin/usuario" class="nav-link">Usuário</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>

                                </ul>

                            </li>
                            <li class="nav-item">
                              <a class="nav-link" aria-disabled="true">Link </a>
                            </li>
                            <li class="nav-item ml-4">
                                <div class="dropdown text-left">
                                    <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle" />
                                    </a>
                                    <ul class="dropdown-menu text-small">
                                        <li><a class="dropdown-item" href="#">New project...</a></li>
                                        <li><a class="dropdown-item" href="#">Settings</a></li>
                                        <li><a class="dropdown-item" href="/usuario">Profile</a></li>
                                        <li></li>
                                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                                    </ul>
                                </div>
                            </li>

                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />

                        </form>

                    </div>

                </div >
            </nav >

        </div >
    )
}
export default Header;
