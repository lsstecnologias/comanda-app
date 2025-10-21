
import { useContext } from 'react';
import { UserContext } from '../../components/context';
import { useEffect, useState } from 'react';
import ImageUploading from "react-images-uploading";
import $ from 'jquery';
import QRCode from "../qrcode";
const Imagens = () => {
    const [sessaoUser ,setSessaoUser] = useState([]);
    const [selectedFileUser, setSelectedFileUser] = useState(null);
    const { sessao,status,redirect_login } = useContext(UserContext);
    
    var data_atual = new Date();
    var data_image_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();
    useEffect(()=>{
       if(status){
          const {cod,id,nome,status,data_post} = sessao ?? redirect_login();
          setSessaoUser({cod,id,nome,status,data_post,data_image_post}); 

       }else{
          redirect_login();
       }
    },[setSessaoUser])
   
    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    const carregarImagens = () => {
        const paramApi_save_img = "?api=setUploadFile";
        let inputFoto = $("#inputFoto");
        console.log(sessaoUser)
        //parei aqui
        if (selectedFileUser !== null) {
            var formData = new FormData();
            formData.append("arquivo", selectedFileUser);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var resposta = xhr.responseText;
                    if(resposta){
                        inputFoto.addClass("is-valid").removeClass("is-invalid").val(null);
                    
                    }
                }
            }

            //fazer o envio do nosso request
            xhr.open("POST", urlApi + nameApi + paramApi_save_img);
            xhr.send(formData);
            inputFoto.addClass("is-valid").removeClass("is-invalid");
        }else{
            inputFoto.addClass("is-invalid").removeClass("is-valid");
        }


    }
    return (
        <div class="container mb-3 mt-4 imagem">
            <h4 className="mb-2 mt-2">Logo <i class="bi bi-images"></i></h4>
            <input type="file" accept=".jpg, .jpeg, .png" class="form-control" id="inputFoto" name="img" onChange={(e) => { setSelectedFileUser(e.target.files[0]) }} placeholder="Another input placeholder" />
           
           <button type="button" class="btn w-100 btn-sm btn-primary mt-4" onClick={carregarImagens}> <i class="bi fs-5 bi-cloud-arrow-up"></i> Carregar imagem</button>
     
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
export default Imagens;