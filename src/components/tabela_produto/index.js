 
import 'animate.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import ModalEditProdutos from '../ModalEditProdutos';
import DetalhesProdutos from '../modalDetalhesProdutos';
import ListPagina from "../../ListPagina";
import Pagination from "../../ListPagina";
import { UserContext } from '../context';
import ImagemProdutos from '../modalImagemProdutos';
import 'animate.css';
const $ = require("jquery");

const TabelaProduto = () => {
	const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO; 
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');
	const { GetSession, sessao, Sair, status } = useContext(UserContext);

	const [dataProdutos, setDataProdutos] = useState([]);
	const [id, setId] = useState();

	//HOOK MSG ERROS
	const [displayError, setDisplayError] = useState('none');
	const [displaySuccess, setDisplaySuccess] = useState('none');
	const [msgError, setMsgError] = useState(null);
	const [msgSuccess, setMsgSuccess] = useState(null);

	//PAGINACAO
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = dataProdutos.slice(indexOfFirstPost, indexOfLastPost);
	<ListPagina />


	const deleteItem = (id) => {
		/* if (id !== null || id !== undefined) {
		 const paramApi_delete_item = '?api=deleteItem';
			  let objId = { "id": id };
			  $.post(urlApi + nameApi + paramApi_delete_item, objId, () => { window.location.reload() })
		 }*/
		setId(id)
	}
	const editItem = (id) => { setId(id); }

	useEffect(() => {

		//REALIZA O REGISTRO COM O COD DO ESTABELECIMENTO
		const id_estabelecimento = sessionStorage.getItem("estabelecimento_id");
		if (id_estabelecimento !== 'null') {
			const param_api_list_produto = `?api=getProdutos`;
			var obj = { 'id': id_estabelecimento };
			$.post(apiUrl + param_api_list_produto, obj, (res, status) => {
				if (status == 'success') {
					var data = JSON.parse(res);
					setDataProdutos(data);
					
					
				} else {
					alert("Error: parametros API!")

				}
			})
		} else {
			alert("Nenhum cliente estabelecimento");
			Sair();
		}

	}, [setDataProdutos]);

	return (
		<div class="container-fluid  mt-3 ">
			<div class='container p-0  animate__animated  animate_fadeIn table-responsive'>
				<table class="table caption-top  animate__animated  animate_fadeIn">		
					<thead>
						<tr>
							<th scope="col" className='fw-bold'> <i class="bi bi-plus"></i>Detalhes</th>
							<th scope="col" className='fw-bold'>Produto - Item</th>
							<th scope="col" className='fw-bold'>Thumb</th>							
							<th class="text-end" scope="col">Ações</th>
						</tr>
					</thead>
					<tbody>
						{/*RETORNAR COD ESTABELECIMENTO */}
						{currentPosts && currentPosts.map((val) => {

							return (
								<tr key={val.id}>

									<td className='fw-light pt-4 '><button type="button" onClick={() => editItem(val.id)} data-bs-target={"#detalhesProduto-" + id} data-bs-toggle="modal" class="btn btn-sm btn-edigit-secondary"><i class="bi bi-card-checklist text-white"></i> </button></td>
									<td className='fw-normal lh-1 pt-4 m-0'>{val.item}</td>
									<td className='fw-light'>{val.thumb_img ? <img class="card p-1" src={val.thumb_img} width={50} height={50} />: <img class="card p-1" src="https://placehold.co/50x50" />}	</td>
			
									<td className='text-end pt-4'>
										{/* <button data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editProduto-" + id} class="btn btn-sm btn-outline-secondary bi bi-pencil-square m-2"></button>
                                        <button onClick={() => deleteItem(val.id)} class="btn btn-sm btn-outline-secondary bi bi-x-lg"></button> */}

										<div class="btn-group" role="group" aria-label="Basic outlined example">
											<button type="button"  data-bs-toggle="modal"   onClick={() => editItem(val.id)} data-bs-target={"#imagemProduto-" + id}  class="btn text-white rounded btn-sm btn-outline-primary btn-edigit m-1"><i class="bi bi-images"></i></button>
											<button type="button" data-bs-toggle="modal" onClick={() => editItem(val.id)} data-bs-target={"#editProduto-" + id} class="btn text-white rounded btn-sm btn-outline-primary btn-edigit m-1"><i class="bi bi-pencil-square"></i></button>
											<button type="button" data-bs-toggle="modal" onClick={() => deleteItem(val.id)} data-bs-target={"#deleteProduto-" + id} class="btn text-white rounded btn-sm  btn-outline-primary btn-edigit m-1 "> <i class="bi bi-x-lg"></i></button>

										</div>
									</td>
								</tr>
							)
						})}

					</tbody>
				</table>
				{dataProdutos.length == 0 &&
					<div class="d-flex align-items-center alert alert-light fade show" style={{ display: displayError }} role="alert">
						<div class="spinner-grow text-secondary" style={{ marginRight: '10px' }} role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
						<p className='mt-3'>Adicione um novo item a sua lista!</p>
						{/*msgError !== null && msgError*/}
					</div>
				}

				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={dataProdutos.length}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
				/>

			</div>
			<DetalhesProdutos data_id={id}/>
			<ModalEditProdutos data_id={id} />
			<ImagemProdutos data_id={id}/>
		</div>

	)

}
export default TabelaProduto;