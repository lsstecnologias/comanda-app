import TabelaProduto from "../tabela_produto";
import Header from '../header';

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
    const [statusMsgErro, setStatusMsgErro] = useState("none");
    const [statusMsgSuccess, setStatusMsgSuccess] = useState("none");
    const [statusFormAddCateg, setStatusFormAddCateg] = useState("none");
    const [formProduto, setFormProd] = useState({});

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    useEffect(() => {

        let config = {

            method: "get",
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
                .then((res) => {
                    var vl = res.data;
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

        var objProduto = { item: "", desc: "", qtd: "", preco: "", data_criacao: "", categoria_id: "" };

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
        let dataCriacao = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();
        if (objProduto.data_criacao == "") {
            objProduto.data_criacao = dataCriacao;
        }

        const paramApi_save_produto = "?api=setProduto";
        $.post(urlApi + nameApi + paramApi_save_produto, objProduto, (res, status) => {
            if (status === "success") {

                if (res === "null") {
                    setStatusMsgErro("block");
                    $('#btnAdicionar').attr({ "disabled": "disabled" });
                } else {
                    setStatusMsgErro("none");
                }
                if (res == 1) {
                    setStatusMsgSuccess("block");
                    $('#btnAdicionar').attr({ "disabled": "disabled" });
                } else {
                    setStatusMsgSuccess("none");
                }
            } else {
                alert("API Error");
            }

        })
    }
    const addNvCategoria = (e) => {
        e.preventDefault();

        let categ_input = $("#addCategorias");


        let data_atual = new Date();
        let dataCriacao = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();

        const obj_categoria = { data_criacao: "", cod: "", nome: "", data_criacao: "" };

        if (obj_categoria.data_criacao == "" && obj_categoria.cod == "") {
            obj_categoria.data_criacao = dataCriacao;
            obj_categoria.cod = Math.floor(Math.random() * (777 - 0)) + 0;
        }


        if (nvCateg !== undefined && nvCateg !== "") {
            categ_input.addClass("is-valid").removeClass("is-invalid");
            obj_categoria.nome = nvCateg;
        } else {
            categ_input.addClass("is-invalid").removeClass("is-valid");
            obj_categoria.nome = null;
        }

        const param_api_save_categoria = "?api=setCategoria";
        $.post(urlApi + nameApi + param_api_save_categoria, obj_categoria, (res, status) => {
            if (status === "success") {

                setStatusFormAddCateg("none");
                $("#addCategorias").val("");
                let categ_input = $("#addCategorias");
                categ_input.addClass("is-invalid").removeClass("is-valid");

                if (res === "null") {
                    setStatusMsgErro("block");
                    //$('#btnAdicionar').attr({ "disabled": "disabled" });
                } else {
                    setStatusMsgErro("none");
                }
                if (res == 1) {
                    setStatusMsgSuccess("block");

                    // $('#btnAdicionar').attr({ "disabled": "disabled" });
                } else {
                    setStatusMsgSuccess("none");
                }
            } else {
                alert("API Error");
            }

        })
    }
    const exibeFormAddCateg = (e) => {
        e.preventDefault();
        setStatusFormAddCateg("inline-flex");

    }
    const fecharModal = () => {
        window.location.reload();
    }
    return (
        <div className="container">
        
            <div className="container p-0">
                
                <button type="button" class="btn w-100 btn-primary" data-bs-toggle="modal" data-bs-target="#nvProduto">
                    <i class="bi bi-plus-circle-dotted fs-4"></i> <p>Novo Produto</p>
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
                            <div class="alert alert-danger" style={{ display: statusMsgErro }} role="alert">
                                Preencha os campo(s)!
                            </div>
                            <div class="alert alert-success" style={{ display: statusMsgSuccess }} role="alert">
                                Produto <strong> {valorItem ?? valorItem}  </strong> registrado!
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

                                <button class="btn btn-outline-secondary" onClick={(e) => { exibeFormAddCateg(e) }} type="button" >Nova categoria</button>
                            </div>
                            <div class="input-group mb-3" style={{ display: statusFormAddCateg }}>
                                <input type="text" class="form-control" id="addCategorias" autocomplete="off" onChange={(e) => { setNvCateg(e.target.value) }} placeholder="Categoria do produto" aria-label="Categoria do produto" aria-describedby="button-addon2" />
                                <button class="btn btn-primary" type="button" onClick={(e) => { addNvCategoria(e) }} ><i class="bi bi-plus-circle-fill"></i> Adicionar</button>
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