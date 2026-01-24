import { useEffect, useState } from 'react';
const $ = require("jquery");

const AgendamentoPedido = () => {
   const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO;  
  //PERIMITE NÃO EXIBIR MODAL DE NOTAS
   sessionStorage.setItem('modal_notas', 'hide');
   
   const [data, setData] = useState([]);
   const [id, setId] = useState();

   const urlApi = 'http://10.10.10.6/';
   const nameApi = 'api_comanda/';

   const param_api_delete_categoria = '?api=deleteCategorias';
   const deleteItem = (id) => {
      if (id !== null || id !== undefined) {
         let objId = { "id": id };
         $.post(apiUrl + param_api_delete_categoria, objId, () => { window.location.reload() })
      }
   }
   const editItem = (id) => { setId(id); }

   useEffect(() => {
      const param_api_lista_atendimentos = '?api=getAllAtendimentos';
          
      $.get(apiUrl+param_api_lista_atendimentos ,(res,status)=>{
         if(status == 'success'){
           const dataResult = JSON.parse(res);
           setData(dataResult)
         }
      })
     
   }, [setData]);



   return (
      <div className="container-fluid categorias">
         <div className="container">
            <h4 className=" mt-4  ">Agendamento e Pedidos <i class="bi bi-clock"></i></h4>
            <table class="table m-0 p-0  caption-top animate__animated animate__fadeIn">
               <caption>Lista de clientes confirmados</caption>
               <thead>
                  <tr>

                     <th scope="col fw-light">Cod. Atendimento</th>
                     <th scope="col fw-light">Atendente</th>
                     <th scope="col fw-light">Data Atendimento</th>
                     <th scope="col" > </th>
                  </tr>
               </thead>
               <tbody>
                  {data && data.map((val) => {
                     
                     return (
                        <tr key={val.id}>

                           <td className='fw-light'>{val.cod_atendimento}</td>
                           <td className='fw-light'>{val.cod_atendente}</td>
                           <td className='fw-light'>{val.data_atendimento}</td>                     
                           <td className='fw-light'><button class="btn btn-primary btn-sm" type="submit"><i class="bi bi-person-fill-gear"></i></button></td>

                        </tr>
                     )
                  })}

               </tbody>
            </table>
            {
               data.length == 0 &&
               <div class="alert alert-light" role="alert">
                  <div class="spinner-border" role="status">
                     <span class="visually-hidden">Loading...</span>

                  </div>

               </div>
            }
         </div>
      </div >
   )

}
export default AgendamentoPedido;