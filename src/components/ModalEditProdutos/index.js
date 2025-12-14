import { useCallback, useEffect, useState, useContext } from 'react';
import { NumericFormat } from 'react-number-format';
import axios from "axios";
import { UserContext } from '../context';
const $ = require("jquery");

const ModalEditProdutos = (data_id) => {
    const { GetSession, sessao, Sair, status } = useContext(UserContext);
    const [valorPreco, setPreco] = useState();
    const [valorItem, setItem] = useState();
    const [valorDesc, setDesc] = useState();
    const [valorQt, setQuant] = useState();
    const [valorCateg, setCategorias] = useState();
    const [listCateg, setListCateg] = useState(null);
    const [objProduto, setObjProduto] = useState([]);


    //HOOK MSG ERROS
    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);
    const [selectedFileItem, setSelectedFileItem] = useState(null);
    const [dataItem, setData] = useState([]);
    const [edit, setEdit] = useState([]);

    const dataUser = sessionStorage.getItem("cod_estabelecimento");
    var cod_estabelecimento = dataUser;

    var data = { data_id };
    var id = data.data_id;
    var idEdit = id.data_id;
    const fecharModal = () => {
        window.location.reload();
    }

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    const data_filter = dataItem.filter(e => { return e.id == idEdit });
    /*
    const uploadImg = (e) => {
        e.preventDefault();

        let imgInpt = $("#imgItemInputEdit");
        var cod_estabelecimento = dataUser;
        //VALIDA IMAGEM
        const param_api_save_img = "?api=setUploadFileItem";

        if (selectedFileItem !== undefined && selectedFileItem !== null) {

            const formData = new FormData();
            console.log(selectedFileItem)
            formData.append("arquivo", selectedFileItem);
            formData.append("usuario", JSON.stringify(sessao));
            formData.append("produto", JSON.stringify(objProduto));
            console.log(formData)

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var res = xhr.responseText;

                    if (res) {
                        let data = JSON.parse(res)
                        console.log(data)
                        if (data.status) {
                            imgInpt.addClass("is-valid").removeClass("is-invalid");

                        } else {
                            imgInpt.addClass("is-invalid").removeClass("is-valid");

                        }

                    }
                }
            }
            xhr.open("POST", urlApi + nameApi + param_api_save_img);
            xhr.send(formData);

        } else {
            imgInpt.addClass("is-invalid").removeClass("is-valid");
        }
    }
    
*/


    const editNovoProduto = (e) => {
        e.preventDefault();
        let nome = $("#nomeItemInputEdit");
        let desc = $("#descItemInputEdit");
        let qtd = $("#qtItemInputEdit");
        let preco = $("#precoUnitInputEdit");
        let categ = $("#categItemInputEdit");
        var imgInpt = $("#imgItemInputEdit");

        var objProduto = { id: idEdit, id_estabelecimento: "", desc: "", id_categoria: "", qtd: "", preco: "", data_post: "" };

        if (valorCateg !== undefined && valorCateg !== "") {
            categ.addClass("is-valid").removeClass("is-invalid");
            objProduto.id_categoria = valorCateg;
        } else {
            categ.addClass("is-invalid").removeClass("is-valid");
            objProduto.id_categoria = data_filter[0].cod;
        }

        if (valorPreco !== undefined && valorPreco !== "") {
            preco.addClass("is-valid").removeClass("is-invalid");
            objProduto.preco = valorPreco;
        } else {
            preco.addClass("is-invalid").removeClass("is-valid");
            objProduto.preco = data_filter[0].preco;
        }

        if (valorItem !== undefined && valorItem !== "") {
            nome.addClass("is-valid").removeClass("is-invalid");
            objProduto.item = valorItem;

        } else {
            nome.addClass("is-invalid").removeClass("is-valid");
            objProduto.item = data_filter[0].item;
        }

        if (valorDesc !== undefined && valorDesc !== "") {
            desc.addClass("is-valid").removeClass("is-invalid");
            objProduto.desc = valorDesc;
        } else {
            desc.addClass("is-invalid").removeClass("is-valid");
            objProduto.desc = data_filter[0].descricao;
        }

        if (valorQt !== undefined && valorQt !== "") {
            qtd.addClass("is-valid").removeClass("is-invalid");
            objProduto.qtd = valorQt;
        } else {
            qtd.addClass("is-invalid").removeClass("is-valid");
            objProduto.qtd = data_filter[0].quantidade;
        }

        let data_atual = new Date();
        let data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();
        if (objProduto.data_post == "") {
            objProduto.data_post = data_post;
        }

        const dataUser = sessionStorage.getItem("cod_estabelecimento");
        var cod_estabelecimento = dataUser;
       

        const param_api_edit_produto = "?api=updateItem";
        

        if (cod_estabelecimento !== 'null') {
           
           // const param_api_save_usuario = `?api=setProdutos`;
            objProduto.id_estabelecimento = cod_estabelecimento;
            const param_api_save_img = "?api=setUploadFileItem";
            /*POSTA IMAGEM */
            if (selectedFileItem !== null) {

                const formData = new FormData();
                console.log(objProduto)
                formData.append("arquivo", selectedFileItem);
                formData.append("usuario", JSON.stringify(sessao));
                formData.append("produto", JSON.stringify(objProduto));

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var res = xhr.responseText;
                        var inputFoto = $("#imgItemInputEdit");
                        
                        if (res) {
                            let data = JSON.parse(res)

                            if (data.status) {
                                inputFoto.addClass("is-valid").removeClass("is-invalid");
                                setSelectedFileItem("")
                            } else {
                                inputFoto.addClass("is-invalid").removeClass("is-valid");

                            }

                        }
                    }
                }
                xhr.open("POST", urlApi + nameApi + param_api_save_img);
                xhr.send(formData);


            }

          
           
        } else {
            alert("Nenhum cliente estabelecimento");
            Sair();
        }
                  
         $.post(urlApi + nameApi + param_api_edit_produto, objProduto, (res, status) => {
             var editarProduto = $('#btnEditarProduto');
             if (status === "success") {
 
                 if (res == 0 || res === null) {
                     setDisplayError("block");
                     setMsgError("Erro ao atualizar o item!");
                     editarProduto.attr({ "disabled": false });
 
                 } else {
                     setDisplayError("none");
                     setMsgError(null);
                 }
 
                 if (res == 1) {
                     setDisplaySuccess("block");
                     setMsgSuccess("O item foi atualizado!");
                     editarProduto.attr({ "disabled": "disabled" });
 
                 } else {
                     setDisplaySuccess("none");
                     setMsgSuccess(null);
                 }
 
             } else {
                 alert("Error: parametros API");
             }
 
         })

    }


    const param_api_lista_produto = '?api=getProdutos';
    const param_api_get_categoria = "?api=getCategorias";
    //setDataFilter(null)
    // console.log(sessao.cod_estabelecimento)

    useEffect(() => {
        //FAZ A REQUISICAO PARA MOSTRAR OS DADOS QUE VAI SER EDITADO NOS INPUTS

        const dataUser = sessionStorage.getItem("cod_estabelecimento");
        var cod_estabelecimento = dataUser;

        if (cod_estabelecimento !== 'null') {

            let obj = { 'id': cod_estabelecimento }

            $.post(urlApi + nameApi + param_api_lista_produto, obj, (res, status) => {

                if (status == 'success') {
                    const result = JSON.parse(res);
                    setData(result)

                } else {
                    alert("Error: parametros API!")
                }

            })
            $.post(urlApi + nameApi + param_api_get_categoria, obj, (res, status) => {

                if (status == 'success') {
                    const result = JSON.parse(res);
                    setListCateg(result)
                } else {
                    alert("Error: parametros API!")
                }

            })
        }



    }, [setData, setEdit]);


    return (
        <div class="modal fade" id={"editProduto-" + idEdit} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticeditProduto" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticnvProduto"><i class="bi bi-pencil-square"></i> Editar Produto {idEdit}</h1>
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

                        {data_filter && data_filter.map(e => {

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
                                    <label for="descItemInput" class="form-label"> Categorias</label>
                                    <div class=" mb-3" >

                                        {
                                            <select id="categItemInputEdit" onChange={(e) => { setCategorias(e.target.value) }} class="form-control">

                                                <option value={e.cod} selected>{e.nome}</option>
                                                {
                                                    listCateg && listCateg.map((e) => {
                                                        return (<option class="form-control" key={e.id} value={e.cod}>{e.nome}</option>)
                                                    })
                                                }
                                                {listCateg == null ?? <option value={null} >Nenhuma categoria!</option>}
                                            </select>
                                        }


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

                        <button type="button" onClick={(e) => { editNovoProduto(e) }} class="btn w-100 btn-primary" id="btnEditarProduto"> <i class="bi bi-pencil-square"></i> Editar</button>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default ModalEditProdutos;