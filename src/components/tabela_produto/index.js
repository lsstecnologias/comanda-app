import 'animate.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalEditProdutos from '../ModalEditProdutos';

import ReactPaginate from 'react-paginate';
const $ = require("jquery");

const TabelaProduto = () => {

    const [data, setData] = useState([]);
    const [id, setId] = useState();

    //HOOK MSG ERROS
    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);


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
        const paramApi_lista_produto = '?api=getProdutos';
        const config = {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                'mode': 'no-cors'
            }
        };
        axios.get(urlApi + nameApi + paramApi_lista_produto, config)
            .then(async (res) => {
                var vl = await res.data;
                setData(vl);

            }).catch((error) => { alert("Error: parametros API " + error) });

    }, [setData]);

    return (
        <div class="container-fluid mt-4 ">
            <div className='container table-responsive'>
                <table class="table caption-top  animate__animated  animate_fadeIn">
                    <caption>Lista produtos</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome </th>
                            <th scope="col">Categ.</th>
                            <th scope="col">Preço unit.</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <th scope="row">{val.id}</th>
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
                <ModalEditProdutos data_id={id} />
            </div>

        </div>

    )

}
export default TabelaProduto;