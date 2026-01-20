import TabelaProduto from "../tabela_produto";
import Header from '../header';
import './style.css';

import { NumericFormat } from 'react-number-format';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context';
import axios from "axios";
import UploadImagens from "../upload_imagens";
const $ = require("jquery");

const Produto = () => {
	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');
	const { GetSession, sessao, Sair, status } = useContext(UserContext);

	const [valorPreco, setPreco] = useState();
	const [valorItem, setItem] = useState();
	const [valorDesc, setDesc] = useState();
	const [valorQt, setQuant] = useState();
	const [valorCateg, setCategorias] = useState();

	const [sessaoUser, setSessaoUser] = useState([]);
	const [listCateg, setListCateg] = useState(null);
	const [selectedFileItem, setSelectedFileItem] = useState(null);

	//HOOK MSG ERROS
	const [displayError, setDisplayError] = useState('none');
	const [displaySuccess, setDisplaySuccess] = useState('none');
	const [msgError, setMsgError] = useState(null);
	const [msgSuccess, setMsgSuccess] = useState(null);


	const urlApi = 'http://10.10.10.6/';
	const nameApi = 'api_comanda/';

	const [selectedFileUser, setSelectedFileUser] = useState(null);
	var data_atual = new Date();
	//var data_image_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();
	useEffect(() => {


		const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");

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


	}, [setListCateg, setSessaoUser]);

	/*
	
		const carregarImagens = () => {
	
			const param_api_save_img = "?api=setUploadFile";
			let inputFoto = $("#inputFoto");
	
	
			if (selectedFileUser !== null) {
	
				const formData = new FormData();
				formData.append("arquivo", selectedFileUser);
				formData.append("usuario", JSON.stringify(sessaoUser));
				formData.append("produto", JSON.stringify(listProduto))
				
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						var res = xhr.responseText;
						if (res) {
							inputFoto.addClass("is-valid").removeClass("is-invalid").val(null);
	
							let data = JSON.parse(res)
							if (data.status) {
								inputFoto.addClass("is-valid").removeClass("is-invalid").val(null);
	
	
							} else {
								inputFoto.addClass("is-invalid").removeClass("is-valid");
	
							}
							console.log(res)
	
						} else {
							inputFoto.addClass("is-invalid").removeClass("is-valid");
						}
					}
				}
	
				//fazer o envio do nosso request
				xhr.open("POST", urlApi + nameApi + param_api_save_img);
				xhr.send(formData);
				// inputFoto.addClass("is-valid").removeClass("is-invalid");
			} else {
				inputFoto.addClass("is-invalid").removeClass("is-valid");
	
			}
	
	
		}*/
	const addNovoProduto = (e) => {
		e.preventDefault();
		//imgItemInput	
		let categInput = $('#categItemInput');
		let nome = $("#nomeItemInput");
		let desc = $("#descItemInput");
		let qtd = $("#qtItemInput");
		let preco = $("#precoUnitInput");
		var cod = `${Math.floor(Math.random() * (777 + 0)) - 1}`;

		//REALIZA O REGISTRO COM O COD DO ESTABELECIMENTO
		const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");
		var objProduto = { cod_item: cod, estabelecimento_id: estabelecimento_id, item: "", desc: "", qtd: "", categoria_id: "", preco: "", data_post: "" };

		if (categInput.val()) {
			categInput.addClass("is-valid").removeClass("is-invalid");
			objProduto.categoria_id = categInput.val();
		} else {
			categInput.addClass("is-invalid").removeClass("is-valid");
			objProduto.categoria_id = null;
		}

		if (valorPreco !== undefined && valorPreco !== "") {
			preco.addClass("is-valid").removeClass("is-invalid");
			objProduto.preco = valorPreco;
		} else {
			preco.addClass("is-invalid").removeClass("is-valid");
			objProduto.preco = null;
		}

		if (valorItem !== undefined && valorItem !== "") {
			nome.addClass("is-valid").removeClass("is-invalid");
			objProduto.item = valorItem;

		} else {
			nome.addClass("is-invalid").removeClass("is-valid");
			objProduto.item = null;
		}

		if (valorDesc !== undefined && valorDesc !== "") {
			desc.addClass("is-valid").removeClass("is-invalid");
			objProduto.desc = valorDesc;

		} else {
			desc.addClass("is-invalid").removeClass("is-valid");
			objProduto.desc = null;
		}

		if (valorQt !== undefined && valorQt !== "") {
			qtd.addClass("is-valid").removeClass("is-invalid");
			objProduto.qtd = valorQt;

		} else {
			qtd.addClass("is-invalid").removeClass("is-valid");
			objProduto.qtd = null;
		}

		let data_atual = new Date();
		let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();
		if (objProduto.data_post == "") {
			objProduto.data_post = data_post;
		}


		//POSTA ITEM DO PRODUTO
		//VERIFICA SE EXISTE O CODIGO DO ESTABELECIMENTO PARA REALIZAR A POSTAGEM

		if (estabelecimento_id !== 'null') {
			// var imgInpt = $("#imgItemInput");
			/*const param_api_save_img = "?api=setUploadFileItem";
			
			if (selectedFileItem !== null) {

				const formData = new FormData();

				formData.append("arquivo", selectedFileItem);
				formData.append("usuario", JSON.stringify(sessao));
				formData.append("produto", JSON.stringify(objProduto));

				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						var res = xhr.responseText;

						if (res) {
							let data = JSON.parse(res)
							
							if (data.status) {
								imgInpt.addClass("is-valid").removeClass("is-invalid");
								setSelectedFileItem("")
							} else {
								imgInpt.addClass("is-invalid").removeClass("is-valid");

							}

						}
					}
				}
				xhr.open("POST", urlApi + nameApi + param_api_save_img);
				xhr.send(formData);
				imgInpt.addClass("is-valid").removeClass("is-invalid");

			}else{
				imgInpt.addClass("is-invalid").removeClass("is-valid");
			}*/
			//POST ITEM
			const param_api_save_produto = '?api=setProdutos';
			if(objProduto.item !== null  && objProduto.desc!== null  && objProduto.qtd !== null && objProduto.preco !== null  && objProduto.categoria_id !== null )
			$.post(urlApi + nameApi + param_api_save_produto, objProduto, (res, status) => {
				var btnAdicionar = $('#btnAdicionar');
				console.log(res);
				if (status == 'success') {
					var btnAdicionar = $('#btnAdicionar');
					
					if (res !== "1") {
						setDisplayError("block");
						setMsgError("Preencha os campos!");

						setDisplaySuccess("none");
						setMsgSuccess(null);
						btnAdicionar.attr({ "disabled": false });

					} else {
						setDisplaySuccess("block");
						setMsgSuccess("Novo item adicionado!");
						setDisplayError("none");
						setMsgError(null);
						btnAdicionar.attr({ "disabled": "disabled" });
					}

				} else {
					setDisplayError("block");
					setMsgError("Preencha os campos!");
					btnAdicionar.attr({ "disabled": false });

				}



			})
		} else {
			alert("Nenhum cliente estabelecimento");
			Sair();
		}


	}


	const fecharModal = () => {
		window.location.reload();
	}

	return (
		<div className="container-fluid mt-3 produtos">
			<div className="container p-0 animate__animated  animate__fadeIn">
				<div class="row d-flex align-items-center  justify-content-between">
					<div class="col-sm-5"><h2> Produtos <i class="bi bi-box-fill"></i></h2></div>
					<div class="col-sm-5 text-end">

						<button type="button" class="btn btn-sm btn-primary btn-edigit" data-bs-toggle="modal" data-bs-target="#nvProduto">
							Novo Produto <i class="bi bi-box-fill"></i>
						</button>
					</div>
				</div>

			</div>

			<div class="modal fade" id="nvProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticnvProduto" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-4" id="staticnvProduto">Novo Produto <i class="bi bi-box-fill"></i> </h1>
							<button type="button" onClick={() => { fecharModal() }} class="btn-sm btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
								<i class="bi bi-check-circle p-2 ml-0"></i>
								{msgSuccess !== null && msgSuccess}

							</div>
							<div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
								<i class="bi bi-exclamation-triangle p-2 pl-2"></i>
								{msgError !== null && msgError}

							</div>
							<div class="mb-3">
								<label for="nomeItemInput" class="form-label text-secondary fw-normal">Nome item</label>
								<input type="text" class="form-control text-secondary fw-normal " id="nomeItemInput" autocomplete="off" onChange={(e) => { setItem(e.target.value) }} placeholder="Nome item" />
							</div>
							<div class="mb-3">
								<label for="descItemInput" class="form-label text-secondary fw-normal">Descrição item</label>
								<input type="text" class="form-control text-secondary fw-normal" id="descItemInput" autocomplete="off" onChange={(e) => { setDesc(e.target.value) }} placeholder="Detalhes" />
							</div>
							<div class="mb-3" id="categorias">
								<label for="categItemInput" class="form-label text-secondary fw-normal">Categoria</label>
								<select id="categItemInput" onChange={(e) => { setCategorias(e.target.value) }} class="form-select text-secondary fw-normal">

									{listCateg && listCateg.map((e) => {
										return (<option key={e.id} value={e.cod}>{e.categoria}</option>)
									})}
									{listCateg == null ?? <option value={null} >Nenhuma categoria!</option>}

								</select>


							</div>

							<div class="mb-3">
								<label for="qtItemInput" class="form-label text-secondary fw-normal">Quantidade em estoque</label>
								<input type="number" min="1" class="form-control text-secondary fw-normal " id="qtItemInput" onChange={(e) => { setQuant(e.target.value) }} autocomplete="off" placeholder="0" />

							</div>

							<div class="mb-3">
								<label for="precoUnitInput" class="form-label text-secondary fw-normal">Preço unitário</label>

								<NumericFormat
									autoComplete="off"
									thousandSeparator=","
									class="form-control" id="precoUnitInput" placeholder="R$" onChange={(e) => { setPreco(e.target.value) }}
									decimalScale={2}
									fixedDecimalScale={true}
									onValueChange={(values) => {
										setPreco(values);
									}}
								/>
							</div>

						</div>
						<div class="modal-footer">

							<button type="button" onClick={(e) => { addNovoProduto(e) }} class="btn w-100 btn-primary text-ligth fw-normal btn-edigit" id="btnAdicionar" > <i class="bi bi-plus-circle"></i> Adicionar</button>
						</div>
					</div>
				</div>
			</div>
			<TabelaProduto />
		</div>
	)
}
export default Produto;