import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalEditProdutos from '../ModalEditProdutos';

import ReactPaginate from 'react-paginate';
const $ = require("jquery");


const TabelaProduto = () => {
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [msg, setMsg] = useState("none");
    
    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    const paramApi_delete_item = '?api=deleteItem';
    const deleteItem = (id) => {
        if (id !== null || id !== undefined) {
            let objId = { "id": id };
            $.post(urlApi + nameApi + paramApi_delete_item, objId, (req, res) => { window.location.reload() })
        }
    }

    const editItem = (id) => {
        setId(id);
    }


    useEffect(() => {

      
        const paramApi_lista_produto = '?api=getProdutos';
        let config = {

            method: "get",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                'mode': 'no-cors'
            }
        };
        axios.get(urlApi + nameApi + paramApi_lista_produto, config)
            .then((res) => {
                var vl = res.data;
                setData(vl);

            }).catch((error) => { alert(error); });

    }, [setData]);

    return (
        <div class="table-responsive mt-4">

            <table class="table caption-top">
                <caption>Lista de produtos</caption>
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
                    Nenhum produto!
                </div>
            }
            <ModalEditProdutos data_id={id} />

           
        </div>

    )

}
export default TabelaProduto;