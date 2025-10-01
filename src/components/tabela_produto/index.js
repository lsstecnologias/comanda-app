import axios from 'axios';
import { useEffect, useState } from 'react';
const $ = require("jquery");

const TabelaProduto = () => {
    const [data, setData] = useState([]);
      const [statusMsgErro, setStatusMsgErro] = useState("none");
        const [statusMsgSuccess, setStatusMsgSuccess] = useState("none");
        
    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const paramApi_lista_produto = '?api=getProdutos';
    const paramApi_delete_item = '?api=deleteItem';


    const deleteItem = (id) => {
        if(id !== null || id !== undefined){
            let objId= { "id": id };
            $.post(urlApi + nameApi + paramApi_delete_item,objId, (req, res) => {
                 if (res === "null") {
                    setStatusMsgErro("block");
                } else {
                    setStatusMsgErro("none");
                }
                if (res == 1) {
                    setStatusMsgSuccess("block");
                } else {
                    setStatusMsgSuccess("none");
                }
            })
        }
    }


    useEffect(() => {

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
                        <th scope="col">Qtd.</th>
                        <th scope="col">Preço unit.</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((val) => {
                        return (
                            <tr key={val.id}>
                                <th scope="row">{val.id}</th>
                                <td>{val.nome}</td>
                                <td>{val.quantidade}</td>
                                <td>{val.preco}</td>
                                <td><button class="btn btn-sm btn-outline-secondary bi bi-pencil-square"></button> <button onClick={() => deleteItem(val.id)} class="btn  btn-sm btn-outline-secondary bi bi-x-lg"></button></td>
                            </tr>
                        )
                    })

                    }
                </tbody>
            </table>
        </div>
    )

}
export default TabelaProduto;