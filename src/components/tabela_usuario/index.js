import { error } from "jquery";
import { useEffect, useState } from "react";
import ModalEditUsuarios from "../modalEditUsuarios";
import $ from 'jquery';
const TabelaUsuario = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [codUser, setCodUser] = useState("");
    const [id, setId] = useState(null);

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const editItem = (id) => {
        setId(id);
    }
    const paramApi_delete_item = '?api=deleteUsuarios';
    const deleteUsuario = (id) => {
        if (id !== null || id !== undefined) {
            let objId = { "id": id };
            $.post(urlApi + nameApi + paramApi_delete_item, objId, (req, res) => { window.location.reload() })
        }
    }

    useEffect(() => {
        const param_api_list_usuario = "?api=getUsuarios";

        const getUsuarios = () => {
            fetch(urlApi + nameApi + param_api_list_usuario)
                .then((e) => {
                    return e.json();

                }).then(res => {
                    if (Array.isArray(res) && res.length === 0) {
                        alert("Error: parametros API");
                    } else {
                        setUsuarios(res);
                    }

                }).catch(error => {
                    alert(error)
                })
        }
        getUsuarios();

    }, [setUsuarios, setCodUser]);

    return (
        <div class="table-responsive mt-4 m-3">

            <table class="table caption-top animate__animated  animate__fadeIn ">

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
                    {usuarios && usuarios.map((e) => {

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
            {usuarios.length == 0 &&
                <div class="alert alert-light" role="alert">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>

                    </div>

                </div>
            }
            <ModalEditUsuarios data_id={id} />
        </div>
    );
}
export default TabelaUsuario;