import { useEffect, useState } from "react";
import $ from 'jquery';
import { v4 as uuidv4 } from 'uuid';
import Imagens from "../upload_imagens";
import TabelaUsuario from "../tabela_usuario";

import Header from '../header';
import TabelaCliente from "../tabela_cliente";

var md5 = require('md5');


const Clientes = () => {
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');
	const [nomeUser, setNomeUser] = useState("");
	const [emailLoginUser, setEmailLoginUser] = useState("");
	const [senhaUser, setSenhaUser] = useState("");
	const [perfilUser, setPerfilUser] = useState("");
	//HOOK MSG ERROS
	const [displayError, setDisplayError] = useState('none');
	const [displaySuccess, setDisplaySuccess] = useState('none');
	const [msgError, setMsgError] = useState(null);
	const [msgSuccess, setMsgSuccess] = useState(null);

	const addNovoCliente = (e) => {
		e.preventDefault();
		const nome = $("#nome");
		const sobrenome = $("#sobrenome");
		const email = $("#email");
		const cpf = $("#cpf");
		const cnpj = $("#cnpj");
		const rg = $("#rg");
		const cep = $("#cep");
		const endereco = $("#endereco");
		const senha = $("#senha");
		const btnAdicionar = $("#btnAdicionarClientes");

		const fullUuid = uuidv4();
		let data_atual = new Date();
		let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();
		var codCliente = fullUuid.substring(0, 7)

		const obj_cliente = { cod: codCliente, nome: "", sobrenome: "", email: "", senha: "", cpf: "", rg: "", cnpj: "", cep: "", endereco: "", data_post: data_post };


		if (nome.val()) {
			obj_cliente.nome = nome.val();

			nome.addClass("is-valid").removeClass("is-invalid");

		} else {
			obj_cliente.nome = null;
			nome.addClass("is-invalid").removeClass("is-valid");
		}

		if (sobrenome.val()) {
			obj_cliente.sobrenome = sobrenome.val();
			sobrenome.addClass("is-valid").removeClass("is-invalid");

		} else {
			obj_cliente.sobrenome = null;
			sobrenome.addClass("is-invalid").removeClass("is-valid");
		}

		function validateEmail(email) {
			const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			return regex.test(email);
		}
		//valida email
		if (validateEmail(email.val())) {
			email.addClass("is-valid").removeClass("is-invalid");
			obj_cliente.email = email.val();
		} else {
			email.addClass("is-invalid").removeClass("is-valid");
			obj_cliente.email = null;
		}

		if (cpf.val()) {
			obj_cliente.cpf = cpf.val();
			cpf.addClass("is-valid").removeClass("is-invalid");

		} else {
			obj_cliente.cpf = null;
			cpf.addClass("is-invalid").removeClass("is-valid");

		}

		if (rg.val()) {
			obj_cliente.rg = cpf.val();
			rg.addClass("is-valid").removeClass("is-invalid");
		} else {
			obj_cliente.rg = null;
			rg.addClass("is-invalid").removeClass("is-valid");
		}

		if (cnpj.val()) {
			obj_cliente.cnpj = cnpj.val();
			cnpj.addClass("is-valid").removeClass("is-invalid");
		} else {
			obj_cliente.cnpj = null;
			cnpj.addClass("is-invalid").removeClass("is-valid");
		}

		if (cpf.val()) {
			obj_cliente.cpf = cpf.val();
			cpf.addClass("is-valid").removeClass("is-invalid");
		} else {
			obj_cliente.cpf = null;
			cpf.addClass("is-invalid").removeClass("is-valid");
		}

		if (senha.val()) {
			obj_cliente.senha = md5(senha.val());
			senha.addClass("is-valid").removeClass("is-invalid");
		} else {
			obj_cliente.senha = null;
			senha.addClass("is-invalid").removeClass("is-valid");
		}

		if (cep.val()) {
			obj_cliente.cep = cep.val();
			cep.addClass("is-valid").removeClass("is-invalid");
		} else {
			obj_cliente.cep = null;
			cep.addClass("is-invalid").removeClass("is-valid");
		}

		if (endereco.val()) {
			obj_cliente.endereco = endereco.val();
			endereco.addClass("is-valid").removeClass("is-invalid");
		} else {
			obj_cliente.endereco = null;
			endereco.addClass("is-invalid").removeClass("is-valid");
		}

		const urlApi = 'http://10.10.10.6/';
		const nameApi = 'api_comanda/';

		const param_save_estabelecimento = "?api=setEstabelecimento";
		//REGISTRA OS DADOS NA TABELA DE ESTABELECIMENTO/CLIENTE

		$.post(urlApi + nameApi + param_save_estabelecimento, obj_cliente, (res, status) => {

			if (status == "success") {
				if (res == 1) {
					$("#senha").val("");
					setDisplaySuccess("block");
					setMsgSuccess("Pré-cadastro realizado!");
					setDisplayError("none")
					setMsgError(null);
				} else {
					setDisplaySuccess("none");
					setDisplayError("block")
					setMsgError("Erro: verifique os campos!");
					setMsgSuccess(null);
				}
			} else {
				alert("Error: parametros API")
			}

		});
	}
		
		const fecharModal = () => {
			window.location.reload();
		}



		useEffect(() => {
			$('#cnpj').mask('00.000.000/0000-00')
			$('#rg').mask('00.000.000-00');
			$('#cep').mask('00000000');
			$('#cpf').mask('000.000.000-00');

			/*
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
	
			})*/

		},[]);
		const consultarCep = (e) => {
			e.preventDefault();
			let cep = document.getElementById('cep');

			if (cep.value && cep.value.length >= 8) {
				const inpt_cep = cep.value;
				$.get(`https://viacep.com.br/ws/${inpt_cep}/json/`, async (res, status) => {
					if (status == 'success') {
						if (!res.erro) {
							const { cep, logradouro, bairro, localidade, uf, estado, regiao } = await res;
							var str = `${cep} - ${logradouro} - ${bairro} - ${localidade} - ${uf} - ${estado} - ${uf} -${regiao}`;
							document.getElementById("endereco").value = str;

							$("#cep").addClass("is-valid").removeClass("is-invalid");
						} else {
							$("#cep").addClass("is-invalid").removeClass("is-valid");
						}
					}
				})
			} else {

				$("#cep").addClass("is-invalid").removeClass("is-valid");
			}

		}

		const alterarEndereco = (e) => {
			e.preventDefault();
			$('#endereco').attr({ "disabled": false })
		}
		const gerarSenha = (e) => {
			e.preventDefault();
			const fullUuid = uuidv4();
			var senha = fullUuid.substring(0, 6);
			$("#senha").val(senha);

		}

		return (
			<div className="container usuario table-responsive mt-3 animate__animated animate__fadeIn">
				<div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
					<i class="bi bi-check-circle p-2"></i>
					{msgSuccess !== null && msgSuccess}

				</div>
				<div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
					<i class="bi bi-exclamation-triangle p-2"></i>
					{msgError !== null && msgError}

				</div>
				<h4 className="mb-2 mt-2 pb-2">Estabelecimento/Cliente</h4>

				<table class="table table-bordered ">
					<thead>
						<tr>
							<th colSpan={5} scope="col">Nome</th>
						</tr>
					</thead>

					<tbody>

						<tr>

							<td colSpan={3} scope="row">
								<div class="input-group">
									<input type="text" name="nome" autoComplete="off" id="nome" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								</div>
							</td>
						</tr>
						<tr>
							<th colSpan={3} scope="row">Sobrenome</th>
						</tr>
						<tr>
							<td colSpan={3} scope="row">
								<div class="input-group">
									<input type="text" autoComplete="off" name="sobrenome" id="sobrenome" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								</div>
							</td>
						</tr>
						<tr>
							<th colSpan={3} scope="row">E-mail</th>
						</tr>
						<tr>
							<td colSpan={3} scope="row">
								<div class="input-group">
									<input type="email" autoComplete="off" name="email" id="email" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
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

									<input type="text" autoComplete="off" name="cpf" id="cpf" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								</div>
							</td>
							<td scope="row">
								<div class="input-group">

									<input type="text" autoComplete="off" name="rg" id="rg" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								</div>
							</td>
							<td scope="row">
								<div class="input-group">

									<input type="text" autoComplete="off" name="cnpj" id="cnpj" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								</div>
							</td>

						</tr>
						<tr>
							<th colSpan={3} scope="row">CEP</th>

						</tr>
						<tr>
							<td colSpan={3} scope="row"><div class="input-group ">

								<input type="text" autoComplete="off" name="cep" id="cep" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								<button class="btn btn-outline-secondary" type="button" onClick={(e) => { consultarCep(e) }} id="button-addon1"><small>Consultar</small> <i class="bi bi-search"></i></button>
							</div></td>

						</tr>
						<tr>
							<th colSpan={3} scope="row">GERAR SENHA</th>

						</tr>
						<tr>
							<td colSpan={3} scope="row">
								<div class="input-group ">

									<input type="text" autoComplete="off" name="senha" id="senha" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
									<button class="btn btn-outline-secondary" onClick={(e) => { gerarSenha(e) }} type="button" id="btn-alterar">  <i class="bi bi-arrow-repeat"></i></button>
								</div>
							</td>

						</tr>
						<tr>
							<th colSpan={3} scope="row">ENDEREÇO</th>

						</tr>
						<tr>
							<td colSpan={3} scope="row"><div class="input-group ">

								<input type="text" autoComplete="off" disabled='disabled' name="endereco" id="endereco" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
								<button class="btn btn-outline-secondary" onClick={(e) => { alterarEndereco(e) }} type="button" id="btn-alterar"><small>Alterar</small> <i class="bi bi-pencil-square"></i></button>
							</div></td>

						</tr>
						<tr>
							<td colSpan={3} scope="row">
								<div class="input-group ">

									<button type="button" class="btn btn-primary w-100" id="btnAdicionarClientes" onClick={(e) => { addNovoCliente(e) }}> <i class="bi bi-pencil-square"></i> Cadastrar</button>
								</div>
							</td>

						</tr>

					</tbody>

				</table>



			</div>
		)

	}

export default Clientes;