import { useEffect, useState } from "react";
import $ from 'jquery';
const Keygen = () => {
	sessionStorage.setItem('modal_notas', 'hide');

	const [chave, setChave] = useState("");
	const [dataInicio, setDataInicio] = useState("");
	const [dataFinal, setDataFinal] = useState("")

	const data_inicial = new Date();
	const data_final = new Date();

	const getDataInicio = () => {

		const data_ini = dataInicio.split("-");
		//Ano
		var ano = (data_ini[0]);
		data_inicial.setFullYear(ano);
		//Mês
		var mes = (data_ini[1]);
		data_inicial.setMonth(mes);
		//Dia
		var dia = (data_ini[2]);
		data_inicial.setDate(dia);

		
	}
	getDataInicio();
	
	console.log(data_inicial.getDate())
	console.log(data_inicial.getMonth())
	console.log(data_inicial.getFullYear())


	const getDataFinal = () => {

		const data_fim = dataFinal.split("-");
		//Ano
		var ano = (data_fim[0]);
		data_final.setFullYear(ano);
		//Mês
		var mes = (data_fim[1]);
		data_final.setMonth(mes);
		//Dia
		var dia = (data_fim[2]);
		data_final.setDate(dia);
		
	}
	getDataFinal();


	console.log(data_final.getDate())
	console.log(data_final.getMonth())
	console.log(data_final.getFullYear())


	/*
		const data = new Date(dataInicio);
		const dataDate = (data.getDate()+1);
		const dataMes 	= data.getMonth();
		const dataAno 	= data.getFullYear();
	*/


	const validarLicenca = (e) => {
		e.preventDefault();
		if (chave.length == 7) {
			console.log(chave)
		}

	}
	$('#chaveLicenca').mask('00D-I00-000-DF0-000-000');
	useEffect(() => {
		$('#chaveLicenca').mask('00D-I00-000-DF0-000-000');

		//00d-i00-a00-df0-00-00
	}, [setChave]);
	return (
		<div className="container mt-2 usuario">
			<h4 className="mb-2 mt-2 pb-2">Keygen <i class="bi bi-key"></i></h4>
			<h5 className="mb-2  pb-2">Licença de acesso</h5>

			<div class="container border">

				<div class="row">
					<div class="col-sm-4 p-2">Data inicial<input type="date" class="form-control" name="data_inicio" onChange={(event) => { setDataInicio(event.target.value) }} /></div>
					<div class="col-sm-4 p-2">Data Final<input type="date" class="form-control" name="data_final" onChange={(event) => { setDataFinal(event.target.value) }} /></div>
					<div class="col-sm-4 p-2">Número da Licença<input type="text" class="form-control" placeholder="00D-I00-000-DF0-000-000" id="chaveLicenca" /></div>
				</div>

			</div>

			<div class="container border p-2 d-flex align-items-center justify-content-between">
				<button type="button" class="btn btn-sm btn-primary btn-edigit" onClick={() => { getDataInicio() }}>
					Launch static backdrop modal
				</button>
				<button type="button" class="btn btn-sm btn-primary btn-edigit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
					Exibir modal
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

								<input type="text" placeholder="00D-I00-000-DF0-000-000" id="chaveLicenca" onChange={(e) => { setChave(e.target.value) }} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

							</div>
						</div>
						<div class="modal-footer">

							<button type="button" class="btn w-100 btn-primary" onClick={(e) => { validarLicenca(e) }}>Validar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Keygen;