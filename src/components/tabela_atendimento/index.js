import axios from 'axios';
import './style.css';
import { useEffect, useState } from 'react';
import ModalEditProdutos from '../ModalEditProdutos';
import ModalEditCategorias from '../ModalEditCategorias';
import { Link } from 'react-router-dom';
import ModalEditAtendimentos from '../modalEditAtendimentos';
import ListPagina from "../../ListPagina";
import Pagination from "../../ListPagina";
import $ from 'jquery';

const TabelaAtendimento = () => {
   sessionStorage.setItem('modal_notas', 'hide');
   const [dataClientes, setDataClientes] = useState([]);
   const [codCliente, setCodCliente] = useState();

   const [displayError, setDisplayError] = useState('none');
   const [displaySuccess, setDisplaySuccess] = useState('none');
   const [msgError, setMsgError] = useState(null);
   const [msgSuccess, setMsgSuccess] = useState(null);

   const [id, setId] = useState();
   
    //PAGINACAO
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataClientes.slice(indexOfFirstPost, indexOfLastPost);
    <ListPagina />

   const urlApi = 'http://10.10.10.6/';
   const nameApi = 'api_comanda/';

   const param_api_delete_atendimentos = '?api=deleteAtendimentos';
   const id_estabelecimento = sessionStorage.getItem("estabelecimento_id");

   const deleteItem = (id) => {
      if (id !== null || id !== undefined) {
         let objId = { "id": id };
         setDisplayError("block");
         setMsgError("Cliente foi excluido!");
         $.post(urlApi + nameApi + param_api_delete_atendimentos, objId, () => { window.location.reload() })

      } else {
         setDisplayError("none");
         setMsgError(null);

      }
   }

   const editItem = (id, cod_cliente) => {
      setId(id);
      setCodCliente(cod_cliente)
   }
   const fecharModal = () => {
      window.location.reload();
   }

   useEffect(() => {

      if (id_estabelecimento !== 'null') {
         const param_api_get_atendimento = "?api=getAtendimentos";

         let obj = { id: id_estabelecimento }
         $.post(urlApi + nameApi + param_api_get_atendimento, obj, (res, status) => {

            let data = JSON.parse(res)
            if (status == 'success') {
               setDataClientes(data);

            } else {
               setDisplayError("block");
               setMsgError("Erro: !");
               setDisplaySuccess("none");
               setMsgSuccess(null);

            }

         })
      } else {
         alert("Nenhum cliente estabelecimento");
         //Sair();
      }

   }, [setDataClientes]);

   return (
      <div class="container-fluid m-0 p-0  categorias">
         <div class="container ">
            <h4 className="mb-3">Atendimentos <i class="bi bi-people-fill"></i></h4>
            <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
               <i class="bi bi-check-circle-fill p-2"></i>
               {msgSuccess !== null && msgSuccess}
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => { fecharModal() }}></button>
            </div>
            <div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
               <i class="bi bi-exclamation-triangle p-2"></i>
               {msgError !== null && msgError}

            </div>
            <table class="table m-0 p-0 caption-top animate__animated animate__fadeIn mb-4">
               <caption>Lista de clientes confirmados</caption>

               <thead>
                  <tr class="text-start">

                     <th scope="col">Cod.</th>
                     <th scope="col">Nome</th>                   
                     <th scope="col" colSpan={2} class="text-center">Ações</th>
                  </tr>
               </thead>
               <tbody>
                  {currentPosts && currentPosts.map((val) => {
                     return (
                        <tr key={val.id}>
                           <td className='fw-light'><b>{val.cod_cliente}</b></td>
                           <td className=' fw-light'> {val.cliente}</td>
                           <td className='lh-1 fw-light text-end '>
                              {/* <Link class="btn btn-sm btn-primary" to="/admin/agendamento-pedido" >Comanda <i class="bi bi-card-list"></i> </Link>
                               <Link class="btn btn-sm btn-secondary" to="/admin/agendamento-pedido" >Agendamentos <i class="bi bi-clock-history"></i> </Link> */}
                              <div class="btn-group" role="group" aria-label="Basic outlined example">
                                 <Link type="button" class="btn btn-sm btn-outline-primary" to={`/admin/comanda/${val.cod_cliente}`}> <i class="bi bi-card-list"></i></Link>
                                 <Link type="button" class="btn btn-sm btn-outline-primary" to="/admin/agendamento-pedido" > <i class="bi bi-clock-history"></i></Link>
                              </div>
                           </td>
                           <td class="text-end">
                              {/*<button data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editCategoria-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                              <button onClick={() => deleteItem(val.id)} class="btn btn-sm btn-outline-secondary bi bi-x-lg"></button> */}
                              <div class="btn-group" role="group" aria-label="Basic outlined example">
                                 <button type="button" data-bs-toggle="modal" onClick={() => editItem(val.id, val.cod_cliente)} data-bs-target={"#editAtendimento-" + id} class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil-square"></i></button>
                                 <button type="button" onClick={() => deleteItem(val.id)} class="btn  btn-sm  btn-outline-primary disable-link"> <i class="bi bi-x-lg"></i></button>
                              </div>

                           </td>
                        </tr>
                     )
                  })}

               </tbody>
            </table>
            {currentPosts.length == 0 &&
               <div class="d-flex align-items-center alert alert-light fade show" style={{ display: displayError }} role="alert">

                  <div class="spinner-grow text-secondary" style={{ marginRight: '10px' }} role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>

                  {"Nenhum atendimento relacionado ao estabelecimento!"}

               </div>
            }
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={dataClientes.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            <ModalEditAtendimentos data_id={id} data_cod={codCliente} />
         </div>
      </div>

   )

}
export default TabelaAtendimento;