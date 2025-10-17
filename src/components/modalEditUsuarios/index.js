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
    console.log(vlFilter)

    const editUsuario = (e) => {
        e.preventDefault();

        let nome = $("#nomeInput");
        let senha = $("#senhaInput");
        let loginEmail = $("#loginEmailInput");
        let perfil = $("#perfilUser");
        let cod = Math.floor(Math.random() * (7777 - 0)) + 0;

        var objUsuario = { cod_user: cod, nome_user: "", senha_user: "", login_email: "", perfil_user: "", data_criacao: "" };

        if (nomeUser !== undefined && nomeUser !== "") {
            nome.addClass("is-valid").removeClass("is-invalid");
            objUsuario.nome_user = nomeUser;
        } else {
            nome.addClass("is-invalid").removeClass("is-valid");
            objUsuario.nome_user = null;
        }

        if (emailLoginUser !== undefined && emailLoginUser !== "") {
            loginEmail.addClass("is-valid").removeClass("is-invalid");
            objUsuario.login_email = emailLoginUser;
        } else {
            loginEmail.addClass("is-invalid").removeClass("is-valid");
            objUsuario.login_email = null;
        }


        if (senhaUser !== undefined && senhaUser !== "") {
            senha.addClass("is-valid").removeClass("is-invalid");
            objUsuario.senha_user = md5(senhaUser);
        } else {
            senha.addClass("is-invalid").removeClass("is-valid");
            objUsuario.senha_user = null;
        }

        if (perfilUser !== undefined && perfilUser !== "") {
            perfil.addClass("is-valid").removeClass("is-invalid");
            objUsuario.perfil_user = perfilUser;

        } else {
            perfil.addClass("is-invalid").removeClass("is-valid");
            objUsuario.perfil_user = null;

        }

        let data_atual = new Date();
        let dataCriacao = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();

        if (objUsuario.data_criacao == "") {
            objUsuario.data_criacao = dataCriacao;
        }

        const param_api_update_usuario = "?api=updateUsuarios";
        $.post(urlApi + nameApi + param_api_update_usuario, objUsuario, (res, status) => {

            if (status === "success") {

                if (res === "null" || res === null) {

                    $('#btnAdicionar').attr({ "disabled": false });
                } else {
                    // setStatusMsgErro("none");
                }
                if (res == 1) {

                    $('#btnAdicionar').attr({ "disabled": "disabled" });
                } else {
                    // setStatusMsgSuccess("none");
                }
            } else {
                alert("API Error");
            }

        })
    }
    const fecharModal = () => {
        window.location.reload();
    }
    useEffect(() => {
        const param_api_lista_usuario = '?api=getUsuarios';

        let config = {
            method: "get",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true',
                'mode': 'no-cors'
            }
        };
        axios.get(urlApi + nameApi + param_api_lista_usuario, config)
            .then((res) => {
                if (res.data !== "") {
                    var vl = res.data;
                    setDataFilter(vl);

                } else {
                    alert("Error: modal, parametros API")
                }

            }).catch((error) => { alert("Error:" + error); });

    }, [setDataFilter, setEdit]);

    return (
        <div class="modal fade" id={"editUsuario-" + idEdit} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticeditUsuario" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5"><i class="bi bi-pencil-square"></i> Edit Usuário</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { fecharModal() }}></button>
                    </div>

                    <div class="modal-body">
                        <div class="m-3 alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                            <i class="bi bi-check-circle p-2"></i>
                            {msgSuccess !== null && msgSuccess}

                        </div>
                        <div class="m-3 alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                            <i class="bi bi-exclamation-triangle p-2"></i>
                            {msgError !== null && msgError}

                        </div>
                        <div class="mb-3">
                            <label for="nomeInput" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nomeInput" onChange={(e) => { setNomeUser(e.target.value) }} placeholder="Seu nome" autocomplete="off" />
                        </div>
                        <div class="mb-3">
                            <label for="perfilUser" class="form-label">Perfil</label>
                            <select id="perfilUser" onChange={(e) => { setPerfilUser(e.target.value) }} class="form-select">
                                <option>Selecione</option>
                                <option value="u">Usuário</option>
                                <option value="a">Administrador</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="loginEmailInput" class="form-label">Login ou email</label>
                            <input type="email" class="form-control" id="loginEmailInput" onChange={(e) => { setEmailLoginUser(e.target.value) }} placeholder="Email ou Login" autocomplete="off" />
                        </div>
                        <div class="mb-3">
                            <label for="senhaInput" class="form-label">Senha</label>
                            <input type="password" class="form-control w-20" id="senhaInput" onChange={(e) => { setSenhaUser(e.target.value) }} placeholder="Sua senha" autocomplete="off" />

                        </div>


                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary w-100" id="btnAdicionar" onClick={(e) => { editUsuario(e) }}>Editar</button>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default ModalEditUsuarios;