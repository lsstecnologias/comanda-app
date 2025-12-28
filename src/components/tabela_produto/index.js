import 'animate.css';

import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import ModalEditProdutos from '../ModalEditProdutos';
import ListPagina from "../../ListPagina";
import Pagination from "../../ListPagina";
import { UserContext } from '../context';

const $ = require("jquery");

const TabelaProduto = () => {
    //PERIMITE NÃO EXIBIR MODAL DE NOTAS
    sessionStorage.setItem('modal_notas', 'hide');
    const { GetSession, sessao, Sair, status } = useContext(UserContext);

    const [dataProdutos, setDataProdutos] = useState([]);
    const [id, setId] = useState();

    //HOOK MSG ERROS
    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    //PAGINACAO
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataProdutos.slice(indexOfFirstPost, indexOfLastPost);
    <ListPagina />


    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    const paramApi_delete_item = '?api=deleteItem';
    const deleteItem = (id) => {
        if (id !== null || id !== undefined) {
            let objId = { "id": id };
            $.post(urlApi + nameApi + paramApi_delete_item, objId, () => { window.location.reload() })
        }
    }
    const editItem = (id) => { setId(id); }

    useEffect(() => {

        //REALIZA O REGISTRO COM O COD DO ESTABELECIMENTO
        const id_estabelecimento = sessionStorage.getItem("estabelecimento_id");
        

        if (id_estabelecimento !== 'null') {
            const param_api_list_produto = `?api=getProdutos`;

            var obj = { 'id': id_estabelecimento };
            $.post(urlApi + nameApi + param_api_list_produto, obj, (res, status) => {

                if (status == 'success') {
                    var data = JSON.parse(res);
                    setDataProdutos(data);                   

                } else {
                    alert("Error: parametros API!")
                }

            })
        } else {
            alert("Nenhum cliente estabelecimento");
            Sair();
        }

    }, [setDataProdutos]);

    return (
        <div class="container-fluid m-0 p-0 mt-4 ">
            <div class='container table-responsive'>
                <table class="table caption-top  animate__animated  animate_fadeIn">
                    <caption>Lista produtos</caption>
                    <thead>
                        <tr>
                            <th scope="col">Est.</th>
                            <th scope="col">Cod.</th>
                            <th scope="col">Item</th>
                            <th scope="col">Desc</th>
                            <th scope="col">Categ</th>                                             
                            <th class="text-end" scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*RETORNAR COD ESTABELECIMENTO */}
                        {currentPosts && currentPosts.map((val) => {

                            return (
                                <tr key={val.id}>
                                    <td scope="row">{val.estabelecimento_id}</td>
                                    <td className='fw-light'>{val.cod_item}</td>
                                    <td className='fw-light'>{val.item}</td>
                                    <td className='fw-light'>{val.descricao}</td>
                                    <td className='fw-light'>{val.categoria}</td>
                              
                                   
                                    <td className='text-end'>
                                        {/* <button data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editProduto-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                                        <button onClick={() => deleteItem(val.id)} class="btn btn-sm btn-outline-secondary bi bi-x-lg"></button> */}

                                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editProduto-" + id} class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil-square"></i></button>
                                            <button type="button" onClick={() => deleteItem(val.id)} class="btn  btn-sm  btn-outline-primary"> <i class="bi bi-x-lg"></i></button>

                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                {dataProdutos.length == 0 &&
                    <div class="d-flex align-items-center alert alert-light fade show" style={{ display: displayError }} role="alert">
                        <div class="spinner-grow text-secondary" style={{ marginRight: '10px' }} role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p className='mt-3'>Adicione um novo item a sua lista!</p>
                        {/*msgError !== null && msgError*/}
                    </div>
                }

                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={dataProdutos.length}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
                
            </div>
            <ModalEditProdutos data_id={id} />
        </div>

    )
 
}
export default TabelaProduto;