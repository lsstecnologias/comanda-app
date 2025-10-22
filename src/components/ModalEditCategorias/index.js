import { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';
import $ from 'jquery';
const ModalEditCategorias = (data_id) => {
    var data = { data_id };
    var id = data.data_id;
    var idEdit = id.data_id;


    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    const [dataFilter, setDataFilter] = useState([]);
    const [edit, setEdit] = useState([]);
    //INPUTS
    const [nvCateg, setNvCateg] = useState();

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const vlFilter = dataFilter.filter(e => { return e.id === idEdit });


    const editCategoria = (e) => {
        e.preventDefault();
 

        var objCategoria = { id: idEdit, cod: "", nome: "", data_post: "" };

        if (nvCateg !== undefined && nvCateg !== "") {
            // nome.addClass("is-valid").removeClass("is-invalid");
            objCategoria.nome = nvCateg;
        } else {
            //nome.addClass("is-invalid").removeClass("is-valid");
            objCategoria.nome = vlFilter[0].nome;
        }

        let data_atual = new Date();
        let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();

        if (objCategoria.data_post == "") {
            objCategoria.data_post = data_post;
        }
         if (objCategoria.cod == "") {
            objCategoria.cod = vlFilter[0].cod;
        }

        const param_api_update_categorias = "?api=updateCategorias";

        $.post(urlApi + nameApi + param_api_update_categorias, objCategoria, (res, status) => {

            var editarUsuario = $('#btnCategorias');
            console.log(res)
            if (status === "success") {
                if (res == 0 || res == null) {
                    setMsgError("Erro ao atualizar usuário!");
                    setDisplayError("block");
                    editarUsuario.attr({ "disabled": false });

                } else {
                    setDisplayError("none");
                    setMsgError(null);
                }
                if (res == 1) {
                    setDisplaySuccess("block");
                    setMsgSuccess("Usuário atualizado!");
                    editarUsuario.attr({ "disabled": "disabled" });

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
    useEffect(() => {


        const param_api_get_categorias = "?api=getCategorias";
        const config = {

            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                'mode': 'no-cors'
            }
        };
        axios.get(urlApi + nameApi + param_api_get_categorias, config)
            .then((res) => {
                var vl = res.data;
                setDataFilter(vl);

            }).catch((error) => { alert("Error: parametros API " + error) });

    }, [setDataFilter, setEdit]);

    return (
        <div class="modal fade" id={"editCategoria-" + idEdit} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticeditCategoria" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5"><i class="bi bi-pencil-square"></i> Editar categoria</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { fecharModal() }}></button>
                    </div>

                    <div class="modal-body">
                        <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                            <i class="bi bi-check-circle-fill p-2"></i>
                            {msgSuccess !== null && msgSuccess}
                            <button type="button" class="btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close" onClick={() => { fecharModal() }}></button>
                        </div>

                        <div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                            <i class="bi bi-exclamation-triangle-fill  p-2"></i>
                            {msgError !== null && msgError}
                            <button type="button" class="btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close" onClick={() => { fecharModal() }} ></button>
                        </div>


                        {vlFilter && vlFilter.map(e => {
                            return (
                                <div key={e.id}>
                                    <div class="input-group  mb-3 mt-2" style={{ display: 'inline-flex' }}>
                                        <button class="btn btn-outline-primary  animate__animated animate__fadeIn" id="btnCategorias" type="button" onClick={(e) => { editCategoria(e) }} ><i class="bi bi-pencil-square"></i> Editar</button>
                                        <input type="text" class="form-control" id="inpt-categorias" autocomplete="off" onChange={(e) => { setNvCateg(e.target.value) }} placeholder={e.nome} aria-describedby="button-addon2" />

                                    </div>
                                </div>
                            )

                        })}



                    </div>
                </div>
            </div>
        </div>
    )

}
export default ModalEditCategorias;