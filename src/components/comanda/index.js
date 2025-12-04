import { useEffect, useState, useContext } from "react"
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../components/context';
import axios from 'axios';
const $ = require("jquery");
const Comanda = () => {
   //PERIMITE NÃO EXIBIR MODAL DE NOTAS
   sessionStorage.setItem('modal_notas', 'hide');
   const { cod } = useParams();

   const { Sair, thumb_logo,sessao } = useContext(UserContext);
console.log(sessao)
   const [data, setData] = useState([]);
    const dataUser = sessionStorage.getItem("cod_estabelecimento");
      var cod_estabelecimento = dataUser;
   const urlApi = 'http://10.10.10.6/';
   const nameApi = 'api_comanda/';
   const param_api_get_produtos = "?api=getProdutos";

   const marcarQuantidade = (id, preco) => {

      let inpt_qt = $("#inpt-qt-id-" + id);
      let inpt_subtotal = $("#inpt-subtotal-" + id);
      let check = $("#check-inpt-" + id);
      let qt = inpt_qt.val();

      if (!isNaN(qt) && qt !== null && qt !== "") {
         var subtotal = (qt * preco).toFixed(2);
         inpt_subtotal.val(subtotal);
         if (check[0].value == 'on') {
            inpt_qt.attr("disabled", true).addClass("is-valid").removeClass("is-invalid");

            check[0].value = "off";
         } else {
            inpt_qt.attr("disabled", false);
            inpt_qt.addClass("is-valid");
            check[0].value = "on";

         }

      } else {
         inpt_qt.addClass("is-invalid").removeClass("is-valid");
      }

   }
   useEffect(() => {
     
     

      if (cod_estabelecimento !== 'null') {

         var obj = { 'id': cod_estabelecimento };

         $.post(urlApi + nameApi + param_api_get_produtos, obj, (res, status) => {

            if (status == 'success') {

               var data = JSON.parse(res);

               for (var i = 0; i < data.length; i++) {
                  data[i].subtotal = 0;
               }
               setData(data);
            }


         })
      } else {
         alert("Nenhum cliente estabelecimento");
         Sair();
      }

      /*
            axios.get(urlApi + nameApi + param_api_get_produtos, config)
               .then((res) => {
                  var vl = res.data;
                  for (var i = 0; i < vl.length; i++) {
                     vl[i].subtotal = 0;
                  }
                  setData(vl);
      
               }).catch((error) => { alert("Error: parametros API " + error) });
      */
   }, [setData]);


   return (
      <div className="container comanda">
         <h4 className="mb-2 mt-2 pb-2 "><i class="bi bi-clipboard2"></i>Comanda</h4>
         <div class="container-fluid animate__animated animate__fadeIn p-0 m-0 mt-4">
            <div class="row d-flex align-items-center justify-content-between text-center text-secondary flex-row p-0 m-0 ">
               <div class="col-4 border">
                  <p class="mb-0 ">ESTABELECIMENTO</p>                    
                <p className="fs-2 mb-0 mt-0 t-0"> {sessao.cod_estabelecimento ? sessao.cod_estabelecimento : 'S/N'}</p> 
               </div>
               <div class="col-4 border ">
                  
                  <p class="mb-0 pb-0 mt-0">CLIENTE <i class="bi bi-clipboard2"></i></p>
                 <p className="fs-2 mb-0 mt-0 t-0"> N° {cod ? cod : 'S/N'}</p> 
                 
               </div>
               <div class="col-4 border">
                   <p class="mb-0 pb-0 mt-0 ml-0 text-center"> FUNCIONÁRIO </p>
                   <div class="mt-1">
                     <div class="form-label">
                        <select  class="form-select input-sm w-100 text-center" disabled={true} name="cars" id="cars">
                           <option value={sessao.cod}>{sessao.nome ? sessao.nome : 'S/N'}</option>
                        </select>
                     </div>
                   </div>
               </div>
            </div>
         </div>

         <div class="container-fluid animate__animated animate__fadeIn p-0 m-0 mt-4">

            <article>
               <table class="table table-bordered align-right table-responsive">
                  <thead class="align-end">
                     <tr>
                        <th class="fw-medium">Produto</th>
                        <th class="fw-medium">Quant.</th>
                        <th class="fw-medium">Preço</th>
                        <th class="fw-medium">SubTotal</th>
                     </tr>
                  </thead>

                  <tbody>
                     {data && data.map((valor) => {

                        return (
                           <tr key={valor.id}>
                              <td>
                                 <p class="lh-1 fw-light text-start m-0">{valor.nome} {valor.descricao}</p>

                              </td>
                              <td class=" d-flex align-items-center justify-content-center">
                                 <div class="input-group input-group-sm d-flex align-items-center ">
                                    <input type="number" min="1" class="form-control" id={"inpt-qt-id-" + valor.id} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                    <div class="input-group-text" onClick={() => { marcarQuantidade(valor.id, valor.preco) }}>
                                       <input class="form-check-input mt-0" type="checkbox" name="block-qtd" style={{ display: "none" }} id={"check-inpt-" + valor.id} />
                                       <i class="bi bi-lock-fill"></i>
                                    </div>
                                 </div>
                              </td>
                              <td>
                                 <div className="d-flex align-items-center justify-content-center mt-2" >
                                    <p class="lh-1 fw-light  ">{valor && valor.preco}</p>
                                 </div>
                              </td>
                              <td>
                                 <div class="d-subtotal">
                                    <input type='text' id={"inpt-subtotal-" + valor.id} class="form-control" disabled />

                                 </div>
                              </td>

                           </tr>
                        )
                     })}

                  </tbody>

               </table>
               {data.length == 0 &&
                  <div class="container-fluid  d-flex align-items-center alert alert-light"  role="alert">
                     <div class="spinner-grow text-secondary" style={{ marginRight: '10px' }} role="status">
                        <span class="visually-hidden">Loading...</span>
                     </div>
                     

                  </div>
               }
            </article>
         </div>
      </div>
   )
}
export default Comanda;