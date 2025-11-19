import { useEffect, useState } from "react";
import $ from 'jquery';
import Imagens from "../upload_imagens";
import TabelaUsuario from "../tabela_usuario";

import Header from '../header';
import TabelaCliente from "../tabela_cliente";

var md5 = require('md5');


const Clientes = () => {

    const [nomeUser, setNomeUser] = useState("");
    const [emailLoginUser, setEmailLoginUser] = useState("");
    const [senhaUser, setSenhaUser] = useState("");
    const [perfilUser, setPerfilUser] = useState("");
    const [statusMsgErro, setStatusMsgErro] = useState("none");
    const [statusMsgSuccess, setStatusMsgSuccess] = useState("none");

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    const addNovoUsuario = (e) => {
        e.preventDefault();

        let nome = $("#nomeInput");
        let senha = $("#senhaInput");
        let loginEmail = $("#loginEmailInput");
        let perfil = $("#perfilUser");
        let cod = Math.floor(Math.random() * (777 + 0)) - 1;

        var objUsuario = { cod_user: cod, nome_user: "", senha_user: "", login_email: "", perfil_user: "", data_post: "" };

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

        if (senhaUser !== undefined && senhaUser !== "" && senhaUser.length >= 6) {
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
        let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();

        if (objUsuario.data_post == "") {
            objUsuario.data_post = data_post;
        }

        const paramApi_save_usuario = "?api=setUsuarios";
        $.post(urlApi + nameApi + paramApi_save_usuario, objUsuario, (res, status) => {
            if (status === "success") {
                if (res == "null" && res == null) {
                    setStatusMsgErro("block");
                    $('#btnAdicionar').attr({ "disabled": false });
                } else {
                    setStatusMsgErro("none");
                }
                if (res == 1 || res == "true" || res == true) {
                    setStatusMsgSuccess("block");
                    $('#btnAdicionar').attr({ "disabled": "disabled" });
                } else {
                    setStatusMsgSuccess("none");
                }
            } else {
                alert("Error: parametros API")
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
        <div className="container mt-2 usuario animate__animated animate__fadeIn">

            <h4 className="mb-2 mt-2 pb-2">Clientes</h4>
            <table class="table table-bordered ">
                <thead>
                    <tr>
                        <th colSpan={4} scope="col">Nome</th>
                        

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={3} scope="row">
                              <div class="input-group">
                                
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </td>

                    </tr>

                    <tr>
                        <th scope="row">CPF</th>
                        <th scope="row">RG</th>
                        <th scope="row">CNPJ</th>
                        
                    </tr>
                    <tr>
                        <td scope="row">
                            <div class="input-group">
                                
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </td>
                        <td scope="row">
                             <div class="input-group">
                                
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </td>
                        <td scope="row">
                             <div class="input-group">
                                
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </td>
                       
                    </tr>
                    <tr>
                        <th colSpan={3} scope="row">CEP</th>

                    </tr>
                    <tr>
                        <td colSpan={3} scope="row"><div class="input-group ">
                               
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                             <button class="btn btn-outline-secondary" type="button" id="button-addon1"><small>Consultar</small> <i class="bi bi-search"></i></button>
                            </div></td>

                    </tr>
                     <tr>
                        <th colSpan={3} scope="row">ENDEREÇO</th>

                    </tr>
                    <tr>
                        <td colSpan={3} scope="row"><div class="input-group ">
                               
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                  <button class="btn btn-outline-secondary" type="button" id="button-addon1"><small>Alterar</small> <i class="bi bi-pencil-square"></i></button>
                            </div></td>

                    </tr>
                     <tr>
                        <td colSpan={3} scope="row"><div class="input-group ">
                               
                                 <button type="button" class="btn btn-primary w-100" id="btnAdicionar" onClick={(e) => { addNovoUsuario(e) }}> <i class="bi bi-pencil-square"></i> Cadastrar</button>
                            </div></td>

                    </tr>
                </tbody>
            </table>



           
            <TabelaCliente />

        </div >
    )

}
export default Clientes;