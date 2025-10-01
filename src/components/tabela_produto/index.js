import axios from 'axios';
import { useEffect, useState } from 'react';
const TabelaProduto = () => {
    const [data,setData] = useState([]);
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
        axios.get('http://10.10.10.6/api_comanda/?api=getProdutos', config)
            .then((res) => {
                var vl = res.data;

                setData(vl);
                console.log(vl)
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
                        <th scope="col">Quantidade</th>
                        <th scope="col">Preço unit.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>John</td>
                        <td>Doe</td>
                        <td>@social</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}
export default TabelaProduto;