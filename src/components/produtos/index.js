import TabelaProduto from "../tabela_produto";
import Header from '../header';
import './style.css';

import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';
import axios from "axios";
const $ = require("jquery");

const Produto = () => {
    const [valorPreco, setPreco] = useState();
    const [valorItem, setItem] = useState();
    const [valorDesc, setDesc] = useState();
    const [valorQt, setQuant] = useState();
    const [valorCateg, setCategorias] = useState();
    const [nvCateg, setNvCateg] = useState();
    const [listCateg, setListCateg] = useState(null);
    const [statusFormAddCateg, setStatusFormAddCateg] = useState("none");

    //HOOK MSG ERROS
    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    useEffect(() => {

        let config = {

            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                'mode': 'no-cors'
            }
        }

        const param_api_get_categoria = "?api=getCategoria";
        const listCategoria = () => {
            axios.get(urlApi + nameApi + param_api_get_categoria, config)
                .then(async (res) => {
                    var vl = await res.data;
                    setListCateg(vl);

                }).catch((error) => { alert(error); });

        };
        listCategoria();

    }, [setListCateg]);


    const addNovoProduto = (e) => {
        e.preventDefault();

        let nome = $("#nomeItemInput");
        let desc = $("#descItemInput");
        let qtd = $("#qtItemInput");
        let preco = $("#precoUnitInput");
         let cod = Math.floor(Math.random() * (777 + 0)) - 1;

        var objProduto = {cod_item:cod, item: "", desc: "", qtd: "", preco: "", data_post: "", categoria_id: "" };

        if (valorCateg !== undefined && valorCateg !== "") {
            preco.addClass("is-valid").removeClass("is-invalid");
            objProduto.categoria_id = valorCateg;
        } else {
            preco.addClass("is-invalid").removeClass("is-valid");
            objProduto.categoria_id = null;
        }

        if (valorPreco !== undefined && valorPreco !== "") {
            preco.addClass("is-valid").removeClass("is-invalid");
            objProduto.preco = valorPreco;
        } else {
            preco.addClass("is-invalid").removeClass("is-valid");
            objProduto.preco = null;
        }

        if (valorItem !== undefined && valorItem !== "") {
            nome.addClass("is-valid").removeClass("is-invalid");
            objProduto.item = valorItem;

        } else {
            nome.addClass("is-invalid").removeClass("is-valid");
            objProduto.item = null;
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
        let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();
        if (objProduto.data_post == "") {
            objProduto.data_post = data_post;
        }
       

        const paramApi_save_produto = "?api=setProduto";
        $.post(urlApi + nameApi + paramApi_save_produto, objProduto, (res, status) => {
            if (status === "success") {
               var btnAdicionar = $('#btnAdicionar');
                if (res == "null") {
                    setDisplayError("block");
                    setMsgError("Preencha os campos!");
                    btnAdicionar.attr({ "disabled": false });
                    
                } else {
                    setDisplayError("none");
                    setMsgError(null);
                }
              
                if (res == 1) {
                   setDisplaySuccess("block");
                   setMsgSuccess("Novo item adicionado!")
                   btnAdicionar.attr({ "disabled": "disabled" });

                } else {
                   setDisplaySuccess("none");
                   setMsgSuccess(null);
                }
            } else {
                  alert("Error: parametros API")
            }

        })
    }
 
    const fecharModal = () => {
        window.location.reload();
    }
    return (
        <div className="container mt-3 produtos">
            <div className="container p-0 animate__animated  animate__fadeIn">
                <h4 className="mb-2 mt-2 pb-2 ">Produtos</h4>
                <button type="button" class="btn w-100 btn-primary" data-bs-toggle="modal" data-bs-target="#nvProduto">
                    <i class="bi bi-plus-circle-dotted fs-4 "></i> <p>Novo Produto</p>
                </button>
            </div>
            <div class="modal fade" id="nvProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticnvProduto" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticnvProduto">Novo Produto</h1>
                            <button type="button" onClick={() => { fecharModal() }} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                                <i class="bi bi-check-circle p-2"></i>
                                {msgSuccess !== null && msgSuccess}

                            </div>
                            <div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                                <i class="bi bi-exclamation-triangle p-2"></i>
                                {msgError !== null && msgError}

                            </div>
                            <div class="mb-3">
                                <label for="nomeItemInput" class="form-label">Nome item</label>
                                <input type="text" class="form-control " id="nomeItemInput" autocomplete="off" onChange={(e) => { setItem(e.target.value) }} placeholder="Nome item" />
                            </div>
                            <div class="mb-3">
                                <label for="descItemInput" class="form-label">Descrição item</label>
                                <input type="text" class="form-control" id="descItemInput" autocomplete="off" onChange={(e) => { setDesc(e.target.value) }} placeholder="Detalhes" />
                            </div>
                            <div class="input-group mb-3" id="categorias">

                                <select id="categorias" onChange={(e) => { setCategorias(e.target.value) }} class="form-select">
                                    <option >Selecione</option>
                                    {listCateg && listCateg.map((e) => {
                                        return (<option key={e.id} value={e.cod}>{e.nome}</option>)
                                    })}
                                    {listCateg == null ?? <option value={null} >Nenhuma categoria!</option>}

                                </select>

                               
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

                            <button type="button" onClick={(e) => { addNovoProduto(e) }} class="btn w-100 btn-primary" id="btnAdicionar" > <i class="bi bi-plus-circle"></i> Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
            <TabelaProduto />
        </div>
    )
}
export default Produto;