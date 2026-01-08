import 'jquery-mask-plugin';
import $ from 'jquery';
import { useEffect, useState, useContext } from "react"
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../components/context';
import axios from 'axios';
import HeaderComanda from './headerComanda.js';


const NovaComanda = () => {
   //PERIMITE NÃO EXIBIR MODAL DE NOTAS
   sessionStorage.setItem('modal_notas', 'hide');
   const { cod } = useParams();

   const { Sair, thumb_logo, sessao } = useContext(UserContext);

   const [data, setData] = useState([]);
   const [qtd, setQtd] = useState("");
   const [getComanda, setComanda] = useState(false);
   const [Id, setId] = useState();
   const [datacep, setDataCep] = useState("");

   const [displayError, setDisplayError] = useState('none');
   const [displaySuccess, setDisplaySuccess] = useState('none');
   const [msgError, setMsgError] = useState(null);
   const [msgSuccess, setMsgSuccess] = useState(null);
   const [subTotal, setSubTotal] = useState([]);

   const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");

   const urlApi = 'http://10.10.10.6/';
   const nameApi = 'api_comanda/';
   const param_api_get_produtos = "?api=getProdutos";


   /*
   const registrarComanda = (e) => {
      e.preventDefault();
      let data_atual = new Date();
      let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();

      const param_api_save_comanda = "?api=setComandas";
      const funcionarioCod = $('#funcionario');
      const funcCod = funcionarioCod.val() ?? false;
      const clienteCod = cod ? cod : false;

      const estCod = sessao.estabelecimento_id ? sessao.estabelecimento_id : false;
      if (estCod !== false) {
         let obj_comanda = { func_cod: funcCod, cliente_cod: clienteCod, est_cod: estCod, data_post: data_post }

         $.post(urlApi + nameApi + param_api_save_comanda, obj_comanda, (res, status) => {
            if (status == 'success') {
               if (res == '1') {
                  setMsgSuccess(`Comanda refente atendimento Cod N°.${clienteCod} foi gerado!`)
                  setDisplaySuccess('block');
                  setComanda(true);

                  $('#btnComanda').attr({ disabled: true })

               } else {
                  setComanda(false)
                  setMsgError('Erro ao gerar a comanda')
                  setDisplayError('block')
               }

            }

         })
      } else {
         alert("Nenhum cliente estabelecimento");
         Sair();
      }

   }*/
   // $('.inpt-qtd').mask('00000');
   function calcularSubtotal(id) {
      $("#qtd-" + id).mask("0000");
      let qtd     = $(`#qtd-${id}`).val();
      let dataf   = data.filter((element) => { return element.id == id });

      dataf[0].qtd      = qtd;
      dataf[0].subtotal = (dataf[0].qtd * dataf[0].preco).toFixed(2);

      $(`#subtotal-${id}`).val(dataf[0].subtotal);

      let soma = 0;
      data.forEach(element => {  soma += parseFloat(element.subtotal);  });
      $('#total').val(soma)

   }
   useEffect(() => {

      if (estabelecimento_id !== 'null') {
         var obj = { 'id': estabelecimento_id };

         $.post(urlApi + nameApi + param_api_get_produtos, obj, (res, status) => {
            if (status == 'success') {
               var data = JSON.parse(res);
               for (var i = 0; i < data.length; i++) {
                  data[i].subtotal = 0
                  data[i].qutdcomanda = 0;
                  $("#qtd-" + data[i].id).mask("00000000");

               }
               setData(data);

            }


         })
      } else {
         alert("Nenhum cliente estabelecimento");
         Sair();
      }

   }, [setData, setComanda, setId]);
  
   
   return (
      <div className="container comanda">
         <h3 className=" mt-2 pb-2 ">Comanda <i class="bi bi-card-checklist"></i></h3>
         <HeaderComanda />
         <div class="container-fluid">
            <table class="table">
               <thead>
                  <tr>
                     <th>Item</th>
                     <th>Quantidade</th>
                     <th>Preco</th>
                     <th class="text-end">Subtotal</th>
                  </tr>
               </thead>
               <tbody>

                  {data.map((element) => {
                     return (
                        <tr key={element.id}>
                           <td class="lh-1 fw-light">{element.item}</td>
                           <td class="lh-1 fw-light">
                              <div class="input-group mb-3">
                                 <input type="text" class="form-control" id={`qtd-${element.id}`} aria-label="Recipient’s username" aria-describedby="button-addon2" />
                                 <button class="btn btn-secondary btn-edigit" type="button" onClick={() => { calcularSubtotal(element.id) }} id="button-addon2"><i class="bi bi-check-lg"></i></button>
                              </div>

                           </td>
                           <td class=" fw-normal" >R$ {element.preco}</td>
                           <td><input type="text" class="form-control" id={`subtotal-${element.id}`} disabled="disabled" /></td>
                        </tr>
                     )
                  })}


               </tbody>
            </table>
         </div>

         <>
            <div class="container-fluid animate__animated animate__fadeIn p-0 m-0 mt-4">

               <article>

                  {data.length == 0 &&
                     <div class="container-fluid  d-flex align-items-center alert alert-light" role="alert">
                        <div class="spinner-grow text-secondary" style={{ marginRight: '10px' }} role="status">
                           <span class="visually-hidden">Loading...</span>
                        </div>
                        Nenhum produto ou cliente para a comanda!


                     </div>
                  }
               </article>
            </div>
            <div class="container-fluid animate__animated animate__fadeIn p-0 m-0 mt-0">
               <div class="row  p-0 m-0 ">

                  <div class="col-sm-12 ">
                     <p class="fw-normal">TOTAL R$ </p>
                     <input class="form-control" id="total" disabled={true} />
                  </div>

               </div>
               <div class="row  p-0 m-0 ">
                  <div class="col-sm-12 mt-2">

                     <button class="btn btn-secondary btn-edigit w-100"><i class="bi bi-check2-all"></i> Salvar</button>
                  </div>
               </div>


            </div>
         </>



      </div>


   )
}
export default NovaComanda;