import { useCallback, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import axios from "axios";
const $ = require("jquery");

const ModalEdit = (data_id) => {
    const [valorPreco, setPreco] = useState();
    const [valorNome, setNome] = useState();
    const [valorDesc, setDesc] = useState();
    const [valorQt, setQuant] = useState();

    const [statusMsgErro, setStatusMsgErro] = useState("none");
    const [statusMsgSuccess, setStatusMsgSuccess] = useState("none");
    const [dataFilter, setDataFilter] = useState([]);
    const [edit, setEdit] = useState([]);
    
    const fecharModal = () => {
        window.location.reload();
    }

    var data = { data_id };
    var id = data.data_id;
    var idEdit = id.data_id;

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const vlFilter = dataFilter.filter(e => { return e.id === idEdit });

    const editNovoProduto = (e) => {
        e.preventDefault();
       // let nome = $("#nomeItemInputEdit");
        //let desc = $("#descItemInputEdit");
        //let qtd = $("#qtItemInputEdit");
       // let preco = $("#precoUnitInputEdit");
      
        var objProduto = { id: idEdit, nome:"", desc :"", qtd :"", preco :"", data_criacao:"" };
   
       
        if (valorPreco !== undefined && valorPreco !== "") {
            //preco.addClass("is-valid").removeClass("is-invalid");
            objProduto.preco = valorPreco;
        } else {
           // preco.addClass("is-invalid").removeClass("is-valid");
            objProduto.preco = vlFilter[0].preco;
        }

        if (valorNome !== undefined && valorNome !== "") {
           // nome.addClass("is-valid").removeClass("is-invalid");
            objProduto.nome = valorNome;

        } else {
           // nome.addClass("is-invalid").removeClass("is-valid");
            objProduto.nome = vlFilter[0].nome;
        }

        if (valorDesc !== undefined && valorDesc !== "") {
           // desc.addClass("is-valid").removeClass("is-invalid");
            objProduto.desc = valorDesc;
        } else {
          //  desc.addClass("is-invalid").removeClass("is-valid");
            objProduto.desc =  vlFilter[0].descricao;
        }

        if (valorQt !== undefined && valorQt !== "") {
          //  qtd.addClass("is-valid").removeClass("is-invalid");
            objProduto.qtd = valorQt;
        } else {
           // qtd.addClass("is-invalid").removeClass("is-valid");
            objProduto.qtd = vlFilter[0].quantidade;
        }

        let data_atual = new Date();
        let dataCriacao = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();
        if (objProduto.data_criacao == "") {
            objProduto.data_criacao = dataCriacao;
        }
        
        const paramApi_edit_produto = "?api=updateItem";
        $.post(urlApi + nameApi + paramApi_edit_produto, objProduto, (res, status) => {
            if (status === "success") {

                if (res === "null") {
                    setStatusMsgErro("block");
                    $('#btnEditar').attr({ "disabled": "disabled" });
                } else {
                    setStatusMsgErro("none");
                }
                if (res == 1) {
                    setStatusMsgSuccess("block");
                    $('#btnEditar').attr({ "disabled": "disabled" });
                } else {
                    setStatusMsgSuccess("none");
                }
            } else {
                alert("API Error");
            }

        })
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
                setDataFilter(vl)
            }).catch((error) => { alert(error); });


    }, [setDataFilter, setEdit]);


    return (
        <div class="modal fade" id={"editProduto-" + idEdit} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticeditProduto" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticnvProduto">Edit Produto {idEdit}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { fecharModal() }}></button>
                    </div>
                    <div class="modal-body">
                       

                        {vlFilter && vlFilter.map(e => {

                            return (
                                <div key={e.id}>

                                    <div class="mb-3">
                                        <label for="nomeItemInput" class="form-label">Nome item</label>
                                        <input type="text" class="form-control " id="nomeItemInputEdit" autocomplete="off" onChange={(e) => { setNome(e.target.value) }} placeholder={e.nome} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="descItemInput" class="form-label">Descrição item</label>
                                        <input type="text" class="form-control" id="descItemInputEdit" autocomplete="off" onChange={(e) => { setDesc(e.target.value) }} placeholder={e.descricao} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="qtItemInput" class="form-label">Quantidade</label>
                                        <input type="number" min="1" class="form-control" id="qtItemInputEdit" autocomplete="off" onChange={(e) => { setQuant(e.target.value); }} placeholder={e.quantidade} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="precoUnitInput" class="form-label">Preço unitário</label>

                                        <NumericFormat
                                            autoComplete="off"
                                            thousandSeparator=","
                                            class="form-control" id="precoUnitInputEdit" placeholder={"R$ " + e.preco} onChange={(e) => { setPreco(e.target.value) }}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            onValueChange={(values) => {
                                                setPreco(values);
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div class="modal-footer">
                        <button type="button" onClick={(e) => { editNovoProduto(e) }} class="btn w-100 btn-primary" id="btnEditar"> <i class="bi bi-plus-circle"></i> Editar</button>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default ModalEdit;