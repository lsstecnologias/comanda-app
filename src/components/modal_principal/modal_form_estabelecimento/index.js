import { useEffect, useState } from 'react';
import bg_logo from '../bg_logo.png';
import $ from 'jquery';
const ModalFormEstabelecimento = () => {

	const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO;
	const estabelecimento_id = sessionStorage.getItem('estabelecimento_id');
	const status = sessionStorage.getItem('status');
	const param_api_set_estabelecimentos = "?api=setEstabelecimento";

	const fecharModal = () => {
		window.location.reload();
	}
	const addNovoEstabelecimento = (e) => {
		e.preventDefault();
		const nome = $("#nome");
		const sobrenome = $("#sobrenome");
		const cpf = $("#cpf");
		const msg = $("#msg");
		const rg = $("#rg");
		const cep = $("#cep");
		const endereco = $("#endereco");

		const data_atual = new Date();
		const data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();

		var obj_est = { estabelecimento_id: estabelecimento_id, nome: null, sobrenome: null, rg: null, cpf: null, cnpj: null, cep: null, status: 'a', endereco: null, data_post: data_post };

		if (nome.val()) {
			obj_est.nome = nome.val();
			nome.addClass("is-valid").removeClass("is-invalid");
			msg.addClass('d-none');

		} else {
			obj_est.nome = null;
			nome.addClass("is-invalid").removeClass("is-valid");
			msg.removeClass('d-none').addClass('d-block alert-danger').text('Preencha todos os campo!');
		}

		if (sobrenome.val()) {
			obj_est.sobrenome = nome.val();
			sobrenome.addClass("is-valid").removeClass("is-invalid");

			msg.addClass('d-none');
		} else {
			obj_est.sobrenome = null;
			sobrenome.addClass("is-invalid").removeClass("is-valid");
			msg.removeClass('d-none').addClass('d-block alert-danger').text('Preencha todos os campo!');
		}

		//ESTABELECIMENTO
		if (cpf.val()) {
			obj_est.cpf = cpf.val();
			cpf.addClass("is-valid").removeClass("is-invalid");
			msg.addClass('d-none');
		} else {
			obj_est.cpf = null;
			cpf.addClass("is-invalid").removeClass("is-valid");
			msg.removeClass('d-none').addClass('d-block alert-danger').text('Preencha todos os campo!');

		}

		if (rg.val()) {
			obj_est.rg = rg.val();
			rg.addClass("is-valid").removeClass("is-invalid");
			msg.addClass('d-none');
		} else {
			obj_est.rg = null;
			rg.addClass("is-invalid").removeClass("is-valid");
			msg.removeClass('d-none').addClass('d-block alert-danger').text('Preencha todos os campo!');
		}
		/* ATUALIZAR ESTATUS DO USUARIo
		if (cnpj.val()) {
			 obj_cliente.cnpj = cnpj.val();
			 cnpj.addClass("is-valid").removeClass("is-invalid");
		} else {
			 obj_cliente.cnpj = null;
			 cnpj.addClass("is-invalid").removeClass("is-valid");
		}*/

		if (cep.val()) {
			obj_est.cep = cep.val();
			cep.addClass("is-valid").removeClass("is-invalid");
			msg.addClass('d-none');

		} else {
			obj_est.cep = null;
			cep.addClass("is-invalid").removeClass("is-valid");
			msg.removeClass('d-none').addClass('d-block alert-danger').text('Preencha todos os campo!');
		}



		if (endereco.val()) {
			obj_est.endereco = endereco.val();
			msg.addClass('d-none');
			endereco.addClass("is-valid").removeClass("is-invalid");
		} else {
			obj_est.endereco = null;
			endereco.addClass("is-invalid").removeClass("is-valid");
			msg.removeClass('d-none').addClass('d-block alert-danger').text('Preencha todos os campo!');
		}

		$.post(apiUrl + param_api_set_estabelecimentos, obj_est, (res, status) => {
			if (status == 'success') {
				if (res == "1") {

					const param_api_update_usuarios = "?api=setUpdateUsuarios";
					$.post(apiUrl + param_api_update_usuarios, { estabelecimento_id: estabelecimento_id, status: 'a' }, (res, status) => {
						if (status == 'success') {
							console.log(res);
							$('.btn-edigit').attr('disabled', true);
							msg.addClass('d-block alert-success').text('Concluído, Obrigado!').removeClass("d-none alert-danger");
						}

					})
				}

			}
		})
	}

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
	useEffect(() => {
		//$('#cnpj').mask('00.000.000/0000-00')
		$('#rg').mask('00.000.000-00');
		$('#cep').mask('00000000');
		$('#cpf').mask('000.000.000-00');


	}, []);


	return (
		<div class="modal fade " id="myModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
			<div class="modal-dialog modal-xl">
				<div class="modal-content">
					<div class="modal-header">

						<button type="button" class="btn-close" onClick={() => { fecharModal() }} data-bs-dismiss="modal" aria-label="Close">
						</button>
						<small style={{ marginLeft: '10px' }}>Fechar</small>
					</div>
					<div class="modal-body d-flex align-items-center justify-content-center ">
						<tr >
							<div class="col-sm-12 container-fluid">
								<tr>
									<td>
										<img src={bg_logo} class="img-fluid mb-3 ml-3" alt="Example image" width="240" height="300" style={{ marginLeft: '43px' }} />
									</td>
								</tr>

								<tr>

									<td class="text-center mb-4">
										<h2 className='pb-2'>Olá, tudo bem?</h2>
										<h5> Vamos completar o seu cadastro! 😄</h5>
									</td>

								</tr>
							</div>
						</tr>

					</div>
					<div class="container-fluid">
						<div class="row">


							<div class="col-12">
								<div id="msg" class="alert d-none" role="alert">

								</div>
								<table class="table " style={{ "borderWidth": "0" }}>

									<thead >
										<tr>
											<th scope="col" style={{ "borderWidth": "0" }}>Nome</th>

										</tr>
									</thead>

									<tbody style={{ "borderWidth": "0" }}>

										<tr style={{ "borderWidth": "0" }}>

											<td scope="row" style={{ "borderWidth": "0" }}>
												<div class="input-group" style={{ "borderWidth": "0" }}>
													<input type="text" name="nome" autoComplete="off" id="nome" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
												</div>
											</td>

										</tr>

										<tr style={{ "borderWidth": "0" }}>
											<th scope="row" colSpan={2} style={{ "borderWidth": "0" }}>Sobrenome</th>

										</tr>
										<tr style={{ "borderWidth": "0" }}>

											<td scope="row" style={{ "borderWidth": "0" }}>
												<div class="input-group" style={{ "borderWidth": "0" }}>
													<input type="text" name="sobrenome" autoComplete="off" id="sobrenome" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
												</div>
											</td>

										</tr>


										<tr style={{ "borderWidth": "0" }}>
											<th scope="row" colSpan={2} style={{ "borderWidth": "0" }}>RG</th>

										</tr>
										<tr style={{ "borderWidth": "0" }} >
											<td colSpan={2} scope="row" style={{ "borderWidth": "0" }}>
												<div class="input-group">

													<input type="text" autoComplete="off" name="rg" id="rg" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
												</div>
											</td>


										</tr>

										<tr style={{ "borderWidth": "0" }}>
											<th scope="row" colSpan={2} style={{ "borderWidth": "0" }}>CPF</th>

										</tr>
										<tr style={{ "borderWidth": "0" }}>
											<td colSpan={4} scope="row" style={{ "borderWidth": "0" }}>
												<div class="input-group">

													<input type="text" autoComplete="off" name="cpf" id="cpf" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
												</div>
											</td>


										</tr>

										<tr style={{ "borderWidth": "0" }}>
											<th colSpan={3} scope="row" style={{ "borderWidth": "0" }}>CEP</th>

										</tr>

										<tr>
											<td colSpan={3} scope="row" style={{ "borderWidth": "0" }}>
												<div class="input-group  " style={{ "borderWidth": "0" }}>

													<input type="text" autoComplete="off" name="cep" id="cep" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

													<button class="btn btn-outline-secondary" type="button" onClick={(e) => { consultarCep(e) }} id="button-addon1"><small></small> <i class="bi bi-search"></i></button>
												</div>

											</td>


										</tr>
										<tr>
											<th colSpan={3} scope="row" style={{ "borderWidth": "0" }}>ENDEREÇO</th>

										</tr>
										<tr>
											<td colSpan={3} scope="row">
												<div class="input-group">

													<input type="text" autoComplete="off" disabled='disabled' name="endereco" id="endereco" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
													<button class="btn btn-outline-secondary" onClick={(e) => { alterarEndereco(e) }} type="button" id="btn-alterar"><small>Alterar</small> <i class="bi bi-pencil-square"></i></button>
												</div>

											</td>
										</tr>
										<tr >
											<td style={{ "borderWidth": "0" }}>
												<button class="w-100 btn btn-primary btn-edigit mt-4" onClick={(e) => addNovoEstabelecimento(e)}><i class="bi bi-check2-all"></i> Finalizar</button>
											</td>
										</tr>
									</tbody>
								</table>

							</div>
						</div>

					</div>



				</div>

			</div>

		</div>
	)
}
export default ModalFormEstabelecimento;