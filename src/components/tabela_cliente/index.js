import { error } from "jquery";
import { useEffect, useState, useMemo } from "react";
import ListPagina from "../../ListPagina";
import ModalEditUsuarios from "../modalEditUsuarios";
import $ from 'jquery';
import Pagination from "../../ListPagina";
import axios from "axios";


const TabelaCliente = () => {
    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    var [clienteEstablecimento, setClienteEstablecimento] = useState([]);
    const [codUser, setCodUser] = useState("");
    const [id, setId] = useState(null);

    //PAGINACAO
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = clienteEstablecimento.slice(indexOfFirstPost, indexOfLastPost);
    <ListPagina />

    const param_api_delete_estabelecimentos = '?api=deleteEstabelecimentos';
    const param_api_list_estabelecimentos = "?api=getEstabelecimentos";
    const editItem = (id) => { setId(id); }


    const deleteEstabelecimento = (id) => {
        if (id !== null || id !== undefined) {
            let objId = { "id": id };
            $.post(urlApi + nameApi + param_api_delete_estabelecimentos, objId, () => { window.location.reload() })
        }
    }

    useEffect(() => {

        const config = {

            method: "get",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                'mode': 'no-cors'
            }
        };
        axios.get(urlApi + nameApi + param_api_list_estabelecimentos, config)
            .then((res) => {

                setClienteEstablecimento(res.data)
            }).catch((error) => { alert("Error: parametros API " + error) });


    }, [setClienteEstablecimento]);

    return (
        <div class="container table-responsive produtos mt-4">
            <h4 className="mb-2 mt-2 pb-2">Lista Estabelecimento</h4>
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
                                <td className='lh-1 fw-light'>{e.perfil == 's' ? 'Super' : 'User'}</td>
                                <td className="d-flex align-items-center justify-content-end">
                                    <button data-bs-toggle="modal" onClick={() => editItem(e.id)} data-bs-target={"#editUsuario-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                                    <button class="btn btn-sm btn-outline-secondary bi bi-x-lg" onClick={() => deleteEstabelecimento(e.id)}></button>
                                </td>

                            </tr>
                        )
                    })}

                </tbody>
            </table>

            {currentPosts.length == 0 &&
                <div class="alert alert-light d-flex align-items-center justify-content-start " role="alert">
                    <div class="col">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>

                        </div>
                    </div>
                    <div class="col text-start">
                        Aguarde ...
                    </div>

                </div>
            }
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={clienteEstablecimento.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            <ModalEditUsuarios data_id={id} />

        </div>
    )

};

export default TabelaCliente;