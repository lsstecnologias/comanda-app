import { Link, useParams } from 'react-router-dom';
import { useContext,useState } from 'react';
import { UserContext } from '../context';
import Comanda from './comanda';
import $ from 'jquery';
const HeaderComanda = () => {
   const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO;
   sessionStorage.setItem('modal_notas', 'hide');
   const { cod } = useParams();

   const { Sair, thumb_logo, sessao } = useContext(UserContext);

   const [exibirComanda,setExibirComanda] = useState(false);

   if (cod) {
     
      const data_atual = new Date();
      const data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();

      const listarComanda = () => {
         const obj = { estabelecimento_id: sessao.estabelecimento_id, cliente_id: cod, funcionario_id: sessao.cod, data_post: data_post }
         $.post(apiUrl + '/api/setComandas/', obj)
         .done(() => {
            setExibirComanda(true);
            $('#btn-listarComanda').addClass('d-none');

         })
      }
      return (
         <div class="container animate__animated animate__fadeIn p-0 mt-4 comanda">
            <div class="container-fluid">
               <h3 className=" mt-2 pb-2 text-center">Comanda <i class="bi bi-card-checklist"></i></h3>
               <div class="row d-flex align-items-center justify-content-between text-start text-secondary flex-row p-0 m-0 ">
                  <div class="col-4  p-1">
                     <p class="mb-0 lh-1">ESTABELECIMENTO</p>
                     <p className="fs-2 mb-0 mt-0 t-0"> {sessao.estabelecimento_id ? sessao.estabelecimento_id : 'S/N'}</p>

                  </div>
                  <div class="col-4 text-center p-1">

                     <p class="mb-0 pb-0 mt-0 lh-1">CLIENTE <i class="bi bi-clipboard2"></i></p>
                     <p className="fs-2 mb-0 mt-0 t-0"> {cod ? cod : 'S/N'}</p>

                  </div>
                  <div class="col-4  p-1">

                     <div class="p-2">
                        <div class="form-label p-0">
                           <select class="form-select input-sm w-100 text-center" disabled={true} id="funcionario">
                              <option value={sessao.cod} selected>Funcionário {sessao.nome ? sessao.nome : 'S/N'}</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
               <button class="btn btn btn-edigit text-white w-100 mt-4 animate__animated animate__fadeIn" id="btn-listarComanda" onClick={() => listarComanda()}>Listar comanda</button>
            </div>
            {exibirComanda ?  <Comanda /> : ""  }
         </div>

      )
   } else {
      return (
         <div class="container animate__animated animate__fadeIn p-0 mb-4 mt-4 comanda">
            <div>
               <p>ERRO AO GERAR A COMANDA</p>
            </div>
         </div>
      )
   }
}
export default HeaderComanda;