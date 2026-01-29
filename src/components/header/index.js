import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/context';
import { Link } from 'react-router-dom';
import 'animate.css';
import TelaPrincipal from '../TelaPrincipal';
import $ from 'jquery';



const Header = () => {
   //const [statusSessao,setStatusSessao] = useState("");

   //const [perfilSessao,setPerfilSessao] = useState("");

   const { sessao, Sair, thumb_logo } = useContext(UserContext);

   return (
      <div className="container-fluid bg-body-tertiary mb-4 fixed-top m-0 p-0" >

         <nav class="navbar navbar-expand-lg bg-body-tertiary shadow animate__animated animate__fadeIn bg-body-tertiary">
            <div class="container animate__animated animate__fadeIn">
               <button class="navbar-toggler btn-toogler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
               </button>
               <a class="navbar-brand  animate__animated animate__fadeIn" href="#"><img src={thumb_logo} width={100} /></a>

               <div class="collapse navbar-collapse  animate__animated animate__fadeIn" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-lg-0">

                     <li class="nav-item  dropdown">
                        <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Minha loja</Link>
                        <ul class="dropdown-menu fw-light">
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/indicadores">Indicadores</Link></li>


                        </ul>
                     </li>

                     <li class="nav-item dropdown">
                        <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Atendimento</Link>
                        <ul class="dropdown-menu fw-light">
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/atendimento">Novo Atendimentos</Link></li>
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/lista-atendimento">Lista de Atendimentos</Link></li>

                        </ul>

                     </li>
                     <li class="nav-item dropdown">
                        <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Produtos</Link>
                        <ul class="dropdown-menu fw-light">
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/produto">Adicionar Item</Link></li>
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/categoria">Adicionar Categoria</Link></li>
                           <li><Link class="dropdown-item fw-light nav-link" to="/admin/qr">Gerar QR-Code</Link></li>
                           <li><Link class="dropdown-item fw-light nav-link" to="">Pesquisas</Link></li>
                        </ul>
                     </li>
                     <li class="nav-item dropdown">
                        {sessao.status == "o" && sessao.perfil == "o" ?
                           <>
                              <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Administrador</Link>
                              <ul class="dropdown-menu fw-light">

                                 <li><Link class="dropdown-item fw-light  nav-link" to="/admin/usuario">  Usuários </Link></li>

                                 <li><Link class="dropdown-item fw-light nav-link" to="/admin/pagamento">Pagamento</Link></li>
                                 <li><Link class="dropdown-item fw-light nav-link" to="/admin/licenca">Licenças e chave</Link></li>
                              </ul>
                           </>
                           :
                           <>
                           </>
                        }
                     </li>

                  </ul>

               </div>
               <div class="nav-item dropdown">

                  <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <button class="btn btn-primary btn-sm w-100 btn-edigit">  <small>Acesso <i class="bi bi-lock-fill"></i> </small></button>
                  </a>
                  <ul class="dropdown-menu">

                     <li><Link class="dropdown-item fw-light" to="/admin/sistema">  Sistema <i class="bi bi-gear-fill"></i></Link></li>
                     <li><button class="btn btn-sm btn-primary dropdown-item" onClick={() => Sair()} > Sair <i class="bi fs-5 bi-box-arrow-left"></i></button></li>
                     <hr class="dropdown-divider" />
                     <li class="fw-light p-2 pb-0 pt-0 text-center "><small><i class="bi  fs-5 bi-person-fill"></i> {sessao.nome} {sessao.cod} </small></li>
                  </ul>

               </div>

            </div >

         </nav>


      </div>
   );

}

export default Header;
