import { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import $ from 'jquery';
const ImagemProdutos = (data_id) => {
	var data = { data_id };
	var id = data.data_id;
	var idEdit = id.data_id;
	const id_estabelecimento = sessionStorage.getItem("estabelecimento_id");
	const [images, setImages] = useState([]);
	const [dataImagem, setDataImagem] = useState([]);
	const maxNumber = 69;
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		// console.log(imageList, addUpdateIndex);
		var { data_url, file } = imageList[0] ?? imageList;

		const formData = new FormData();
		formData.append("thumb_img", data_url);
		formData.append("id", idEdit);
	
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				var res = xhr.responseText;

				console.log(res);
			}
		}

		//fazer o envio do nosso request
		xhr.open("POST", 'http://10.10.10.6/api_comanda/?api=uploadImagem');
		xhr.send(formData);
		setImages(imageList);
	};

	return (
		<div class="modal fade" id={"imagemProduto-" + idEdit} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticeditProduto" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 className="">Imagens do produto - {idEdit} <i class="bi bi-image"></i></h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
					</div>

					<div class="modal-body ">

						<ImageUploading

							value={images}
							onChange={onChange}
							maxNumber={maxNumber}
							dataURLKey="data_url"
							acceptType={["jpg", "jpeg", "png", "gif"]}
						>
							{({
								imageList,
								onImageUpload,
								onImageRemoveAll,
								onImageUpdate,
								onImageRemove,
								isDragging,
								dragProps
							}) => (
								// write your building UI
								<div className="upload__image-wrapper">
									{imageList.map((image, index) => (
										<div key={index} className="image-item d-flex align-items-center flex-column p-3 mb-3 card">
											<img src={image.data_url} alt="" width="200" class="rounded" />
											<div className="image-item__btn-wrapper mr-4 mt-3">
												<button className="btn btn-sm btn-primary" onClick={() => onImageUpdate(index)}><i class="bi bi-arrow-repeat"></i></button>&nbsp;
												<button className="btn btn-sm btn-danger" onClick={() => onImageRemove(index)}><i class="bi bi-trash-fill"></i></button>
											</div>
										</div>
									))}
									<button className="btn btn-primary btn-edigit w-100"
										style={isDragging ? { color: "red" } : null}
										onClick={onImageUpload}
										{...dragProps}
									>
										<i class="bi bi-upload p-2"></i> Selecionar imagem
									</button>
								</div>

							)}
						</ImageUploading>


					</div>
				</div>
			</div>

		</div>

	)
}
export default ImagemProdutos