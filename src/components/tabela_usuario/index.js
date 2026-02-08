import { data, error } from "jquery";
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../context';
import ListPagina from "../../ListPagina";
import ModalEditUsuarios from "../modalEditUsuarios";
import $ from 'jquery';

import Pagination from "../../ListPagina";


const Tabelausuarios = () => {
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO;
	sessionStorage.setItem('modal_notas', 'hide');

	//CONTINUA AQUI....
	const { sessao, status, redirect_login, Sair } = useContext(UserContext);

	var [usuarios, setUsuarios] = useState([]);

	const [codUser, setCodUser] = useState("");
	const [id, setId] = useState(null);
	
	
	const [displaySuccess, setDisplaySuccess] = useState('none');
	const [msgSuccess, setMsgSuccess] = useState(null);


	//PAGINACAO
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = usuarios.slice(indexOfFirstPost, indexOfLastPost);
	<ListPagina />

	const editItem = (id) => { setId(id); }
	const paramApi_delete_item = '/api/deleteUsuarios/';

	const deleteUsuario = (id) => {
		if (id !== null || id !== undefined) {
			$.post(apiUrl + paramApi_delete_item, { "id": id }, (res,status) => {
				if(status == "success"){
					if(res == "1"){
						setDisplaySuccess("block");
						setMsgSuccess("Usuário excluido!")
						window.location.reload()
					}
				}
				
			})
		}
	}

	useEffect(() => {

		const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");

		if (estabelecimento_id !== 'null') {
			const param_api_list_usuario = `/api/getAllUsuarios/`;
			$.post(apiUrl + param_api_list_usuario, (res, status) => {
				if (status == 'success') {
					setUsuarios(res);

				}
			})
		} else {
			alert("Nenhum cliente estabelecimento");
			Sair();
		}

	}, [setCodUser, setUsuarios]);

	return (
		<div class="table-responsive mt-3">
			<div class="align-items-center alert alert-success fade show" style={{ display: displaySuccess }} role="alert">		
				{msgSuccess !== null && msgSuccess}

			</div>
			<table class="table caption-top animate__animated animate__fadeIn ">

				<thead>
					<tr>
						<th scope="col">Cod. est </th>
						<th scope="col">Cod. usr </th>
						<th scope="col">Nome</th>
						<th scope="col">Email</th>
						<th scope="col" class="text-end">Ações</th>
					</tr>
				</thead>
				<tbody>
					{currentPosts && currentPosts.map((e) => {

						return (
							<tr key={e.id}>
								<th scope="row">{e.estabelecimento_id}</th>
								<td className='fw-normal'>{e.cod}</td>
								<td className='fw-normal'>{e.nome}</td>
								<td className='fw-normal'>{e.email}</td>

								<td className="text-end">
									<div class="btn-group" role="group" aria-label="Basic outlined example">
										<button type="button" data-bs-toggle="modal" onClick={() => editItem(e.id)} data-bs-target={"#editUsuario-" + id} class="btn text-white rounded btn-sm btn-outline-primary btn-edigit m-1"><i class="bi bi-pencil-square"></i></button>
										<button type="button" onClick={() => deleteUsuario(e.id)} class="btn text-white rounded btn-sm btn-outline-primary btn-edigit m-1"> <i class="bi bi-x-lg"></i></button>
									</div>
								</td>

							</tr>
						)
					})
					}

				</tbody>
			</table>

			{currentPosts.length == 0 &&

				<div class="d-flex align-items-center alert alert-light fade show mt-2" role="alert">

					<div class="spinner-grow text-secondary" style={{ marginRight: '10px' }} role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					<p class="mb-0">Aguarde...</p>


				</div>
			}
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={usuarios.length}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
			/>

			<ModalEditUsuarios data_id={id} />

		</div>
	)

};

export default Tabelausuarios;