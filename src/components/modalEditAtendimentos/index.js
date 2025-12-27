import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import './style.css';
import md5 from 'md5';
import axios from 'axios';
import $ from 'jquery';


const ModalEditAtendimentos = (data_id, data_cliente) => {
	var data = { data_id, data_cliente };
	//COD chave primaria
	var id = data.data_id;
	var idEdit = id.data_id;

	//COD usuario 
	var codEdit = id.data_cod;

	///sessionStorage.setItem("cliente_id", idEdit);
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');
	const { GetSession, sessao, Sair, status } = useContext(UserContext);


	const [nomeUser, setNomeUser] = useState("");
	const [emailLoginUser, setEmailLoginUser] = useState("");
	const [senhaUser, setSenhaUser] = useState("");
	const [perfilUser, setPerfilUser] = useState("");
	const [acessoUsuario, setAcessoUsuario] = useState(true);
	const [statusAtendimento, setStatusAtendimento] = useState(null);
	const [statusPosAtendimento, setStatusPosAtendimento] = useState([]);

	const [displayError, setDisplayError] = useState('none');
	const [displaySuccess, setDisplaySuccess] = useState('none');
	const [msgError, setMsgError] = useState(null);
	const [msgSuccess, setMsgSuccess] = useState(null);

	const [dataFilter, setDataFilter] = useState([]);
	const [IDEdit, setEdit] = useState("");
	const [IDCEdit, setCodEdit] = useState("");

	const urlApi = 'http://10.10.10.6/';
	const nameApi = 'api_comanda/';
	/*	const vlFilter = dataFilter.filter(e => { return e.cliente_id == idEdit});
	console.log(vlFilter)
	
		
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
	function nEdit(idEdit) {
		setEdit(idEdit)
	}

	const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");

	const getPosStatusAtendimento = () => {
		const param_api_get_status_cod = "?api=getPosStatusAtendimentos";
		var obj = { cliente_id: codEdit, estabelecimento_id: estabelecimento_id };
		$.post(urlApi + nameApi + param_api_get_status_cod, obj, async (res, status) => {
			var data_pos = await JSON.parse(res);

			const { cliente_id, estabelecimento_id, id, status_pos } = await data_pos[0] ?? data_pos;
			if (status_pos == '0') {
				var str_msg = `<div class="alert alert-warning status-msg" role="alert">
				<div class="spinner-border text-warning" role="status">
				<span class="visually-hidden">Loading...</span>
				</div><p class='text-center ml-4'>Aguardando Atendimento!</p>
				</div>`;


				

			}else if(status_pos == '1'){
				var str_msg = `<div class="alert alert-success status-msg" role="alert">
				<div class="spinner-border text-success" role="status">
				<span class="visually-hidden">Loading...</span>
				</div><p class='text-center ml-4'>Em Atendimento!</p>
				</div>`;

			}

			$('#status-atendimento').html(str_msg);

		})

	}
	getPosStatusAtendimento();


	/*	*/

	//const obj = { usuario_id: cliente_id };

	//REcuperar o valor atual - mudar de status
	/*
	if (cliente_id !== undefined) {
			const param = '?api=setStatus';

			//var obj_usuario = { usuario_id: cliente_id };
			console.log(cliente_id)
			$.get(urlApi + nameApi + param, (res, status) => {

				if (status == 'success') {
					var data = JSON.parse(res);
					const caros = data.filter(item => item.cliente_id == `${cliente_id}`);
					//cod: "75624fa"
					console.log(caros)

				}


			})
		}
*/
	useEffect(() => {


		nEdit(idEdit);

	}, [setDataFilter, setAcessoUsuario, setEdit, setStatusPosAtendimento]);


	const mudarStatusAtendimento = (e) => {
		e.preventDefault();

		alert(statusAtendimento)
		/*
		const param_api_update_status = '?api=setUpdateStatus';
		var obj_status = { status_pos: statusAtendimento }
		$.post(urlApi + nameApi + param_api_update_status, obj_status, (res, status) => {
			console.log(res)
		})
		*/
	}
	return (
		<div class="modal fade" id={"editAtendimento-" + idEdit} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticAtendimento" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5"><i class="bi bi-person-fill-gear"></i> Status atendimento</h1>
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

						
						<div id="status-atendimento"> </div>
						<td class="fw-medium">Mudar Status: </td>
						<div class="input-group mt-2 mb-2  ">


							<select type='text' class="form-select " id="form-status" onChange={(e) => { setStatusAtendimento(e.target.value) }}>
								<option>Selecione</option>
								<option value='1' >Em Atendimento</option>
								<option value='2' >Atendimento finalizado</option>

							</select>

							<button onClick={(e) => { mudarStatusAtendimento(e) }} class="btn btn-sm btn-primary">Atualizar</button>
						</div>

						<div class="modal-footer mt-3 p-0">

						</div>

					</div>
				</div>
			</div>
		</div>
	)

}
export default ModalEditAtendimentos;