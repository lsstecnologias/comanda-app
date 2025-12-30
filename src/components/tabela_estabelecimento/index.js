import { error } from "jquery";
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../context';
import ListPagina from "../../ListPagina";
import ModalEditEstabelecimentos from "../modalEditEstabelecimentos";
import $ from 'jquery';
import Pagination from "../../ListPagina";
import axios from "axios";


const TabelaCliente = () => {
    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    //PERIMITE NÃO EXIBIR MODAL INICIAL DE NOTAS
    sessionStorage.setItem('modal_notas', 'hide');
    const { sessao, status, redirect_login, Sair } = useContext(UserContext);

    var [clienteEstablecimento, setClienteEstablecimento] = useState([]);
    const [codItem, setCodItem] = useState([]);
    const [cod, setCod] = useState([]);
    const [id, setId] = useState(null);

    //PAGINACAO
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = clienteEstablecimento.slice(indexOfFirstPost, indexOfLastPost);
    <ListPagina />

    const param_api_delete_estabelecimentos = "?api=deleteEstabelecimentos";
    const param_api_list_estabelecimentos = "?api=getEstabelecimentos";
    const param_api_get_lojaEstabelecimentos = "?api=getFileUser";
    const param_api_update_thumb_img = "?api=setUpdateThumb";
    const param_api_update_status_atendimento = "?api=mudarStatusAtendimento";
    const editItem = (id) => { setId(id); }

/*
    const gerarJsonVitrine = () => {

         const myData = {
           product: "Laptop",
           price: 1200,
           inStock: true
       };

       const jsonString = JSON.stringify(myData, null, 2);
       const blob = new Blob([jsonString], { type: 'application/json' });
       const url = URL.createObjectURL(blob);

       const a = document.createElement('a');
       a.href = url;
       a.download = 'data.json';
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       URL.revokeObjectURL(url);

        const dataUser = sessionStorage.getItem("cod_estabelecimento");
        var cod_estabelecimento = dataUser;
        let obj = { 'sessao': sessao };

        $.post(urlApi + nameApi + param_api_get_lojaEstabelecimentos, obj, async (res, status) => {
           
            const dataDir = JSON.parse(res);

            //SALVA O CAMINHO DAS IMAGEN NA TABELA PRODUTO
            await dataDir['arquivo'].forEach(element => {
                if (element !== '.' && element !== '..') {

                    const wordsArray = element.split('_');
                    const cod_est = wordsArray[0];
                    const cod_items = wordsArray[3];
                   
                    
                    var obj = { cod_est: cod_est, cod_item: cod_items, thumb:dataDir['host']+ dataDir['caminho'] + element }
                    $.post(urlApi + nameApi + param_api_update_thumb_img, obj, async (res, status) => {
                       if(status == 'success'){
                             console.log("Semeando imagem [PROGRESS]...");
                            if(res == '1'){
                                console.log("Imagem semeada [OK]...",res);
                            }else{
                                console.log("Imagem semeada [RE-CONFIRMA][OK]...",res);
                            }
                       }else{
                            console.log("Imagem semeada [ERROR]...")
                       }
                    })
                }
            });
          

           
            
            const dataItens = dataDir['res'].filter((e) => { return e });
            const jsonString = JSON.stringify(dataItens, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${cod_estabelecimento}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            

           


        });

    }*/

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
            <h4 className="mb-4 mt-2 pb-2 ">Estabelecimentos  <i class="bi bi-shop-window m-2"></i></h4>
            <table class="table caption-top animate__animated animate__fadeIn ">

                <thead>
                    <tr>

                        <th scope="col">Est.</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ver</th>                       
                        <th className="col text-end">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts && currentPosts.map((val) => {

                        return (
                            <tr key={val.id}>

                                <td className='fw-light'>{val.estabelecimento_id}</td>
                                <td className='fw-light'>{val.nome}</td>

                             
                                <td className='fw-light'><button class="btn btn-sm btn-outline-primary" > <i class="bi bi-eye"></i> Vitrine</button></td>
                                <td className="d-flex align-items-center justify-content-end">

                                    <td className='text-end'>
                                        {/*
                                            <button data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editCategoria-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                                            <button onClick={() => deleteItem(val.id)} class="btn btn-sm btn-outline-secondary bi bi-x-lg"></button>
                                         */}
                                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editEstabelecimento-" + id} class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil-square"></i></button>

                                            <button type="button" onClick={() => deleteEstabelecimento(val.id)} class="btn  btn-sm  btn-outline-primary"> <i class="bi bi-x-lg"></i></button>
                                        </div>
                                    </td>

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
            <ModalEditEstabelecimentos data_id={id} />

        </div>
    )

};

export default TabelaCliente;