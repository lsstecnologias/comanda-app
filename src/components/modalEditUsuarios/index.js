import { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';
import $ from 'jquery';
const ModalEditUsuarios = (data_id) => {
    var data = { data_id };
    var id = data.data_id;
    var idEdit = id.data_id;


    const [nomeUser, setNomeUser] = useState("");
    const [emailLoginUser, setEmailLoginUser] = useState("");
    const [senhaUser, setSenhaUser] = useState("");
    const [perfilUser, setPerfilUser] = useState("");

    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    const [dataFilter, setDataFilter] = useState([]);
    const [edit, setEdit] = useState([]);

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const vlFilter = dataFilter.filter(e => { return e.id === idEdit });

    // const perfil = (vlFilter[0].perfil);


    const editUsuario = (e) => {
        e.preventDefault();
        /*
        let nome = $("#nomeInput");
        let senha = $("#senhaInput");
        let loginEmail = $("#loginEmailInput");
        let perfil = $("#perfilUser");*/
        // let cod = Math.floor(Math.random() * (777 - 0)) + 1;

        var objUsuario = { id: idEdit, cod_user: vlFilter[0].cod, nome_user: "", senha_user: "", login_email: "", perfil_user: "", data_post: "" };

        if (nomeUser !== undefined && nomeUser !== "") {
            // nome.addClass("is-valid").removeClass("is-invalid");
            objUsuario.nome_user = nomeUser;
        } else {
            //nome.addClass("is-invalid").removeClass("is-valid");
            objUsuario.nome_user = vlFilter[0].nome;
        }

        if (emailLoginUser !== undefined && emailLoginUser !== "") {
            //loginEmail.addClass("is-valid").removeClass("is-invalid");
            objUsuario.login_email = emailLoginUser;
        } else {
            //loginEmail.addClass("is-invalid").removeClass("is-valid");
            objUsuario.login_email = vlFilter[0].email;
        }

        if (senhaUser !== undefined && senhaUser !== "") {
            // senha.addClass("is-valid").removeClass("is-invalid");
            objUsuario.senha_user = md5(senhaUser);
        } else {
            //senha.addClass("is-invalid").removeClass("is-valid");
            objUsuario.senha_user = vlFilter[0].senha;
        }

        if (perfilUser !== undefined && perfilUser !== "") {
            //perfil.addClass("is-valid").removeClass("is-invalid");
            objUsuario.perfil_user = perfilUser;

        } else {
            // perfil.addClass("is-invalid").removeClass("is-valid");
            objUsuario.perfil_user = vlFilter[0].perfil;

        }

        let data_atual = new Date();
        let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();

        if (objUsuario.data_post == "") {
            objUsuario.data_post = data_post;
        }

        const param_api_update_usuario = "?api=updateUsuarios";

        $.post(urlApi + nameApi + param_api_update_usuario, objUsuario, (res, status) => {

            var editarUsuario = $('#btnEditarUsuario')
            if (status === "success") {
                if (res === "null" || res === null) {
                    setMsgError("Erro ao atualizar usuário!");
                    setDisplayError("block");
                    editarUsuario.attr({ "disabled": false });
                } else {
                    setDisplayError("none");
                    setMsgError(null);
                }
                if (res == 1 || res == "true" || res == true) {
                    setMsgSuccess("Usuário atualizado!");
                    setDisplaySuccess("block");
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


        const dataUser = sessionStorage.getItem("cod_estabelecimento");
        var cod_estabelecimento = dataUser;

        if (cod_estabelecimento !== 'null') {
            const param_api_list_usuario = `?api=getPerfilUsuarios`;
            var obj = { 'id': cod_estabelecimento };

            $.post(urlApi + nameApi + param_api_list_usuario, obj, (res, status) => {

                if (status == 'success') {

                    var data = JSON.parse(res);
                    let arr = [data];
                    setDataFilter(arr);
                }


            })
        } else {
            alert("Nenhum cliente estabelecimento");
            //Sair();
        }


    }, [setDataFilter, setEdit]);

    return (
        <div class="modal fade" id={"editUsuario-" + idEdit} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticeditUsuario" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5"><i class="bi bi-pencil-square"></i> Editar Usuário</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { fecharModal() }}></button>
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

                        {vlFilter && vlFilter.map(e => {
                            return (
                                <div key={e.id}>
                                    <div class="mb-3">
                                        <label for="nomeInput" class="form-label">Nome</label>
                                        <input type="text" class="form-control" id="nomeInput" onChange={(e) => { setNomeUser(e.target.value) }} placeholder={e.nome} autocomplete="off" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="perfilUser" class="form-label">Perfil</label>
                                        <select id="perfilUser" onChange={(e) => { setPerfilUser(e.target.value) }} class="form-select">
                                            <option value={e.perfil} selected>{e.perfil == 'a' ? "Administrador" : "Usuário"}</option>
                                            <option value="u">Usuário</option>
                                            <option value="a">Administrador</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="loginEmailInput" class="form-label">E-mail</label>
                                        <input type="email" class="form-control" id="loginEmailInput" onChange={(e) => { setEmailLoginUser(e.target.value) }} placeholder={e.email} autocomplete="off" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="senhaInput" class="form-label">Senha</label>
                                        <input type="password" class="form-control w-20" id="senhaInput" onChange={(e) => { setSenhaUser(e.target.value) }} placeholder="••••••" autocomplete="off" />

                                    </div>
                                </div>
                            )

                        })}

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary w-100" id="btnEditarUsuario" onClick={(e) => { editUsuario(e) }}> <i class="bi bi-pencil-square"></i> Editar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default ModalEditUsuarios;