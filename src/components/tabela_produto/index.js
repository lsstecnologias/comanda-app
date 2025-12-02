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

    const [data, setData] = useState([]);
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
     const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
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
        const dataUser = sessionStorage.getItem("cod_estabelecimento");
        var cod_estabelecimento = dataUser;

        if (cod_estabelecimento !== 'null') {
            const param_api_list_produto = `?api=getProdutos`;

            var obj = { 'id': cod_estabelecimento };
            $.post(urlApi + nameApi + param_api_list_produto, obj, (res, status) => {

                if (status == 'success') {
                    var data = JSON.parse(res);
                    setData(data);


                } else {
                    alert("Error: parametros API!")
                }

            })
        } else {
            alert("Nenhum cliente estabelecimento");
            Sair();
        }

    }, [setData]);

    return (
        <div class="container-fluid m-0 p-0 mt-4 ">
            <div class='container table-responsive'>
                <table class="table caption-top  animate__animated  animate_fadeIn">
                    <caption>Lista produtos</caption>
                    <thead>
                        <tr>
                            <th scope="col">Cod.</th>
                            <th scope="col">Nome </th>
                            <th scope="col">Categ.</th>
                            <th scope="col">Preço unit.</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*RETORNAR COD ESTABELECIMENTO */}
                        {currentPosts && currentPosts.map((val) => {

                            return (
                                <tr key={val.id}>
                                    <td scope="row">{val.cod_estabelecimento}</td>
                                    <td className='lh-1 fw-light'>{val.item}</td>
                                    <td className='lh-1 fw-light'>{val.nome}</td>
                                    <td className='lh-1 fw-light'>{val.preco}</td>
                                    <td>
                                        <button data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editProduto-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
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
                
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={data.length}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
               { /* <ModalEditProdutos data_id={id} /> */} 
            </div>

        </div>

    )

}
export default TabelaProduto;