import { error } from "jquery";
import { useEffect, useState } from "react";
const TabelaUsuario = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [codUser, setCodUser] = useState("");
    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    useEffect(() => {

        const param_api_list_usuario = "?api=getUsuarios";
        const getUsuarios = () => {
            fetch(urlApi + nameApi + param_api_list_usuario)
            .then((e) => {
                return e.json();
            }).then(res => {
                setUsuarios(res);
            
            }).catch(error => {
                alert(error)
            })
        }
        getUsuarios();

    }, [setUsuarios,setCodUser]);



    return (
        <div class="table-responsive mt-4 m-3">

            <table class="table caption-top ">

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
                                    <button data-bs-toggle="modal" data-bs-target={"#editUsuario-" + e.id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                                    <button class="btn btn-sm btn-outline-secondary bi bi-x-lg"></button>
                                </td>
                               
                            </tr>
                        )
                    })}


                </tbody>
            </table>


        </div>
    );
}
export default TabelaUsuario;