import { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';
import $ from 'jquery';
const ModalEditEstabelecimentos = (data_id) => {
    var data = { data_id };
    var id = data.data_id;
    var idEdit = id.data_id;

    //PERIMITE NÃO EXIBIR MODAL DE NOTAS
    sessionStorage.setItem('modal_notas', 'hide');

    const [nomeUser, setNomeUser] = useState("");
    const [emailLoginUser, setEmailLoginUser] = useState("");
    const [senhaUser, setSenhaUser] = useState("");
    const [perfilUser, setPerfilUser] = useState("");
    const [acessoUsuario, setAcessoUsuario] = useState(true);
    const [statusAtendimento, setStatusAtendimento] = useState(null);

    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    const [dataFilter, setDataFilter] = useState([]);
    const [edit, setEdit] = useState([]);

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const vlFilter = dataFilter.filter(e => { return e.id == idEdit });
        console.log(vlFilter)
    /*
       const vincularAcessoUsuarioSistema = () => {
           var checkBox = document.getElementById("myCheck");
   
           const { id, cod, cod_estabelecimento, cpf, data_post, email, endereco, nome, perfil, senha, status } = vlFilter[0] && vlFilter[0];
           console.log(cpf)
   
           if (checkBox.checked == true) {
               setAcessoUsuario(true)
           } else {
               setAcessoUsuario(false)
           }
       }
      
           const editUsuario = (e) => {
               e.preventDefault();
               /*
               let nome = $("#nomeInput");
               let senha = $("#senhaInput");
               let loginEmail = $("#loginEmailInput");
               let perfil = $("#perfilUser");
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
           */

    const fecharModal = () => {
        window.location.reload();
    }



    useEffect(() => {

        const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");


        const param_api_list_usuario = `?api=getAllStatusAtendimentos`;


        $.get(urlApi + nameApi + param_api_list_usuario, (res, status) => {
       
            if (status == 'success') {

                //var data = JSON.parse(res);
               // setDataFilter(data);
                //cod: "75624fa"

            }


        })



    }, [setDataFilter, setAcessoUsuario, setEdit]);

    const mudarStatusAtendimento = (e) => {
        e.preventDefault();

        console.log(statusAtendimento);

    }
    return (
        <div class="modal fade" id={"editEstabelecimento-" + idEdit} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticeditEstab" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5"><i class="bi bi-person-fill-gear"></i> Status atendimento, ID{idEdit}</h1>
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

                        <td class="fw-medium">Status do Atendimento:</td>
                        <div class="input-group mt-2 mb-2  ">
                            <select type='text' class="form-select " onChange={(e) => { setStatusAtendimento(e.target.value) }}>
                                <option>Selecione</option>
                                <option value="1">Em atendimento</option>
                                <option value="2">Atendimento finalizado</option>
                            </select>
                            <button onClick={(e) => { mudarStatusAtendimento(e) }} class="btn btn-sm btn-primary">Atualizar</button>
                        </div>

                        <div class="modal-footer mt-3 p-0">
                            <button type="button" onClick={(e) => { mudarStatusAtendimento(e) }} class="btn btn-sm btn-primary w-100 m-0" id="btnEditarUsuario"><i class="bi bi-check2-circle"></i> Confirmar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default ModalEditEstabelecimentos;