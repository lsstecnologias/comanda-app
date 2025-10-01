import TabelaProduto from "../tabela_produto";
import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';
import axios from "axios";
const $ = require("jquery");



const Produto = () => {
    const [valorPreco, setPreco] = useState();
    const [valorNome, setNome] = useState();
    const [valorDesc, setDesc] = useState();
    const [valorQt, setQuant] = useState();
    const [statusMsgErro,setStatusMsgErro] = useState("none");
     const [statusMsgSuccess,setStatusMsgSuccess] = useState("none");
    const [formProduto, setFormProd] = useState({});

    const addNovoProduto = (e) => {
        e.preventDefault();
        let nome = $("#nomeItemInput");
        let desc = $("#descItemInput");
        let qtd = $("#qtItemInput");
        let preco = $("#precoUnitInput");
        let data_criacao = "";
        var objProduto = { nome, desc, qtd, preco, data_criacao };

        if (valorPreco !== undefined && valorPreco !== "") {
            preco.addClass("is-valid").removeClass("is-invalid");
            objProduto.preco = valorPreco;
        } else {
            preco.addClass("is-invalid").removeClass("is-valid");
            objProduto.preco = null;
        }

        if (valorNome !== undefined && valorNome !== "") {
            nome.addClass("is-valid").removeClass("is-invalid");
            objProduto.nome = valorNome;
        } else {
            nome.addClass("is-invalid").removeClass("is-valid");
            objProduto.nome = null;
        }

        if (valorDesc !== undefined && valorDesc !== "") {
            desc.addClass("is-valid").removeClass("is-invalid");
            objProduto.desc = valorDesc;
        } else {
            desc.addClass("is-invalid").removeClass("is-valid");
            objProduto.desc = null;
        }

        if (valorQt !== undefined && valorQt !== "") {
            qtd.addClass("is-valid").removeClass("is-invalid");
            objProduto.qtd = valorQt;
        } else {
            qtd.addClass("is-invalid").removeClass("is-valid");
            objProduto.qtd = null;
        }
        let data_atual = new Date();
        let dataCriacao = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();
        if (objProduto.data_criacao == "") {
            objProduto.data_criacao = dataCriacao;
        }
        $.post('http://10.10.10.6/api_comanda/index.php?api=setProduto', objProduto, (res, status) => {
            if (status === "success") {
                console.log(res)
                if(res === "null"){
                   setStatusMsgErro("block");
                }else{
                    setStatusMsgErro("none");
                }
                if(res == 1){
                     setStatusMsgSuccess("block");
                }else{
                     setStatusMsgSuccess("none");
                }
            } else {
                alert("Error");
            }

        })
    }
    const fecharModal = ()=>{
        window.location.reload();
    }
    return (
        <div className="container ">
            <div className="container">
                <button type="button" class="btn w-100 btn-primary" data-bs-toggle="modal" data-bs-target="#nvProduto">
                    <i class="bi bi-plus-circle-dotted fs-4"></i> <p>Novo Produto</p>
                </button>
            </div>
            <div class="modal fade" id="nvProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticnvProduto" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticnvProduto">Produto</h1>
                            <button type="button" onClick={()=>{fecharModal()}} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-danger" style={{display:statusMsgErro}} role="alert">
                                Preencha os campo(s)!
                            </div>
                            <div class="alert alert-success" style={{display:statusMsgSuccess}} role="alert">
                                Produto <strong> {valorNome ?? valorNome} </strong> registrado!
                            </div>
                            <div class="mb-3">
                                <label for="nomeItemInput" class="form-label">Nome item</label>
                                <input type="text" class="form-control " id="nomeItemInput" autocomplete="off" onChange={(e) => { setNome(e.target.value) }} placeholder="Nome item" />
                            </div>
                            <div class="mb-3">
                                <label for="descItemInput" class="form-label">Descrição item</label>
                                <input type="text" class="form-control" id="descItemInput" autocomplete="off" onChange={(e) => { setDesc(e.target.value) }} placeholder="Detalhes" />
                            </div>
                            <div class="mb-3">
                                <label for="qtItemInput" class="form-label">Quantidade</label>
                                <input type="number" min="1" class="form-control" id="qtItemInput" onChange={(e) => { setQuant(e.target.value) }} autocomplete="off" placeholder="0" />
                            </div>
                            <div class="mb-3">
                                <label for="precoUnitInput" class="form-label">Preço unitário</label>

                                <NumericFormat
                                    autoComplete="off"
                                    thousandSeparator=","
                                    class="form-control" id="precoUnitInput" placeholder="R$" onChange={(e) => { setPreco(e.target.value) }}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    onValueChange={(values) => {
                                        setPreco(values);
                                    }}
                                />
                            </div>
                        </div>
                        <div class="modal-footer">

                            <button type="button" onClick={(e) => { addNovoProduto(e) }} class="btn w-100 btn-primary"> <i class="bi bi-plus-circle"></i> Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
            <TabelaProduto />
        </div>
    )
}
export default Produto;