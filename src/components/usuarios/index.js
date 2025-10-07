import { useEffect, useState } from "react";
import Imagens from "../Imagens";
import TabelaUsuario from "../tabela_usuario";
import $ from 'jquery';
import 'jquery-mask-plugin';
const Usuarios = () => {

    const [nomeUser, setNomeUser] = useState("");
    const [emailLoginUser, setEmailLoginUser] = useState("");
    const [senhaUser, setSenhaUser] = useState("");
    const [selectedFileUser, setSelectedFileUser] = useState(null);
    const [perfilUser, setPerfilUser] = useState("");
    const [senhaUserConfirm, setSenhaUserConfirm] = useState("");

    const [statusMsgErro, setStatusMsgErro] = useState("none");
    const [statusMsgSuccess, setStatusMsgSuccess] = useState("none");

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    const addNovoUsuario = (e) => {
        e.preventDefault();

        let nome = $("#nomeInput");
        let senha = $("#senhaInput");
        let confirmSenha = $("#confirmSenha");
        let loginEmail = $("#loginEmailInput");
        let perfil = $("#perfilUser");
        let inputFoto = $("#inputFoto");

        var objUsuario = { nome_user: "", senha_user: "", confirm_senha: "", senha: "", login_email: "", perfil_user: "", data_criacao: "" };

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

        if (senhaUserConfirm !== undefined && senhaUserConfirm !== "") {

            objUsuario.confirm_senha = senhaUserConfirm;
            confirmSenha.addClass("is-valid").removeClass("is-invalid");
        } else {
            confirmSenha.addClass("is-invalid").removeClass("is-valid");
            objUsuario.confirm_senha = null;
        }

        if (senhaUser !== undefined && senhaUser !== "") {
            senha.addClass("is-valid").removeClass("is-invalid");
            objUsuario.senha_user = senhaUser;
        } else {
            senha.addClass("is-invalid").removeClass("is-valid");
            objUsuario.senha_user = null;
        }

        if (selectedFileUser === null) {
            inputFoto.addClass("is-invalid").removeClass("is-valid");

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

        if (objUsuario.confirm_senha == objUsuario.senha_user) {
            senha.addClass("is-valid").removeClass("is-invalid");
            confirmSenha.addClass("is-valid").removeClass("is-invalid");
        } else {
            senha.addClass("is-invalid").removeClass("is-valid");
            confirmSenha.addClass("is-invalid").removeClass("is-valid");
        }


        const paramApi_save_usuario = "?api=setUsuarios";
        $.post(urlApi + nameApi + paramApi_save_usuario, objUsuario, (res, status) => {
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
    const fecharModal = () => {
        window.location.reload();
    }
  /*  const carregarImagens = () => {
        const paramApi_save_img = "?api=setUploadFile";
        let inputFoto = $("#inputFoto");

        if (selectedFileUser !== null) {
            var formData = new FormData();
           
            
            formData.append("arquivo", selectedFileUser);

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var resposta = xhr.responseText;
                    console.log(resposta)
                    inputFoto.addClass("is-valid").removeClass("is-invalid");
                }
            }

            //fazer o envio do nosso request
            xhr.open("POST", urlApi + nameApi + paramApi_save_img);
            xhr.send(formData);

        }


    }*/
    useEffect(() => {
        // $('#rgInput').mask('00.000.000-00');
        // $('#cepInput').mask('0000000');

    }, [])


    return (
        <div>
            <h3 className="mb-3">Logo</h3>
            <Imagens />
            <h3 className="mb-3 mt-3">Usuarios</h3>

            <button type="button" class="btn  w-100 btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#novoUsuario">
                <i class="bi bi-person-fill-add"></i> Novo
            </button>

            <div class="modal fade" id="novoUsuario" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="novoUsuario" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="novoUsuario">Novo usuário <i class="bi bi-person-fill-add"></i></h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { fecharModal() }}></button>
                        </div>

                        <div class="modal-body">
                            <div class="alert alert-danger" style={{ display: statusMsgErro }} role="alert">
                                Preencha os campo(s)!
                            </div>
                            <div class="alert alert-success" style={{ display: statusMsgSuccess }} role="alert">
                                Usuário <strong> {nomeUser ?? nomeUser}  </strong> registrado!
                            </div>

                            <div class="mb-3">
                                <label for="nomeInput" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="nomeInput" onChange={(e) => { setNomeUser(e.target.value) }} placeholder="Seu nome" autocomplete="off" />
                            </div>
                            <div class="mb-3">
                                <label for="perfilUser" class="form-label">Perfil</label>
                                <select id="perfilUser" onChange={(e) => { setPerfilUser(e.target.value) }} class="form-select">
                                    <option >Selecione</option>
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
                            <div class="mb-3">
                                <label for="confirmSenha" class="form-label">Confirmar a sua senha</label>
                                <input type="password" class="form-control " id="confirmSenha" onChange={(e) => { setSenhaUserConfirm(e.target.value) }} placeholder="Sua senha" autocomplete="off" />

                            </div>
                           
                        </div>

                        <div class="modal-footer">

                            <button type="button" class="btn btn-primary w-100" id="btnAdicionar" onClick={(e) => { addNovoUsuario(e) }}>Salvar</button>
                        </div>



                    </div>
                </div>
            </div>
            <TabelaUsuario />

        </div >
    )

}
export default Usuarios;