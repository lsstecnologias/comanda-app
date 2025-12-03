import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context';
import ModalEditProdutos from '../ModalEditProdutos';
import ModalEditCategorias from '../ModalEditCategorias';
import ListPagina from "../../ListPagina";
import Pagination from "../../ListPagina";

const $ = require("jquery");

const TabelaCategoria = () => {
   //PERIMITE NÃO EXIBIR MODAL DE NOTAS
   sessionStorage.setItem('modal_notas', 'hide');
   const { GetSession, sessao, Sair, status } = useContext(UserContext);
   const [data, setData] = useState([]);
   const [id, setId] = useState();

   //HOOK MSG ERROS
   const [displayError, setDisplayError] = useState('none');
   const [displaySuccess, setDisplaySuccess] = useState('none');
   const [msgError, setMsgError] = useState(null);
   const [msgSuccess, setMsgSuccess] = useState(null);

   //PAGINACAO
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage] = useState(6);
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
   <ListPagina />

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
      /*
      
      const dataUser = sessionStorage.getItem("cod_estabelecimento");
      var cod_estabelecimento = dataUser;
      if (cod_estabelecimento !== 'null') {
          const param_api_list_categ = `?api=getCategorias`;

         var obj = { 'id': cod_estabelecimento };

         $.post(urlApi + nameApi + param_api_list_categ, obj, (res, status) => {
             if (status == 'success') {
               console.log(res)

               var data = JSON.parse(res);
               console.log(data)
               setData(data); 

            }

         })
      } else {
         alert("Nenhum cliente estabelecimento");
         Sair();
      }
      */

      const dataUser = sessionStorage.getItem("cod_estabelecimento");
      var cod_estabelecimento = dataUser;
      if (cod_estabelecimento !== 'null') {
         const param_api_list_categ = `?api=getCategorias`;

         var obj = { 'id': cod_estabelecimento };

         $.post(urlApi + nameApi + param_api_list_categ, obj, (res, status) => {
          
               var dataArr =  JSON.parse(res);
            

               if (Array.isArray(dataArr) && dataArr.length == 0) {
                  setDisplayError("block");
                  setMsgError("Adicione categoria para o seu item!");
                  
                  /* 
                   setDisplaySuccess("none");
                   setMsgSuccess(null);
                   alert('Nenhuma categoria adicionada')
                   */
               
               } else {

                  setData(dataArr);
                 


               }


            

         })
      } else {
         alert("Nenhum cliente estabelecimento");
         Sair();
      }

   }, [setData]);

   return (
      <div class="container-fluid m-0 p-0 ">
         <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
            <i class="bi bi-check-circle p-2"></i>
            {msgSuccess !== null && msgSuccess}

         </div>

         <div className='container m-0 p-0 table-responsive animate__animated animate__fadeIn'>
            <table class="table m-0 p-0  caption-top animate__animated animate__fadeIn">
               <caption>Lista categorias</caption>
               <thead>
                  <tr>

                     <th scope="col">Cod. </th>
                     <th scope="col">Categoria</th>
                     <th scope="col">Data</th>
                     <th colSpan={2} class="text-end" scope="col">Ações</th>
                  </tr>
               </thead>
               <tbody >
                  {currentPosts && currentPosts.map((val) => {
                     return (
                        <tr key={val.id}>
                           <th scope="row" >{val.cod}</th>

                           <td className='lh-1 fw-light'>{val.nome}</td>
                           <td className='lh-1 fw-light'>{val.data_post}</td>

                           <td className='text-end'>
                              {/*  <button data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editCategoria-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                              <button onClick={() => deleteItem(val.id)} class="btn btn-sm btn-outline-secondary bi bi-x-lg"></button> */}
                              <div class="btn-group" role="group" aria-label="Basic outlined example">
                                 <button type="button" data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editCategoria-" + id} class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil-square"></i></button>

                                 <button type="button" onClick={() => deleteItem(val.id)} class="btn  btn-sm  btn-outline-primary"> <i class="bi bi-x-lg"></i></button>
                              </div>
                           </td>
                        </tr>
                     )
                  })}

               </tbody>
            </table>
            {data.length == 0 &&

               <div class="d-flex align-items-center alert alert-light fade show" style={{ display: displayError }} role="alert">
                
                  <div class="spinner-grow text-secondary" style={{ marginRight: '10px' }} role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>

                  {msgError !== null && msgError}

               </div>
            }
            {/* <ModalEditCategorias data_id={id} /> */}
            {console.log(data)}
            <Pagination
               postsPerPage={postsPerPage}
               totalPosts={data.length}
               setCurrentPage={setCurrentPage}
               currentPage={currentPage}
            />

         </div>
      </div>

   )

}
export default TabelaCategoria;