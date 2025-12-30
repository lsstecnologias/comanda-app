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
	const fecharModal = () => { window.location.reload(); }
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');

	const [nomeUser, setNomeUser] = useState("");
	const [emailLoginUser, setEmailLoginUser] = useState("");
	const [senhaUser, setSenhaUser] = useState("");
	const [perfilUser, setPerfilUser] = useState("");
	const [acessoUsuario, setAcessoUsuario] = useState(true);
	const [statusUpdate, setStatusUpdate] = useState("");
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
	let data_atual = new Date();
	const data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();

	const param_api_update_status = '?api=setUpdateStatusAtendimentos';
	const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");
	const { status_pos } = statusPosAtendimento[0] ?? [];
	
	
	const obj_status_atendimento = { cliente_id: codEdit, estabelecimento_id: estabelecimento_id, data_post: data_post,status_pos:status_pos }
	const call = useCallback((status_pos) => {

		if (status_pos == "1" || statusUpdate == '1') {
			return { "tipo": "warning", "msg": "Aguardando o atendimento!" };

		} else if (status_pos == "2" || statusUpdate == '2') {
			return { "tipo": "success", "msg": "Em atendimento!" };

		} else if (status_pos == "3" || statusUpdate == '3') {
				$('#btnAtualizar').attr("disabled",true);
			return { "tipo": "danger", "msg": "Atendimento finalizado!" };
			
		}else{
			if(statusUpdate){
				$('#btnAtualizar').attr("disabled",true);
			return { "tipo": "danger", "msg": "Atendimento finalizado!" };
			}
		}



	}, [statusTipoMsg]);

	const status_msg = call(status_pos) !== undefined ? call(status_pos) : '';
	
	useEffect(() => {

		if (status_msg.tipo !== undefined) {
			return status_msg.tipo;
		}

		const statusAtendimento = () => {
			const param_api_get_status_cod = "?api=getPosStatusAtendimentos";
			$.post(urlApi + nameApi + param_api_get_status_cod, obj_status_atendimento, async(res, status) => {
				if (status == 'success') {
					let data_status = await JSON.parse(res);
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

			obj_status_atendimento.status_pos =statusAtendimento;
			setStatusAtendimento()
			$.post(urlApi + nameApi + param_api_update_status, obj_status_atendimento, (res, status) => {
				if(status == 'success'){
						if(res == "1"){
							setStatusUpdate(statusAtendimento);
							//fecharModal()
							setMsgSuccess("O Status do cliente mudou, feche a tela e abra novamente! ");
							setDisplaySuccess("block")
							$('#btnAtualizar').attr("disabled",true);
						}
				}
			
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
						<h1 class="modal-title fs-4">Status atendimento <i class="bi bi-person-fill-gear"></i></h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { fecharModal() }}></button>
					</div>

					<div class="modal-body">
						<div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
							<i class="bi bi-check-circle p-2"></i>
							  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
							{msgSuccess !== null && msgSuccess}

						</div>
						<div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
							<i class="bi bi-exclamation-triangle p-2"></i>
							  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
							{msgError !== null && msgError}

						</div>


						<div id="status-atendimento">
							<div class={`alert alert-${status_msg.tipo !== undefined ? status_msg.tipo : ''} status-msg`} id="msgPosicao" role="alert">
								<div class={`spinner-grow text-${status_msg.tipo !== undefined ? status_msg.tipo : ''}`} role="status">
									<span class="visually-hidden">Loading...</span>
								</div>
								<p class='text-center ml-4 text-uppercase fw-semibold'>{`${status_msg.msg !== undefined ? status_msg.msg : ''}`}</p>
							</div>
						</div>
						<td class="fw-medium">Mudar Status: </td>
						<div class="input-group mt-2 mb-2  ">


							<select type='text' class="form-select " id="form-status" onChange={(e) => { setStatusAtendimento(e.target.value) }}>
								<option value={null} selected="selected">Selecione</option>
								<option value='2' >Em Atendimento</option>
								<option value='1' >Aguardando o atendimento</option>
								<option value='3' >Atendimento finalizado</option>

							</select>

							<button onClick={(e) => { mudarStatusAtendimento(e) }} class="btn btn-sm btn-primary btn-edigit" id="btnAtualizar">Atualizar <i class="bi bi-arrow-clockwise"></i></button>
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