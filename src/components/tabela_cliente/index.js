import { error } from "jquery";
import { useEffect, useState, useMemo } from "react";
import ListPagina from "../../ListPagina";
import ModalEditUsuarios from "../modalEditUsuarios";
import $ from 'jquery';
import Pagination from "../../ListPagina";


const TabelaCliente = () => {
    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    var [usuarios, setUsuarios] = useState([]);
    const [codUser, setCodUser] = useState("");
    const [id, setId] = useState(null);

    //PAGINACAO
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = usuarios.slice(indexOfFirstPost, indexOfLastPost);
    <ListPagina />
    //FAZER BACKEND
    const paramApi_delete_estabelecimentos = '?api=deleteEstabelecimentos';
    const param_api_list_estabelecimentos = "?api=getEstabelecimentos";
    const editItem = (id) => { setId(id); }


    const deleteUsuario = (id) => {
        if (id !== null || id !== undefined) {
            let objId = { "id": id };
            $.post(urlApi + nameApi + paramApi_delete_estabelecimentos, objId, () => { window.location.reload() })
        }
    }

    useEffect(() => {

        fetch(urlApi + nameApi + param_api_list_estabelecimentos)
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

    return (
        <div class="container table-responsive mt-4">
            <h4 className="mb-2 mt-2 pb-2">Lista</h4>
            <table class="table caption-top animate__animated animate__fadeIn ">

                <thead>
                    <tr>

                        <th scope="col">Cod. </th>
                        <th scope="col">Nome</th>
                        <th scope="col">Perfil</th>
                        <th className="text-end" scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts && currentPosts.map((e) => {

                        return (
                            <tr key={e.id}>

                                <td className='lh-1 fw-light'>{e.cod}</td>
                                <td className='lh-1 fw-light'>{e.nome}</td>
                                <td className='lh-1 fw-light'>{e.perfil == 'a' ? 'Admin' : 'User'}</td>
                                <td className="d-flex align-items-center justify-content-end">
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

export default TabelaCliente;