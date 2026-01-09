import { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';
import $ from 'jquery';
const ModalEditUsuarios = (data_id) => {
	var data = { data_id };
	var id = data.data_id;
	var idEdit = id.data_id;
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');

	const [nomeUser, setNomeUser] = useState("");
	const [emailLoginUser, setEmailLoginUser] = useState("");
	const [senhaUser, setSenhaUser] = useState("");
	const [confirmSenhaUser, setConfirmSenhaUser] = useState("");
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
	const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");
	console.log(vlFilter)
	//nomeInput loginEmailInput perfilUser ,senhaInputs,reSenhaInput
	const editUsuario = (e) => {
		e.preventDefault();
		var nome = $("#inpt-nome");
		var loginEmail = $('#inpt-email');
		var perfil = $('#inpt-perfil');

		var objUsuario = { id: idEdit, estabelecimento_id: estabelecimento_id, cod_user: vlFilter[0].cod, nome_user: "", senha_user: "", login_email: "", perfil_user: "", data_post: "" };

		if (senhaUser !== undefined && senhaUser !== "" && confirmSenhaUser !== undefined && confirmSenhaUser !== "") {
			if (senhaUser == confirmSenhaUser) {

				$('#senhaInputs').addClass("is-valid").removeClass("is-invalid");
				$('#reSenhaInput').addClass('is-valid').removeClass("is-invalid");

				objUsuario.senha_user = md5(senhaUser);
			} else {
				$('#senhaInputs').addClass("is-invalid").removeClass("is-valid");
				$('#reSenhaInput').addClass('is-invalid').removeClass("is-valid");


			}
		} else {
			$('#senhaInputs').addClass("is-invalid").removeClass("is-valid");
			$('#reSenhaInput').addClass('is-invalid').removeClass("is-valid");
		}

		if (nomeUser !== undefined && nomeUser !== "") {

			objUsuario.nome_user = nomeUser;
			nome.addClass("is-valid").removeClass("is-invalid");
		} else {
			nome.addClass("is-invalid").removeClass("is-valid");
			objUsuario.nome_user = vlFilter[0].nome;
		}

		if (emailLoginUser !== undefined && emailLoginUser !== "") {
			loginEmail.addClass("is-valid").removeClass("is-invalid");
			objUsuario.login_email = emailLoginUser;
		} else {
			loginEmail.addClass("is-invalid").removeClass("is-valid");
			objUsuario.login_email = vlFilter[0].email;
		}



		if (perfilUser !== undefined && perfilUser !== "") {
			perfil.addClass("is-valid").removeClass("is-invalid");
			objUsuario.perfil_user = perfilUser;

		} else {
			perfil.addClass("is-invalid").removeClass("is-valid");
			objUsuario.perfil_user = vlFilter[0].perfil;

		}

		let data_atual = new Date();
		let data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();

		if (objUsuario.data_post == "") {
			objUsuario.data_post = data_post;
		}
		console.log(objUsuario)
		/*
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

		})*/
	}
	const fecharModal = () => {
		window.location.reload();
	}
	useEffect(() => {


		const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");


		if (estabelecimento_id !== 'null') {
			const param_api_list_usuario = `?api=getPerfilUsuarios`;
			$.post(urlApi + nameApi + param_api_list_usuario, (res, status) => {
				if (status == 'success') {
					var data = JSON.parse(res);
					setDataFilter(data);

				}
			})

		} else {
			alert("Nenhum cliente estabelecimento");
			//Sair();
		}


	}, [setDataFilter, setEdit, setConfirmSenhaUser, setSenhaUser]);


	return (
		<div class="modal fade" id={"editUsuario-" + idEdit} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticeditUsuario" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title fs-5"><i class="bi bi-person-fill-gear"></i> Atualizar  <strong>{estabelecimento_id}  </strong> do Est.: <strong>{ } </strong></h5>

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
						{
							vlFilter.map((element) => {
								return (
									<div key={element.id} >
										<div class="mb-3">
											<label for="nomeInput" class="form-label">Estabelecimento</label>
											<input type="text" class="form-control" id="estInput" placeholder={element.cod + ' - ' + element.nome} onChange={(e) => { setNomeUser(e.target.value) }} autocomplete="off" disabled />
										</div>
										<div class="mb-3">
											<label for="inpt-nome" class="form-label">Nome</label>
											<input type="text" class="form-control" id="inpt-nome" placeholder={element.nome} onChange={(e) => { setNomeUser(e.target.value) }} autocomplete="off" />
										</div>
										<div class="mb-3">
											<label for="inpt-email" class="form-label">E-mail</label>
											<input type="email" class="form-control" id="inpt-email" onChange={(e) => { setEmailLoginUser(e.target.value) }} placeholder={element.email} autocomplete="off" />
										</div>
										<div class="mb-3">
											<label for="inpt-perfil" class="form-label">Perfil</label>
											<select id="inpt-perfil" onChange={(e) => { setPerfilUser(e.target.value) }} class="form-select">
												<option>Selecione</option>
												<option value={element.perfil} selected>{element.perfil == 'o' ? 'owner' : element.perfil}</option>
												<option value="u">Usuário</option>
												<option value="a">Administrador</option>
											</select>
										</div>
									</div>)

							})
						}

						<div class="mb-3">
							<label for="senhaInput" class="form-label">Senha</label>
							<input type="password" class="form-control w-20" id="senhaInputs" onChange={(e) => { setSenhaUser(e.target.value) }} placeholder="Sua senha" autocomplete="off" />
						</div>
						<div class="mb-3">
							<label for="reSenhaInput" class="form-label">Confirmar a senha</label>
							<input type="password" class="form-control w-20" id="reSenhaInput" onChange={(e) => { setConfirmSenhaUser(e.target.value) }} placeholder="Sua senha" autocomplete="off" />
						</div>
					</div>




					<div class="modal-footer ">
						<button type="button" class="btn btn-sm btn-primary w-100 m-0  btn-edigit" id="btnEditarUsuario" onClick={(e) => { editUsuario(e) }}><i class="bi bi-check2"></i> Confirmar</button>
					</div>

				</div>
			</div>
		</div>

	)

}
export default ModalEditUsuarios;