import { error } from "jquery";
import { useEffect, useState, useMemo } from "react";

import ModalEditUsuarios from "../modalEditUsuarios";
import $ from 'jquery';


const TabelaUsuario = () => {
    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    var [usuarios, setUsuarios] = useState([]);
    const [codUser, setCodUser] = useState("");
    const [id, setId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);

    const editItem = (id) => {
        setId(id);
    }
    const paramApi_delete_item = '?api=deleteUsuarios';
    const deleteUsuario = (id) => {
        if (id !== null || id !== undefined) {
            let objId = { "id": id };
            $.post(urlApi + nameApi + paramApi_delete_item, objId, () => { window.location.reload() })
        }
    }

    useEffect(() => {
        const param_api_list_usuario = "?api=getUsuarios";
        fetch(urlApi + nameApi + param_api_list_usuario)
            .then(async (e) => {
                return await e.json();
            }).then(res => {
                if (Array.isArray(res) && res.length == 0) {
                    alert("Error: parametros API");
                } else {
                    setUsuarios(res);
                }

            }).catch(error => {
                alert("Error: parametros API" + error);
            })


    }, [setCodUser, setUsuarios]);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = usuarios.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div class="table-responsive mt-4 m-3">

            <table class="table caption-top animate__animated animate__fadeIn ">

                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cod. </th>
                        <th scope="col">Nome</th>
                        <th scope="col">Perfil</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts && currentPosts.map((e) => {

                        return (
                            <tr key={e.id}>
                                <th scope="row">{e.id}</th>
                                <td className='lh-1 fw-light'>{e.cod}</td>
                                <td className='lh-1 fw-light'>{e.nome}</td>
                                <td className='lh-1 fw-light'>{e.perfil == 'a' ? 'Admin' : 'User'}</td>
                                <td>
                                    <button data-bs-toggle="modal" onClick={() => editItem(e.id)} data-bs-target={"#editUsuario-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                                    <button class="btn btn-sm btn-outline-secondary bi bi-x-lg" onClick={() => deleteUsuario(e.id)}></button>
                                </td>

                            </tr>
                        )
                    })}


                </tbody>
            </table>

            {currentPosts.length == 0 &&
                <div class="alert alert-light" role="alert">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>

                    </div>

                </div>
            }
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={usuarios.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            <ModalEditUsuarios data_id={id} />
        </div>
    )
};
    const Pagination = ({
        postsPerPage,
        totalPosts,
        setCurrentPage,
        currentPage,
    }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber, e) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`} >
                        <a onClick={(e) => paginate(number, e)} href="!#" className="page-link" >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}


export default TabelaUsuario;