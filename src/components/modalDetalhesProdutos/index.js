import { useEffect, useState, useContext } from 'react';
import 'animate.css';
const $ = require("jquery");

const DetalhesProdutos = (data_id) => {
		const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO; 
	var data = { data_id };
	var id = data.data_id;
	var idEdit = id.data_id;
	sessionStorage.setItem('modal_notas', 'hide');

	
	const [dataProdutos, setDataProdutos] = useState([]);
	useEffect(() => {

		//REALIZA O REGISTRO COM O COD DO ESTABELECIMENTO
	const id_estabelecimento = sessionStorage.getItem("estabelecimento_id");
		if (id_estabelecimento !== 'null') {
			const param_api_list_produto = `/get/produtos/`;
			
			$.post(apiUrl + param_api_list_produto, { 'id': id_estabelecimento }, (res, status) => {
				if (status == 'success') {
					
					setDataProdutos(res);
					
					
				} else {
					alert("Error: parametros API!")

				}
			})
		} else {
			alert("Nenhum cliente estabelecimento");
			//Sair();
		}

	}, [setDataProdutos]);
	const data_filter = dataProdutos.filter(e => { return e.id === idEdit });

	return (
		<div class="modal fade" id={"detalhesProduto-" + idEdit} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticeditProduto" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="staticnvProduto"> Detalhes do item <i class="bi bi-card-checklist"></i></h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
					</div>

					<div class="modal-body">

						{data_filter && data_filter.map((e) => {

							return (
								<div key={e.id} class="container" >
									<strong>Cod.</strong>
									<div class="border p-2 lh-1">
										{e.cod_item}
									</div>
									<strong>Item</strong>
									<div class="border p-2 mt-2 lh-1">
										{e.item}
									</div>
									<strong>Descrição</strong>
									<div class="border p-2 mt-2 lh-1">
										{e.descricao}
									</div>
									<strong>Categoria</strong>
									<div class="border p-2 mt-2">
										{e.categoria}
									</div>
									<strong>Quantidade</strong>
									<div class="border p-2 mt-2 lh-1">
										{e.quantidade}
									</div>
									<strong>Preço</strong>
									<div class="border p-2 mt-2 lh-1">
										R$ {e.preco}
									</div>
								</div>

							)
						})}


					</div>


				</div>

			</div>
		</div>
	)
}
export default DetalhesProdutos;