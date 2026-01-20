import { useEffect, useState } from "react";
import $ from 'jquery';
import { preconnect } from "react-dom";
const Licenca = () => {
	sessionStorage.setItem('modal_notas', 'hide');

	const [chave, setChave] = useState("");
	const [dataInicio, setDataInicio] = useState("");
	const [dataFinal, setDataFinal] = useState("");
	const [statusValidacao, setStatusValidacao] = useState(Boolean);
	const [chaveLicenca,setChaveLicenca] = useState("");

	function getDataInicio() {
		if (dataInicio !== "") {
			const data_ini = dataInicio.split("-");
			var ano = (data_ini[0]);
			var mes = (data_ini[1]);
			var dia = (data_ini[2]);
			var data_inicio = (dia + '-' + mes + '-' + ano)
			return data_inicio;
		} else {
			return false;
		}
	}
	function getDataFinal() {
		if (dataFinal !== "") {
			const data_fim = dataFinal.split("-");
			var ano = (data_fim[0]);
			var mes = (data_fim[1]);
			var dia = (data_fim[2]);
			var data_final = (dia + '-' + mes + '-' + ano)
			return data_final;
		} else {
			return false;
		}
	}

	const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");

	const gerarLicenca = () => {
		const data_ini = getDataInicio();
		const data_fim = getDataFinal();
		var valor = "";
		if (data_ini) {
			$("#data_inicio").addClass('is-valid').removeClass('is-invalid');
			valor += data_ini + '-';
			setStatusValidacao(true)
		} else {
			$("#data_inicio").addClass('is-invalid').removeClass('is-valid');
			setStatusValidacao(false)
		}

		if (data_fim) {
			$("#data_final").addClass('is-valid').removeClass('is-invalid');
			valor += data_fim + '-';
			setStatusValidacao(true)
		} else {
			$("#data_final").addClass('is-invalid').removeClass('is-valid');
			setStatusValidacao(false)
		}
		valor += estabelecimento_id;
		$('#chaveLicenca').val(valor);
		var obj = [{
			estabelecimento_id:estabelecimento_id,
			licenca_n: (Math.floor(Math.random() * (999+999+999+1)) - 1)+'-'+estabelecimento_id,
			data_inicio:data_ini,
			data_final:data_fim,
			hora: new Date().toLocaleTimeString(),
			versao:'0.0.0.1-ls',
		}];
		const jsonString = JSON.stringify(obj, null, 2);
       const blob = new Blob([jsonString], { type: 'application/json' });
       const url = URL.createObjectURL(blob);

       const a = document.createElement('a');
       a.href = url;
       a.download = estabelecimento_id+'.cert.lss';
       document.body.appendChild(a);
		 a.click();
       document.body.removeChild(a);
       URL.revokeObjectURL(url);
		
		//setChaveLicenca(valor);

	}
	//$('#chaveLicenca').mask('00-00-0000-00-00-0000-');
	useEffect(() => {
		//$('#chaveLicenca').mask('00-00-0000-00-00-0000-');

		//00d-i00-a00-df0-00-00
	}, [setChave]);
	return (
		<div className="container mt-2 usuario">
			<h4 className="mb-2 mt-2 pb-2">Gerenciador de licença </h4>
				<button type="button" class="btn btn-sm btn-primary btn-edigit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
					Exibir modal
				</button>

			<div class="container border">

				<div class="row">
					<div class="col-sm-4 p-2">Data inicial<input type="date" class="form-control" id="data_inicio" onChange={(event) => { setDataInicio(event.target.value) }} />
						<div id="data_inicio" class="invalid-feedback">
							Selecione a data
						</div>
					</div>

					<div class="col-sm-4 p-2">Data Final
						<input type="date" class="form-control" id="data_final" onChange={(event) => { setDataFinal(event.target.value) }} />
						<div id="data_final" class="invalid-feedback">
							Selecione a data
						</div>
					</div>

					<div class="col-sm-4 p-2">Número da Licença<input type="text" class="form-control" placeholder="" id="chaveLicenca" /></div>
				</div>

			</div>

			<div class="container border p-2 d-flex align-items-center justify-content-between">
				<button type="button" class="btn btn-sm btn-primary btn-edigit w-100" onClick={() => { gerarLicenca() }}>
					<i class="bi bi-arrow-repeat"></i> Gerar
				</button>
			</div>

			<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered ">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="staticBackdropLabel">Licença de uso <i class="bi bi-key"></i> </h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">

							<div class="input-group mb-3">

								<input type="text" placeholder="" id="chaveLicenca" onChange={(e) => { setChave(e.target.value) }} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

							</div>
						</div>
						<div class="modal-footer">

							<button type="button" class="btn w-100 btn-primary" onClick={() => { gerarLicenca() }}>Validar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Licenca;