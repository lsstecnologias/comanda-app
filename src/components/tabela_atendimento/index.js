import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalEditProdutos from '../ModalEditProdutos';
import ModalEditCategorias from '../ModalEditCategorias';
import { Link } from 'react-router-dom';


const $ = require("jquery");

const TabelaAtendimento = () => {

   const [dataClientes, setDataClientes] = useState([]);


    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

   const [id, setId] = useState();

   const urlApi = 'http://10.10.10.6/';
   const nameApi = 'api_comanda/';

   const param_api_delete_atendimentos = '?api=deleteAtendimentos';
   const deleteItem = (id) => {
      if (id !== null || id !== undefined) {
         let objId = { "id": id };
         setDisplayError("block");
         setMsgError("Cliente foi excluido!");
         $.post(urlApi + nameApi + param_api_delete_atendimentos, objId, () => { window.location.reload() })
      }else{
          setDisplayError("none");
         setMsgError(null);
      }
   }
   const editItem = (id) => { setId(id); }
   const fecharModal = () => {
        window.location.reload();
    }
   useEffect(() => {
      const param_api_lista_atendimentos = '?api=getAtendimentos';
      const config = {
         method: "GET",
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'mode': 'no-cors'
         }
      };
      axios.get(urlApi + nameApi + param_api_lista_atendimentos, config)
         .then(async (res) => {
            var vl = await res.data;
            setDataClientes(vl);

         }).catch((error) => {
            alert("Error: parametros API " + error)
         });

   }, [setDataClientes]);

   return (
      <div class="container-fluid m-0 p-0  categorias">
         <div class="container">
            <h4 className="mb-3 ">Clientes <i class="bi bi-people-fill"></i></h4>
            <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                  <i class="bi bi-check-circle-fill p-2"></i>
                  {msgSuccess !== null && msgSuccess}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => { fecharModal() }}></button>
               </div>
               <div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                  <i class="bi bi-exclamation-triangle p-2"></i>
                  {msgError !== null && msgError}

               </div>
            <table class="table m-0 p-0 caption-top animate__animated animate__fadeIn">
               <caption>Lista de clientes confirmados</caption>
               
               <thead>
                  <tr>

                     <th scope="col">Cliente</th>
                     <th scope="col">Agenda</th>
                     <th scope="col" colSpan={2}>Ações</th>
                  </tr>
               </thead>
               <tbody>
                  {dataClientes && dataClientes.map((val) => {
                     return (
                        <tr key={val.id}>

                           <td className='lh-1 fw-light'><b>{val.cod_cliente}</b> {val.cliente}</td>
                           <td className='lh-1 fw-light'><Link class="btn btn-sm btn-primary" to="/admin/agendamento-pedido" ><i class="bi bi-person-lines-fill"></i> </Link>  </td>


                           <td>
                              <button data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editCategoria-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                              <button onClick={() => deleteItem(val.id)} class="btn btn-sm btn-outline-secondary bi bi-x-lg"></button>
                           </td>
                        </tr>
                     )
                  })}

               </tbody>
            </table>
            {dataClientes.length == 0 &&
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