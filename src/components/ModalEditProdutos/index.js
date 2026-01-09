import { useCallback, useEffect, useState, useContext } from 'react';
import { NumericFormat } from 'react-number-format';
import axios from "axios";
import { UserContext } from '../context';
const $ = require("jquery");

const ModalEditProdutos = (data_id) => {

	var data = { data_id };
	var id = data.data_id;
	var idEdit = id.data_id;

	const { GetSession, sessao, Sair, status } = useContext(UserContext);
	const [valorPreco, setPreco] = useState();
	const [valorItem, setItem] = useState();
	const [valorDesc, setDesc] = useState();
	const [valorQt, setQuant] = useState();
	const [valorCateg, setCategorias] = useState();
	const [listCateg, setListCateg] = useState([]);
	const [objProduto, setObjProduto] = useState([]);


	//HOOK MSG ERROS
	const [displayError, setDisplayError] = useState('none');
	const [displaySuccess, setDisplaySuccess] = useState('none');
	const [msgError, setMsgError] = useState(null);
	const [msgSuccess, setMsgSuccess] = useState(null);
	const [selectedFileItem, setSelectedFileItem] = useState(null);
	const [dataItem, setDataItem] = useState([]);
	const [editProduto, setEditProduto] = useState([]);


	const fecharModal = () => {
		window.location.reload();
	}

	const urlApi = 'http://10.10.10.6/';
	const nameApi = 'api_comanda/';

	const data_filter = dataItem.filter(e => { return e.id == idEdit });



	const editNovoProduto = (e) => {
		e.preventDefault();
		let nome = $("#nomeItemInputEdit");
		let desc = $("#descItemInputEdit");
		let qtd = $("#qtItemInputEdit");
		let preco = $("#precoUnitInputEdit");
		let categ = $("#categItemInputEdit");
		const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");

		var obj_produto = { id: idEdit, estabelecimento_id: "", desc: "", id_categoria: "", qtd: "", preco: "", data_post: "" };


		if (estabelecimento_id !== undefined && estabelecimento_id !== "") {

			obj_produto.estabelecimento_id = estabelecimento_id;
		} else {
			Sair();
			obj_produto.estabelecimento_id = null;
		}

		if (valorCateg !== undefined && valorCateg !== "") {
			categ.addClass("is-valid").removeClass("is-invalid");
			obj_produto.id_categoria = valorCateg;
		} else {
			categ.addClass("is-invalid").removeClass("is-valid");
			obj_produto.id_categoria = data_filter[0].cod;
		}

		if (valorPreco !== undefined && valorPreco !== "") {
			preco.addClass("is-valid").removeClass("is-invalid");
			obj_produto.preco = valorPreco;
		} else {
			preco.addClass("is-invalid").removeClass("is-valid");
			obj_produto.preco = data_filter[0].preco;
		}

		if (valorItem !== undefined && valorItem !== "") {
			nome.addClass("is-valid").removeClass("is-invalid");
			obj_produto.item = valorItem;

		} else {
			nome.addClass("is-invalid").removeClass("is-valid");
			obj_produto.item = data_filter[0].item;
		}

		if (valorDesc !== undefined && valorDesc !== "") {
			desc.addClass("is-valid").removeClass("is-invalid");
			obj_produto.desc = valorDesc;
		} else {
			desc.addClass("is-invalid").removeClass("is-valid");
			obj_produto.desc = data_filter[0].descricao;
		}

		if (valorQt !== undefined && valorQt !== "") {
			qtd.addClass("is-valid").removeClass("is-invalid");
			obj_produto.qtd = valorQt;
		} else {
			qtd.addClass("is-invalid").removeClass("is-valid");
			obj_produto.qtd = data_filter[0].quantidade;
		}

		let data_atual = new Date();
		let data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();
		if (obj_produto.data_post == "") {
			obj_produto.data_post = data_post;
		}
		if (estabelecimento_id !== 'null') {

			const param_api_save_usuario = `?api=setProdutos`;
			objProduto.estabelecimento_id = estabelecimento_id;
			const param_api_save_img = "?api=setUploadFileItem";
			/*POSTA IMAGEM
			 
			if (selectedFileItem !== null) {

				 const formData = new FormData();
				 console.log(objProduto)
				 formData.append("arquivo", selectedFileItem);
				 formData.append("usuario", JSON.stringify(sessao));
				 formData.append("produto", JSON.stringify(objProduto));

				 var xhr = new XMLHttpRequest();
				 xhr.onreadystatechange = function () {
					  if (xhr.readyState == 4) {
							var res = xhr.responseText;
							var inputFoto = $("#imgItemInputEdit");

							if (res) {
								 let data = JSON.parse(res)

								 if (data.status) {
									  inputFoto.addClass("is-valid").removeClass("is-invalid");
									  setSelectedFileItem("")
								 } else {
									  inputFoto.addClass("is-invalid").removeClass("is-valid");

								 }

							}
					  }
				 }
				 xhr.open("POST", urlApi + nameApi + param_api_save_img);
				 xhr.send(formData);


			}
			*/


		} else {
			alert("Nenhum cliente estabelecimento");
			Sair();
		}

		const param_api_edit_produto = "?api=updateItem";
		$.post(urlApi + nameApi + param_api_edit_produto, obj_produto, (res, status) => {
			console.log(res)
			var editarProduto = $('#btnEditarProduto');
			if (status == "success") {

				if (res == 0 || res === null) {
					setDisplayError("block");
					setMsgError("Erro ao atualizar o item!");
					editarProduto.attr({ "disabled": false });

				} else {
					setDisplayError("none");
					setMsgError(null);
				}

				if (res == 1) {
					setDisplaySuccess("block");
					setMsgSuccess("O item foi atualizado!");
					editarProduto.attr({ "disabled": "disabled" });

				} else {
					setDisplaySuccess("none");
					setMsgSuccess(null);
				}

			} else {
				alert("Error: parametros API");
			}

		})

	}

	useEffect(() => {
		//FAZ A REQUISICAO PARA MOSTRAR OS DADOS QUE VAI SER EDITADO NOS INPUTS

		const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");
		//FUNCAO QUE LISTA PRODUTOS
		const listarProdutos = (estabelecimento_id) => {
			if (estabelecimento_id !== 'null') {
				const param_api_list_produto = `?api=getProdutos`;
				var obj = { 'id': estabelecimento_id };
				$.post(urlApi + nameApi + param_api_list_produto, obj, (res, status) => {
					if (status == 'success') {
						var data = JSON.parse(res);
						setDataItem(data);

					} else {
						alert("Error: parametros API!")
					}

				})
			} else {
				alert("Nenhum cliente estabelecimento");
				Sair();
			}

		}
		//FUNCAO QUE LISTA CATEGORIAS
		listarProdutos(estabelecimento_id)

		const listarCategorias = (estabelecimento_id) => {
			if (estabelecimento_id !== 'null') {
				const param_api_list_categ = `?api=getAllCategorias`;
				var obj = { 'id': estabelecimento_id };
				$.post(urlApi + nameApi + param_api_list_categ, obj, (res, status) => {
					var dataArr = JSON.parse(res);
					if (Array.isArray(dataArr) && dataArr.length > 0) {
						setListCateg(dataArr);
					} else {
						setListCateg(null);
					}
				})

			} else {
				alert("Nenhum cliente estabelecimento");
				Sair();
			}
		}
		listarCategorias(estabelecimento_id)


	}, [setEditProduto, setListCateg, setDataItem]);

	return (
		<div class="modal fade" id={"editProduto-" + idEdit} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticeditProduto" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="staticnvProduto"><i class="bi bi-pencil-square"></i> Editar Produto N {idEdit}</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { fecharModal() }}></button>
					</div>
					<div class="m-3 alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
						<i class="bi bi-check-circle p-2"></i>
						{msgSuccess !== null && msgSuccess}

					</div>
					<div class="m-3 alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
						<i class="bi bi-exclamation-triangle p-2"></i>
						{msgError !== null && msgError}

					</div>
					<div class="modal-body">

						{data_filter && data_filter.map((e) => {
							console.log(e)
							return (
								<div key={e.id}>

									<div class="mb-3">
										<label for="nomeItemInput" class="form-label  text-secondary fw-normal">Nome item</label>
										<input type="text" class="form-control text-secondary fw-normal" id="nomeItemInputEdit" autocomplete="off" onChange={(e) => { setItem(e.target.value) }} placeholder={e.item} />
									</div>
									<div class="mb-3">
										<label for="descItemInput" class="form-label  text-secondary fw-normal">Descrição item</label>
										<input type="text" class="form-control text-secondary fw-normal" id="descItemInputEdit" autocomplete="off" onChange={(e) => { setDesc(e.target.value) }} placeholder={e.descricao} />
									</div>
									<label for="descItemInput" class="form-label  text-secondary fw-normal"> Categorias</label>
									<div class=" mb-3" >

										{
											<select id="categItemInputEdit" onChange={(e) => { setCategorias(e.target.value) }} class="form-control">

												<option value={e.cod} selected>{e.categoria}</option>
												{
													listCateg && listCateg.map((e) => {
														return (<option class="form-control text-secondary fw-normal" key={e.id} value={e.cod}>{e.categoria}</option>)
													})
												}
												{listCateg == null ?? <option value={null} >Nenhuma categoria!</option>}
											</select>
										}


									</div>

									<div class="mb-3">
										<label for="qtItemInput" class="form-label  text-secondary fw-normal">Quantidade</label>
										<input type="number" min="1" class="form-control text-secondary fw-normal" id="qtItemInputEdit" autocomplete="off" onChange={(e) => { setQuant(e.target.value); }} placeholder={e.quantidade} />
									</div>
									<div class="mb-3">
										<label for="precoUnitInput" class="form-label  text-secondary fw-normal">Preço unitário</label>

										<NumericFormat
											autoComplete="off"
											thousandSeparator=","
											class="form-control  text-secondary fw-normal " id="precoUnitInputEdit" placeholder={"R$ " + e.preco} onChange={(e) => { setPreco(e.target.value) }}
											decimalScale={2}
											fixedDecimalScale={true}
											onValueChange={(values) => {
												setPreco(values);
											}}
										/>
									</div>


								</div>

							)
						})}


					</div>

					<div class="modal-footer">

						<button type="button" onClick={(e) => { editNovoProduto(e) }} class="btn w-100 btn-primary fw-normal" id="btnEditarProduto"> <i class="bi bi-pencil-square"></i> Editar</button>
					</div>
				</div>

			</div>
		</div>

	)

}
export default ModalEditProdutos;