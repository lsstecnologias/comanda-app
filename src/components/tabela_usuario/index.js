import { data, error } from "jquery";
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../context';
import ListPagina from "../../ListPagina";
import ModalEditUsuarios from "../modalEditUsuarios";
import $ from 'jquery';


import Pagination from "../../ListPagina";


const Tabelausuarios = () => {
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');
	const urlApi = 'http://10.10.10.6/';
	const nameApi = 'api_comanda/';
	//CONTINUA AQUI....
	const { sessao, status, redirect_login, Sair } = useContext(UserContext);

	var [usuarios, setUsuarios] = useState([]);

	const [codUser, setCodUser] = useState("");
	const [id, setId] = useState(null);

	//PAGINACAO
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(4);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = usuarios.slice(indexOfFirstPost, indexOfLastPost);
	<ListPagina />

	const editItem = (id) => { setId(id); }
	const paramApi_delete_item = '?api=deleteUsuarios';

	const deleteUsuario = (id) => {
		if (id !== null || id !== undefined) {
			let objId = { "id": id };
			$.post(urlApi + nameApi + paramApi_delete_item, objId, () => { window.location.reload() })
		}
	}

	useEffect(() => {

		const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");


		if (estabelecimento_id !== 'null') {
			const param_api_list_usuario = `?api=getUsuarios`;
			var obj = { 'id': estabelecimento_id };

			$.post(urlApi + nameApi + param_api_list_usuario, obj, (res, status) => {
				if (status == 'success') {
					var data = JSON.parse(res);
					setUsuarios(data);
				}


			})
		} else {
			alert("Nenhum cliente estabelecimento");
			Sair();
		}




	}, [setCodUser, setUsuarios]);

	return (
		<div class="table-responsive ">

			<table class="table caption-top animate__animated animate__fadeIn ">
				<caption>Lista usuários do sistema.</caption>
				<thead>
					<tr>

						<th scope="col">Cod. </th>
						<th scope="col">Nome</th>
						<th scope="col">Email</th>
						<th scope="col">Perfil</th>
						<th scope="col" class="text-end">Ações</th>
					</tr>
				</thead>
				<tbody>
					{currentPosts && currentPosts.map((e) => {

						return (
							<tr key={e.id}>
								<th scope="row">{e.cod}</th>
								<td className='fw-light'>{e.nome}</td>
								<td className='fw-light'>{e.email}</td>
								<td className='fw-light'>{e.perfil == 's' ? 'super' : 'admin'}</td>
								<td className="text-end">
									<div class="btn-group" role="group" aria-label="Basic outlined example">
										<button type="button" data-bs-toggle="modal" onClick={() => editItem(e.id)} data-bs-target={"#editUsuario-" + id} class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil-square"></i></button>
										<button type="button" onClick={() => deleteUsuario(e.id)} class="btn  btn-sm  btn-outline-primary"> <i class="bi bi-x-lg"></i></button>
									</div>
								</td>

							</tr>
						)
					})
					}

				</tbody>
			</table>

			{currentPosts.length == 0 &&
				<div class="alert alert-light" role="alert">
					<div class="spinner-border" role="status">
						<span class="visually-hidden">Loading...</span>

					</div>

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