import { useContext } from 'react';
import { UserContext } from '../../components/context';
import { Link } from 'react-router-dom';
import 'animate.css';

import Breadcrumb from '../breadcrumb';
const Header = () => {
   const { Sair, thumb_logo } = useContext(UserContext);

   return (
      <div className="container-fluid bg-body-tertiary mb-4 fixed-top m-0 p-0 ">

         <nav class="navbar navbar-expand-lg bg-body-tertiary shadow animate__animated animate__fadeIn bg-body-tertiary">
            <div class="container animate__animated animate__fadeIn">
               <button class="navbar-toggler btn-toogler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
               </button>
               <a class="navbar-brand  animate__animated animate__fadeIn" href="#"><img src={thumb_logo} width={100} /></a>

               <div class="collapse navbar-collapse  animate__animated animate__fadeIn" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-lg-0">
                     <li class="nav-item ">

                        <Link aria-current="page" class="nav-link active">Admin</Link>
                     </li>


                     <li class="nav-item">
                        <Link to="/admin/imagen" class="nav-link">Imagens</Link>
                     </li>

                     <li class="nav-item dropdown">
                        <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Atendimento</Link>
                        <ul class="dropdown-menu fw-light">
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/atendimento">Novo Atendimento</Link></li>
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/lista-atendimento">Lista de Atendimentos</Link></li>
                      
                        </ul>

                     </li>
                     <li class="nav-item dropdown">
                        <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Produtos</Link>
                        <ul class="dropdown-menu fw-light">
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/produto">Novo item</Link></li>
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/categoria">Categoria</Link></li>
                        </ul>
                     </li>

                  </ul>


               </div>
               <div class="nav-item dropdown">

                  <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <button class="btn btn-outline-primary btn-sm"> <i class="bi bi-lock-fill"></i> <small>Acesso </small></button>
                  </a>
                  <ul class="dropdown-menu">
                     <li><Link class="dropdown-item fw-light" to="/admin/usuario"> <i class="bi  fs-5 bi-person-fill"></i> Usuários</Link></li>
                     <li><button class="btn btn-sm btn-primary dropdown-item" onClick={() => Sair()} > <i class="bi fs-5 bi-box-arrow-left"></i> Sair</button></li>


                  </ul>

               </div>

            </div >

         </nav>
         <Breadcrumb />
      </div >
   );

}

export default Header;
