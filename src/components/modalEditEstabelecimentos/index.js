import { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';
import $ from 'jquery';

const ModalEditEstabelecimentos = (data_id) => {
	var data = { data_id };
	var id = data.data_id;
	var idEdit = id.data_id;
	const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO;
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');

	const [nomeUser, setNomeUser] = useState("");
	const [emailLoginUser, setEmailLoginUser] = useState("");
	const [senhaUser, setSenhaUser] = useState("");
	const [perfilUser, setPerfilUser] = useState("");
	const [acessoUsuario, setAcessoUsuario] = useState(true);
	const [statusAtendimento, setStatusAtendimento] = useState(null);

	const [displayError, setDisplayError] = useState('none');
	const [displaySuccess, setDisplaySuccess] = useState('none');
	const [msgError, setMsgError] = useState(null);
	const [msgSuccess, setMsgSuccess] = useState(null);

	const [dataFilter, setDataFilter] = useState([]);
	const [edit, setEdit] = useState([]);

	const vlFilter = dataFilter.filter(e => { return e.id == idEdit });

	const fecharModal = () => {
		window.location.reload();
	}

	useEffect(() => {

		const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");
		const param_api_list_usuario = `?api=getAllStatusAtendimentos`;
		$.get(apiUrl + param_api_list_usuario, (res, status) => { })

	}, [setDataFilter, setAcessoUsuario, setEdit]);

	const mudarStatusAtendimento = (e) => {
		e.preventDefault();



	}
	return (
		<div class="modal fade" id={"editEstabelecimento-" + idEdit} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticeditEstab" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5"><i class="bi bi-person-fill-gear"></i> Status atendimento, ID{idEdit}</h1>
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

						<td class="fw-medium">Status do Atendimento:</td>
						<div class="input-group mt-2 mb-2  ">
							<select type='text' class="form-select " onChange={(e) => { setStatusAtendimento(e.target.value) }}>
								<option>Selecione</option>
								<option value="1">Em atendimento</option>
								<option value="2">Atendimento finalizado</option>
							</select>
							<button onClick={(e) => { mudarStatusAtendimento(e) }} class="btn btn-sm btn-primary">Atualizar</button>
						</div>

						<div class="modal-footer mt-3 p-0">
							<button type="button" onClick={(e) => { mudarStatusAtendimento(e) }} class="btn btn-sm btn-primary w-100 m-0" id="btnEditarUsuario"><i class="bi bi-check2-circle"></i> Confirmar</button>
						</div>

					</div>
				</div>
			</div>
		</div>
	)

}
export default ModalEditEstabelecimentos;