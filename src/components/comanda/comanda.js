import 'jquery-mask-plugin';
import $ from 'jquery';
import { useEffect, useState, useContext } from "react"
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/index.js';
import axios from 'axios';
import HeaderComanda from './index.js';


const Comanda = () => {
    const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO;
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

   const param_api_get_produtos = "/api/getProdutos/";


   function getCarrinho() {
      const carrinhoJson = sessionStorage.getItem("item_comanda");
      return carrinhoJson ? JSON.parse(carrinhoJson) : [];
   }
   function saveCarrinho(carrinho) {
      sessionStorage.setItem("item_comanda", JSON.stringify(carrinho));
   }
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
      let qtd = $(`#qtd-${id}`).val();
      const carrinho = getCarrinho();
      const dataf = carrinho.find(element => element.id === id );
     
      if (dataf) {
         dataf.qtd_item_comanda = qtd;
         dataf.subtotal_comanda = (dataf.qtd_item_comanda * dataf.preco).toFixed(2);
         dataf.total_comanda = 0;
         $(`#subtotal-${id}`).val(dataf.subtotal_comanda);

         let soma = 0.0;
         carrinho.forEach(element => { soma += parseFloat(element.subtotal_comanda); });
         dataf.total_comanda = parseFloat(soma);

         $('#total').val(soma)
        
 
        /*var x =dataf.find(element =>element.id === id);
         console.log(x)*/
      }else{
          const item = data.find(item=> item.id === id);
         carrinho.push({item})
      } 

      saveCarrinho(carrinho)

     

   }
   function atualizarCarrinho() {
       const carrinho = getCarrinho();
     
       const jsonString = JSON.stringify(carrinho, null, 2);
       const blob = new Blob([jsonString], { type: 'application/json' });
       const url = URL.createObjectURL(blob);

       const a = document.createElement('a');
       a.href = url;
       a.download = estabelecimento_id+'.edigt';
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       URL.revokeObjectURL(url);
   }
/*
   function salvarsComanda() {
      alert("Salvar comanda")
      
     const jsonString = JSON.stringify(obj, null, 2);
       const blob = new Blob([jsonString], { type: 'application/json' });
       const url = URL.createObjectURL(blob);

       const a = document.createElement('a');
       a.href = url;
       a.download = estabelecimento_id+'.cert.lss';
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       URL.revokeObjectURL(url);



   }*/
   useEffect(() => {

      if (estabelecimento_id !== 'null') {

         $.post(apiUrl + param_api_get_produtos, { 'id': estabelecimento_id }, (res, status) => {
            if (status == 'success') {
               var data = res;
               for (var i = 0; i < data.length; i++) {
                  data[i].subtotal_comanda = 0;

                  $("#qtd-" + data[i].id).mask("00000000");

               }
               setData(data);
               saveCarrinho(data)
            }

         })
      } else {
         alert("Nenhum cliente estabelecimento");
         Sair();
      }

   }, [setData, setComanda, setId]);


   return (
      <div className="container mt-3 " >


         <div class="container-fluid" >
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
                           <td class="fw-normal" >R$ {element.preco}</td>
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

                     <button class="btn btn-secondary btn-edigit w-100" onClick={() => {  atualizarCarrinho() }}><i class="bi bi-check2-all"></i> Salvar</button>
                  </div>
               </div>


            </div>
         </>



      </div>


   )
}
export default Comanda;