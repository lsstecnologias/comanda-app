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




		const dataUser = sessionStorage.getItem("cod_estabelecimento");
		var cod_estabelecimento = dataUser;
		if (cod_estabelecimento !== 'null') {
			const param_api_list_categ = `?api=getCategorias`;

			var obj = { 'id': cod_estabelecimento };

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
		if (status) {
			const { cod, id, cod_estabelecimento, nome, sobrenome, status, perfil, data_post, data_image_post } = sessao;
			setSessaoUser({ cod, id, cod_estabelecimento, nome, sobrenome, status, perfil, data_post, data_image_post });

		}



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

		let nome = $("#nomeItemInput");
		let desc = $("#descItemInput");
		let qtd = $("#qtItemInput");
		let preco = $("#precoUnitInput");
		var cod = Math.floor(Math.random() * (777 + 0)) - 1;

		var objProduto = { cod_item: cod, id_estabelecimento: "", item: "", desc: "", qtd: "", preco: "", data_post: "", categoria_id: "" };

		if (valorCateg !== undefined && valorCateg !== "") {
			preco.addClass("is-valid").removeClass("is-invalid");
			objProduto.categoria_id = valorCateg;
		} else {
			preco.addClass("is-invalid").removeClass("is-valid");
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

		//REALIZA O REGISTRO COM O COD DO ESTABELECIMENTO
		const dataUser = sessionStorage.getItem("cod_estabelecimento");
		var cod_estabelecimento = dataUser;

		if (cod_estabelecimento !== 'null') {
			var inputFoto = $("#inputFoto");
			const param_api_save_usuario = `?api=setProdutos`;
			objProduto.id_estabelecimento = cod_estabelecimento;
			const param_api_save_img = "?api=setUploadFileItem";
			/*POSTA IMAGEM */
			if (selectedFileItem !== null) {

				const formData = new FormData();
				
				formData.append("arquivo", selectedFileItem);
				formData.append("usuario", JSON.stringify(sessao));
				formData.append("produto", JSON.stringify(objProduto));

				
				console.log(selectedFileItem);
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						var res = xhr.responseText;
						console.log(res)
						if (res) {
							let data = JSON.parse(res)
							console.log(data)
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

			//POSTA DETALHES DO ITEM
			$.post(urlApi + nameApi + param_api_save_usuario, objProduto, (res, status) => {
				var btnAdicionar = $('#btnAdicionar');
				if (status == 'success') {
					var btnAdicionar = $('#btnAdicionar');
					//var data = JSON.parse(res);


					console.log(res == 'null')
					//setListProduto(arrProduto);

					if (res == 'null') {
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
	const carregarImagensItem = () => {
		const param_api_save_img = "?api=setUploadFileItem";
		//  let inputFoto = $("#inputFoto");
		// inputFoto.addClass("is-valid").removeClass("is-invalid").val(null);
		if (selectedFileItem !== null) {
			console.log(`${'nome'}` + '_' + selectedFileItem.name)
			console.log(selectedFileItem)
		}
	}

	const fecharModal = () => {
		window.location.reload();
	}

	return (
		<div className="container-fluid mt-3 produtos">
			<div className="container p-0 animate__animated  animate__fadeIn">
				<h4 className="mb-2 mt-2 pb-2 ">Produtos</h4>
				<button type="button" class="btn w-100 btn-primary" data-bs-toggle="modal" data-bs-target="#nvProduto">
					<i class="bi bi-plus-circle-dotted fs-4 "></i> <p>Novo Produto</p>
				</button>
			</div>

			<div class="modal fade" id="nvProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticnvProduto" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="staticnvProduto">Novo Produto</h1>
							<button type="button" onClick={() => { fecharModal() }} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
							<div class="mb-3">
								<label for="nomeItemInput" class="form-label">Nome item</label>
								<input type="text" class="form-control " id="nomeItemInput" autocomplete="off" onChange={(e) => { setItem(e.target.value) }} placeholder="Nome item" />
							</div>
							<div class="mb-3">
								<label for="descItemInput" class="form-label">Descrição item</label>
								<input type="text" class="form-control" id="descItemInput" autocomplete="off" onChange={(e) => { setDesc(e.target.value) }} placeholder="Detalhes" />
							</div>
							<div class="mb-3" id="categorias">
								<label for="categorias" class="form-label">Categoria</label>
								<select id="categorias" onChange={(e) => { setCategorias(e.target.value) }} class="form-select">
									<option >Selecione</option>
									{listCateg && listCateg.map((e) => {
										return (<option key={e.id} value={e.cod}>{e.nome}</option>)
									})}
									{listCateg == null ?? <option value={null} >Nenhuma categoria!</option>}

								</select>


							</div>
							<div class="mb-3">
								<input type="file" accept=".jpg, .jpeg, .png" class="form-control" id="inputFoto" name="img" onChange={(e) => { setSelectedFileItem(e.target.files[0]) }} placeholder="Another input placeholder" />

							</div>
							<div class="mb-3">
								<label for="qtItemInput" class="form-label">Quantidade</label>
								<input type="number" min="1" class="form-control" id="qtItemInput" onChange={(e) => { setQuant(e.target.value) }} autocomplete="off" placeholder="0" />

							</div>

							<div class="mb-3">
								<label for="precoUnitInput" class="form-label">Preço unitário</label>

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

							<button type="button" onClick={(e) => { addNovoProduto(e) }} class="btn w-100 btn-primary" id="btnAdicionar" > <i class="bi bi-plus-circle"></i> Adicionar</button>
						</div>
					</div>
				</div>
			</div>
			<TabelaProduto />
		</div>
	)
}
export default Produto;