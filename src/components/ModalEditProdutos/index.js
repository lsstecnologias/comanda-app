import { useCallback, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import axios from "axios";
const $ = require("jquery");

const ModalEditProdutos = (data_id) => {
    const [valorPreco, setPreco] = useState();
    const [valorItem, setItem] = useState();
    const [valorDesc, setDesc] = useState();
    const [valorQt, setQuant] = useState();
    const [valorCateg, setCategorias] = useState();
    const [listCateg, setListCateg] = useState(null);

    // const [listCateg, setListCateg] = useState(null);

    //HOOK MSG ERROS
    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

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

        var objProduto = { id: idEdit, item: "", desc: "", id_categoria: "", qtd: "", preco: "", data_post: "" };

        if (valorCateg !== undefined && valorCateg !== "") {
            //preco.addClass("is-valid").removeClass("is-invalid");
            objProduto.id_categoria = valorCateg;
        } else {
            // preco.addClass("is-invalid").removeClass("is-valid");
            objProduto.id_categoria = vlFilter[0].cod;
        }

        if (valorPreco !== undefined && valorPreco !== "") {
            //preco.addClass("is-valid").removeClass("is-invalid");
            objProduto.preco = valorPreco;
        } else {
            // preco.addClass("is-invalid").removeClass("is-valid");
            objProduto.preco = vlFilter[0].preco;
        }

        if (valorItem !== undefined && valorItem !== "") {
            // nome.addClass("is-valid").removeClass("is-invalid");
            objProduto.item = valorItem;

        } else {
            // nome.addClass("is-invalid").removeClass("is-valid");
            objProduto.item = vlFilter[0].item;
        }

        if (valorDesc !== undefined && valorDesc !== "") {
            // desc.addClass("is-valid").removeClass("is-invalid");
            objProduto.desc = valorDesc;
        } else {
            //  desc.addClass("is-invalid").removeClass("is-valid");
            objProduto.desc = vlFilter[0].descricao;
        }

        if (valorQt !== undefined && valorQt !== "") {
            //  qtd.addClass("is-valid").removeClass("is-invalid");
            objProduto.qtd = valorQt;
        } else {
            // qtd.addClass("is-invalid").removeClass("is-valid");
            objProduto.qtd = vlFilter[0].quantidade;
        }

        let data_atual = new Date();
        let data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();
        if (objProduto.data_post == "") {
            objProduto.data_post = data_post;
        }

        const paramApi_edit_produto = "?api=updateItem";

        $.post(urlApi + nameApi + paramApi_edit_produto, objProduto, (res, status) => {

            if (status === "success") {

                if (res === "null" || res === null) {
                    setMsgError("Erro ao atualizar o item!");
                    setDisplayError("block");
                    $('#btnEditar').attr({ "disabled": false });
                } else {
                    setDisplayError("none");
                    setMsgError(null);
                }
                if (res === 1 || res === "true" || res === true) {
                    setMsgSuccess("O item foi atualizado!");
                    setDisplaySuccess("block");
                    $('#btnEditar').attr({ "disabled": "disabled" });
                } else {
                    setDisplaySuccess("none");
                    setMsgSuccess(null);
                }
            } else {
                alert("Error: parametros API")
            }

        })
    }
    useEffect(() => {
        const param_api_lista_produto = '?api=getProdutos';
        const param_api_get_categoria = "?api=getCategoria";
        let config = {

            method: "get",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                'mode': 'no-cors'
            }
        };
        axios.get(urlApi + nameApi + param_api_lista_produto, config)
        .then(async(res) => {
            var vl = await res.data;
            setDataFilter(vl)
        }).catch((error) => { alert("Error: parametros API "+error) });


        const listCategoria = () => {
            axios.get(urlApi + nameApi + param_api_get_categoria, config)
            .then(async(res) => {
                var vl = await res.data;
                setListCateg(vl);

            }).catch((error) => { alert("Error: parametros API "+error) });

        };
        listCategoria();

    }, [setDataFilter, setEdit, setListCateg]);

    return (
        <div class="modal fade" id={"editProduto-" + idEdit} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticeditProduto" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticnvProduto">Editar Produto {idEdit}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { fecharModal() }}></button>
                    </div>
                    <div class="m-3 alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                        <i class="bi bi-check-circle p-2"></i>
                        {msgSuccess !== null && msgSuccess}

                    </div>
                    <div class="m-3 alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                        <i class="bi bi-exclamation-triangle p-2"></i>
                        {msgError !== null && msgError}

                    </div>
                    <div class="modal-body">

                        {vlFilter && vlFilter.map(e => {

                            return (
                                <div key={e.id}>

                                    <div class="mb-3">
                                        <label for="nomeItemInput" class="form-label">Nome item</label>
                                        <input type="text" class="form-control " id="nomeItemInputEdit" autocomplete="off" onChange={(e) => { setItem(e.target.value) }} placeholder={e.item} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="descItemInput" class="form-label">Descrição item</label>
                                        <input type="text" class="form-control" id="descItemInputEdit" autocomplete="off" onChange={(e) => { setDesc(e.target.value) }} placeholder={e.descricao} />
                                    </div>
                                    <label for="descItemInput" class="form-label">Selecione item</label>
                                    <div class="input-group mb-3" id="categorias">

                                        <select id="categorias" onChange={(e) => { setCategorias(e.target.value) }} class="form-select">

                                            <option value={e.cod} selected>{e.nome}</option>
                                            {listCateg && listCateg.map((e) => {
                                                return (<option key={e.id} value={e.cod}>{e.nome}</option>)
                                            })}
                                            {listCateg == null ?? <option value={null} >Nenhuma categoria!</option>}
                                        </select>

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
export default ModalEditProdutos;