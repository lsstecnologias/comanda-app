import { useEffect, useState } from "react";
import $ from 'jquery';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { UserContext } from '../context';

var md5 = require('md5');


const Estabelecimento = () => {
	//PERIMITE NÃO EXIBIR MODAL INICIAL DE NOTAS
	const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO;
	sessionStorage.setItem('modal_notas', 'hide');
	const [nomeUser, setNomeUser] = useState("");
	const [emailLoginUser, setEmailLoginUser] = useState("");
	const [senhaUser, setSenhaUser] = useState("");
	const [reSenhaUser, setReSenhaUser] = useState("");
	const [perfilUser, setPerfilUser] = useState("");
	const { sessao, status, redirect_login, Sair } = useContext(UserContext);
	const [typeSenha, setTypeSenha] = useState("password");
	const [typeReSenha, setTypeReSenha] = useState("password");
	//HOOK MSG ERROS
	const [displayError, setDisplayError] = useState('none');
	const [displaySuccess, setDisplaySuccess] = useState('none');
	const [msgError, setMsgError] = useState(null);
	const [msgSuccess, setMsgSuccess] = useState(null);



	const addNovoClienteEstabelecimento = (e) => {
		e.preventDefault();
		const nome 		= $("#nome");
		const sobrenome = $("#sobrenome");
		const email 	= $("#email");		
		const resenha 	= $("#re-senha");		
		const senha 	= $("#senha");
		const perfil    = $("#perfil");
		const btnCadastrar = $("#btnCadastrar");

		const fullUuid = uuidv4();
		let data_atual = new Date();
		let data_post = data_atual.toLocaleTimeString()+"-"+data_atual.toLocaleDateString().toString();
		var estabelecimento_id = fullUuid.substring(0, 7)

		//Establegecimento = nome - sobrenome - cpf - rg - cep - endereco - perfil-status - data_post//
		//const obj_est = { cliente_id: cliente_id, nome: "",  email: "", senha: "", cpf: "", rg: "", cep: "", endereco: "", data_post: data_post };
		//
		//ADICIONAR LOGICA ENTRE NOVO ESTABELECIMENTO OU USUARIO DO ESTABELECIMENTO
	
		const obj_cli = { cod_user: estabelecimento_id, cod_estabelecimento: estabelecimento_id, nome_user: "", login_email: "", senha_user: "", perfil_user: "",status_user:"n", data_post: data_post };

		if (nome.val()) {
			obj_cli.nome_user = nome.val();

			nome.addClass("is-valid").removeClass("is-invalid");

		} else {
			obj_cli.nome_user = null;
			nome.addClass("is-invalid").removeClass("is-valid");
		}


		if (sobrenome.val()) {
			obj_cli.sobrenome = sobrenome.val();
			sobrenome.addClass("is-valid").removeClass("is-invalid");

		} else {
			obj_cli.sobrenome = null;
			sobrenome.addClass("is-invalid").removeClass("is-valid");
		}
		

		if (perfil.val()) {
			obj_cli.perfil_user = perfil.val();
			perfil.addClass("is-valid").removeClass("is-invalid");

		} else {
			obj_cli.perfil_user = null;
			perfil.addClass("is-invalid").removeClass("is-valid");
		}


		function validateEmail(email) {
			const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			return regex.test(email);
		}
		//valida email
		if (validateEmail(email.val())) {
			email.addClass("is-valid").removeClass("is-invalid");
			obj_cli.login_email = email.val();
		} else {
			email.addClass("is-invalid").removeClass("is-valid");
			obj_cli.login_email = null;
		}
		
		if (senha.val()) {

			if (senha.val() == resenha.val()) {
				obj_cli.senha_user = md5(senha.val());
				senha.addClass("is-valid").removeClass("is-invalid");
				resenha.addClass("is-valid").removeClass("is-invalid");
			} else {
				senha.addClass("is-invalid").removeClass("is-valid");
				resenha.addClass("is-invalid").removeClass("is-valid");
			}



		} else {
			obj_cli.senha_user = null;
			senha.addClass("is-invalid").removeClass("is-valid");
			resenha.addClass("is-invalid").removeClass("is-valid");
		}


		const urlApi = 'http://10.10.10.6/';
		const nameApi = 'api_comanda/';

		const param_api_set_clientes = "?api=setUsuarios";
		//REGISTRA OS DADOS NA TABELA DE ESTABELECIMENTO/CLIENTE
		/**/
		$.post(apiUrl + param_api_set_clientes, obj_cli, (res, status) => {
			
			if (status == "success") {
				if (res == 1) {
					
					setDisplaySuccess("block");
					setMsgSuccess("Novo usuário, adicionado!");
					setDisplayError("none")
					btnCadastrar.attr("disabled",true)
					setMsgError(null);
					
				} else {
					setDisplaySuccess("none");
					setDisplayError("block")
					setMsgError("Error: verifique os campos!");
					btnCadastrar.attr("disabled",false)
					setMsgSuccess(null);
				}
			} else {
				alert("Error: parametros API")
			}

		});


		//console.log(obj_cliente)

	}

	const gerarSenha = (e) => {
		e.preventDefault();
		const fullUuid = uuidv4();
		var senha = fullUuid.substring(0, 7);
		$('#senha').val(senha)
	}

	const fecharModal = () => {
		window.location.reload();
	}


	const exibirSenha = (e) => {
		e.preventDefault();
		if (typeSenha == "password") {
			setTypeSenha("text");

		} else {
			setTypeSenha("password");
		}


	}

	const exibirReSenha = (e) => {
		e.preventDefault();

		if (typeReSenha == "password") {
			setTypeReSenha("text");

		} else {
			setTypeReSenha("password");

		}


	}


	return (
		<div className="container usuario table-responsive mt-3 animate__animated animate__fadeIn">
			<h4 className="mb-4 mt-2 pb-2 ">Estabelecimentos <i class="bi bi-shop-window m-2"></i></h4>

			<div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
				<i class="bi bi-check-circle p-2"></i>
				{msgSuccess !== null && msgSuccess}

			</div>
			<div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
				<i class="bi bi-exclamation-triangle p-2"></i>
				{msgError !== null && msgError}

			</div>

			<table class="table table-bordered ">
				<thead>
					<tr>
						<th scope="col">Nome</th>
						<th scope="col">Sobrenome</th>
					</tr>
				</thead>

				<tbody>
					<tr>

						<td scope="row">
							<div class="input-group">
								<input type="text" name="nome" autoComplete="off" id="nome" placeholder="Nome" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
							</div>
						</td>
						<td scope="row">
							<div class="input-group">
								<input type="text" autoComplete="off" name="sobrenome" id="sobrenome"  placeholder="Sobrenome" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
							</div>
						</td>
					</tr>
					<tr>
						<th colSpan={3} scope="row">E-MAIL</th>
					</tr>
					<tr>
						<td colSpan={3} scope="row">
							<div class="input-group">
								<input type="email" autoComplete="off" name="email" id="email" class="form-control" placeholder="E-mail para acesso" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
							</div>
						</td>
					</tr>
					<tr>
						<th colSpan={3} scope="row">SUA SENHA</th>

					</tr>
					<tr>
						<td colSpan={3} scope="row">
							<div class="input-group ">

								<input type={typeSenha} autoComplete="off" name="senha" onChange={(e) => setSenhaUser(e.target.value)} id="senha" placeholder="••••••"  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								<button class="btn btn-outline-secondary" onClick={(e) => { exibirSenha(e) }} type="button" id="btn-exibir"> <i class="bi bi-eye"></i> </button>
								<button class="btn btn-outline-secondary" onClick={(e) => { gerarSenha(e) }} type="button" id="btn-exibir"> <i class="bi bi-arrow-repeat"></i></button>
							</div>
						</td>


					</tr>
					<tr>
						<th colSpan={3} scope="row">REPETIR SENHA</th>

					</tr>
					<tr>
						<td colSpan={3} scope="row">
							<div class="input-group ">

								<input type={typeReSenha} autoComplete="off" name="resenha" onChange={(e) => setReSenhaUser(e.target.value)} id="re-senha" placeholder="••••••"  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								<button class="btn btn-outline-secondary" onClick={(e) => { exibirReSenha(e) }} type="button" id="btn-exibir">  <i class="bi bi-eye"></i></button>

							</div>
						</td>
					</tr>
					<tr>
						<th colSpan={3} scope="row">PERFIL DE ACESSO</th>

					</tr>
					<tr>
						<td colSpan={3} scope="row">
							<div class="input-group ">
								<select class="form-select" id="perfil">
									<option value="">Selecione</option>
									<option value="s">Super usuário</option>
									<option value="u">Usuário</option>
									<option valus="a">Administrador</option>
								</select>
							
							</div>
						</td>
					</tr>

					<tr>
						<td colSpan={3} scope="row">
							<div class="input-group ">

								<button type="button" class="btn btn-primary w-100 btn-edigit" id="btnCadastrar"  onClick={(e) => { addNovoClienteEstabelecimento(e) }}> <i class="bi bi-pencil-square"></i> Cadastrar</button>
							</div>
						</td>

					</tr>

				</tbody>

			</table>



		</div>
	)

}

export default Estabelecimento;