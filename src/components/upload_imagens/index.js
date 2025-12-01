import { useContext } from 'react';
import { UserContext } from '../context';
import { useEffect, useState } from 'react';


import ImageUploading from "react-images-uploading";
import $ from 'jquery';
import QRCode from "../qrcode";
const UploadImagens = () => {
    //PERIMITE NÃO EXIBIR MODAL DE NOTAS
    sessionStorage.setItem('modal_notas', 'hide');
    const [sessaoUser, setSessaoUser] = useState([]);
    const [selectedFileUser, setSelectedFileUser] = useState(null);
    const { sessao, status, redirect_login, Sair, thumb_logo } = useContext(UserContext);

    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    var data_atual = new Date();
    var data_image_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();
    useEffect(() => {
        if (status) {
            const { cod, id, cod_estabelecimento, nome, sobrenome, status, perfil, data_post, data_image_post } = sessao;
            setSessaoUser({ cod, id, cod_estabelecimento, nome, status, perfil, data_post, data_image_post });

        }
    }, [setSessaoUser])

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    const carregarImagens = () => {
        const param_api_save_img = "?api=setUploadFile";
        let inputFoto = $("#inputFoto");
        //if (Array.isArray(sessaoUser)) { Sair(); }

        if (selectedFileUser !== null) {

            const formData = new FormData();
            formData.append("arquivo", selectedFileUser);
            formData.append("usuario", JSON.stringify(sessao));

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var res = xhr.responseText;

                    if (res) {
                        let data = JSON.parse(res)

                        if (data.status) {
                            inputFoto.addClass("is-valid").removeClass("is-invalid").val(null);
                            setDisplayError('none');
                            setMsgError(null);
                            setDisplaySuccess('block');
                            setMsgSuccess(`O arquivo ${data.name_file}, foi enviado!`);
                            setSelectedFileUser(null)
                        } else {
                            inputFoto.addClass("is-invalid").removeClass("is-valid");
                            setDisplayError('block');
                            setMsgError(`Erro ao enviar o arquivo!`);

                            setDisplaySuccess('none');
                            setMsgSuccess(null);
                        }

                    }
                }
            }

            //fazer o envio do nosso request
            xhr.open("POST", urlApi + nameApi + param_api_save_img);
            xhr.send(formData);
            // inputFoto.addClass("is-valid").removeClass("is-invalid");
        } else {
            inputFoto.addClass("is-invalid").removeClass("is-valid");
            setDisplayError('block');
            setMsgError(`Selecione o arquivo!`);
            setDisplaySuccess('none');
            setMsgSuccess(null);
        }


    }
    return (
        <div class="container mt-4 comanda">
            <h4 className="m-2 mt-2 pb-2"><i class="bi bi-image"></i> Imagens</h4>
            <div className='container'>
                <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                    <i class="bi bi-check-circle p-2"></i>
                    {msgSuccess !== null && msgSuccess}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                    <i class="bi bi-exclamation-triangle p-2"></i>
                    {msgError !== null && msgError}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <input type="file" accept=".jpg, .jpeg, .png" class="form-control" id="inputFoto" name="img" onChange={(e) => { setSelectedFileUser(e.target.files[0]) }} placeholder="Another input placeholder" />

                <button type="button" class="btn w-100 btn-sm btn-primary mt-4" onClick={carregarImagens}> <i class="bi fs-5 bi-cloud-arrow-up"></i> Carregar imagem</button>
            </div>
        </div>
    )

    /* const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
   return (
        <div className="container">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg","jpeg","png","gif"]}
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
                        <button className="btn btn-primary"
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>
                        &nbsp;
                        <button className="btn btn-danger" onClick={onImageRemoveAll}>Remove all images</button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item m-3">
                                <img src={image.data_url} alt="" width="100" />
                                <div className="image-item__btn-wrapper mr-3 mt-3">
                                    <button className="btn btn-sm btn-primary" onClick={() => onImageUpdate(index)}>Update</button>&nbsp;
                                    <button className="btn btn-sm btn-danger" onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );*/
}
export default UploadImagens;