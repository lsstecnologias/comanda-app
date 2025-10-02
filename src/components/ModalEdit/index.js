import { useCallback, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import axios from "axios";
const $ = require("jquery");

const ModalEdit = (data_id) => {
    const [statusMsgErro, setStatusMsgErro] = useState("none");
    const [statusMsgSuccess, setStatusMsgSuccess] = useState("none");
    const [dataFilter, setDataFilter] = useState([]);
    const [edit, setEdit] = useState([]);

    const [nome, setNome] = useState("");

    var data = { data_id };
    var id = data.data_id;
    var idEdit = id.data_id;

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const paramApi_lista_produto = '?api=getProdutos';

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
                setDataFilter(vl)
            }).catch((error) => { alert(error); });


    }, [setDataFilter, setEdit, setNome]);
    const vlFilter = dataFilter.filter(e => { return e.id === idEdit });
    const handlerEdit = (e)=>{
      
       setNome(e.target.value)
       console.log(nome)
    }
   
    return (
        <div class="modal fade" id={"editProduto-" + idEdit} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticeditProduto" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticnvProduto">Produto {idEdit}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" style={{ display: statusMsgErro }} role="alert">
                            Preencha os campo(s)!
                        </div>
                        <div class="alert alert-success" style={{ display: statusMsgSuccess }} role="alert">
                            Produto <strong>s </strong> atualizado!
                        </div>

                    {vlFilter && vlFilter.map(e=>{
                     
                        return(
                        <div key={e.id}>
                            
                            <div class="mb-3">
                                <label for="nomeItemInput" class="form-label">Nome item</label>
                                <input type="text" value={nome} onChange={(e)=>{ handlerEdit(e) }} class="form-control " id="nomeItemInput" autocomplete="off" placeholder={e.nome} />
                            </div>
                            <div class="mb-3">
                                <label for="descItemInput" class="form-label">Descrição item</label>
                                <input type="text" class="form-control" id="descItemInput" autocomplete="off" placeholder={e.descricao} />
                            </div>
                            <div class="mb-3">
                                <label for="qtItemInput" class="form-label">Quantidade</label>
                                <input type="number" min="1" class="form-control" id="qtItemInput" autocomplete="off" placeholder={e.quantidade} />
                            </div>
                            <div class="mb-3">
                                <label for="precoUnitInput" class="form-label">Preço unitário</label>

                                <NumericFormat
                                    autoComplete="off"
                                    thousandSeparator=","
                                    class="form-control" id="precoUnitInput" placeholder={"R$ "+e.preco}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    onValueChange={(values) => {
                                        console.log(values)
                                    }}
                                />
                            </div>
                            </div>
                        )
                   })}
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn w-100 btn-primary"> <i class="bi bi-plus-circle"></i> Editar</button>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default ModalEdit;