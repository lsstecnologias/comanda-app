import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalEditProdutos from '../ModalEditProdutos';
import ModalEditCategorias from '../ModalEditCategorias';


const $ = require("jquery");

const TabelaAtendimento = () => {

   const [data, setData] = useState([]);
   const [id, setId] = useState();

   const urlApi = 'http://10.10.10.6/';
   const nameApi = 'api_comanda/';

   const param_api_delete_categoria = '?api=deleteCategorias';
   const deleteItem = (id) => {
      if (id !== null || id !== undefined) {
         let objId = { "id": id };
         $.post(urlApi + nameApi + param_api_delete_categoria, objId, () => { window.location.reload() })
      }
   }
   const editItem = (id) => { setId(id); }

   useEffect(() => {
      const param_api_lista_categorias = '?api=getCategorias';
      const config = {
         method: "GET",
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'mode': 'no-cors'
         }
      };
      axios.get(urlApi + nameApi + param_api_lista_categorias, config)
         .then(async (res) => {
            var vl = await res.data;
            setData(vl);

         }).catch((error) => {
            alert("Error: parametros API " + error)
         });

   }, [setData]);

   return (
      <div class="container-fluid m-0 p-0 mt-4 categorias">
         <div class="container">
                <h4 className="mb-4 mt-4 pb-2 ">Atendimento</h4>
            <table class="table m-0 p-0 mt-4 caption-top animate__animated animate__fadeIn">
               <caption>Meus atendimento</caption>
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Cod. </th>
                     <th scope="col">Categ.</th>
                     <th scope="col">Data</th>
                     <th scope="col">Ações</th>
                  </tr>
               </thead>
               <tbody>
                  {data && data.map((val) => {
                     return (
                        <tr key={val.id}>
                           <th scope="row">{val.id}</th>
                           <td className='lh-1 fw-light'>{val.cod}</td>
                           <td className='lh-1 fw-light'>{val.nome}</td>
                           <td className='lh-1 fw-light'>{val.data_post}</td>

                           <td>
                              <button data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editCategoria-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                              <button onClick={() => deleteItem(val.id)} class="btn btn-sm btn-outline-secondary bi bi-x-lg"></button>
                           </td>
                        </tr>
                     )
                  })}

               </tbody>
            </table>
            {data.length == 0 &&
               <div class="alert alert-light" role="alert">
                  <div class="spinner-border" role="status">
                     <span class="visually-hidden">Loading...</span>

                  </div>

               </div>
            }
         </div>
      </div>

   )

}
export default TabelaAtendimento;