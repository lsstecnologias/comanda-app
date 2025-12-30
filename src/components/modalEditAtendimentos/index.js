import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
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
	const fetchCodEdit = useMemo(() => { if (codEdit !== undefined) { return codEdit; } }, [codEdit]);

	//alert(codusuarios)
	///sessionStorage.setItem("cliente_id", idEdit);
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');

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
	const [statusTipoMsg, setStatusTipoMsg] = useState("");

	const urlApi = 'http://10.10.10.6/';
	const nameApi = 'api_comanda/';


	const param_api_update_status = '?api=setUpdateStatusAtendimentos';
	const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");
	const obj_status_atendimento = { cliente_id: codEdit, estabelecimento_id: estabelecimento_id }
	const fecharModal = () => { window.location.reload(); }

	/*
	const getPosStatusAtendimento = () => {
		const param_api_get_status_cod = "?api=getPosStatusAtendimentos";
		var obj = { cliente_id: codEdit, estabelecimento_id: estabelecimento_id };
		$.post(urlApi + nameApi + param_api_get_status_cod, obj, async (res, status) => {
			var data_pos = await JSON.parse(res);

			const { cliente_id, estabelecimento_id, id, status_pos } = await data_pos[0] ?? data_pos;
			console.log(status_pos)
			if (status_pos == '0') {
				var str_msg = `<div class="alert alert-warning status-msg" role="alert">
				<div class="spinner-border text-warning" role="status">
				<span class="visually-hidden">Loading...</span>
				</div><p class='text-center ml-4'>Aguardando Atendimento!</p>
				</div>`;




			} else if (status_pos == '1') {
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
	*/

	var { status_pos } = statusPosAtendimento[0] ?? [];
	const call = useCallback((status_pos) => {

		if (status_pos == "1") {
			return { "tipo": "warning" };

		} else if (status_pos == "2") {
			return { "tipo": "success" };

		} else if (status_pos == "3") {
			return { "tipo": "danger" };
		}



	}, [statusTipoMsg]);

	const status_msg = call(status_pos) !== undefined ? call(status_pos) : '';

	useEffect(() => {
		
		
		if (status_msg.tipo !== undefined) {
			return status_msg.tipo;
		}

		const statusAtendimento = () => {
			const param_api_get_status_cod = "?api=getPosStatusAtendimentos";
			$.post(urlApi + nameApi + param_api_get_status_cod, obj_status_atendimento, (res, status) => {
				if (status == 'success') {
					let data_status = JSON.parse(res);
					setStatusPosAtendimento(data_status);
				} else {
					alert("Error: parametros API ");
				}

			})

		}
		statusAtendimento();

	}, [setDataFilter, setAcessoUsuario, setEdit, setStatusPosAtendimento, fetchCodEdit, setStatusTipoMsg]);

	const mudarStatusAtendimento = (e) => {
		e.preventDefault();

		if (statusAtendimento !== null) {


			$.post(urlApi + nameApi + param_api_update_status, obj_status_atendimento, (res, status) => {
				console.log(res)
			})
		} else {
			alert("Selecione o status do atendimento!");
		}

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


						<div id="status-atendimento">
							<div class={`alert alert-${status_msg.tipo !== undefined ? status_msg.tipo : ''} status-msg`} id="msgPosicao" role="alert">
								<div class={`spinner-grow text-${status_msg.tipo !== undefined ? status_msg.tipo : ''}`} role="status">
									<span class="visually-hidden">Loading...</span>
								</div>
								<p class='text-center ml-4 text-uppercase fw-semibold'>{`${'teste'}`}</p>
							</div>
						</div>
						<td class="fw-medium">Mudar Status: </td>
						<div class="input-group mt-2 mb-2  ">


							<select type='text' class="form-select " id="form-status" onChange={(e) => { setStatusAtendimento(e.target.value) }}>
								<option value={null}>Selecione</option>
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