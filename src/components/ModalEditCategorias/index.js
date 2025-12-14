import { useState, useEffect } from 'react';
import md5 from 'md5';
import axios from 'axios';
import $ from 'jquery';
const ModalEditCategorias = (data_id) => {
    var data = { data_id };
    var id = data.data_id;
    var idEdit = id.data_id;


    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    const [dataFilter, setDataFilter] = useState([]);
    const [edit, setEdit] = useState([]);
    //INPUTS
    const [nvCateg, setNvCateg] = useState();

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const vlFilter = dataFilter.filter(e => { return e.id === idEdit });
   

    const editCategoria = (e) => {
        e.preventDefault();
        const cod_estabelecimento = sessionStorage.getItem("cod_estabelecimento");

        var inptUsuario = $('#inpt-categorias');
        var objCategoria = { id: idEdit, cod: "",cod_estabelecimento:cod_estabelecimento,  nome: "", data_post: "" };

         if (objCategoria.cod !== undefined && objCategoria.cod !== "") {
            
            objCategoria.cod =  vlFilter[0].cod;
             inptUsuario.addClass("is-invalid").removeClass("is-valid");
        } else {
           inptUsuario.addClass("is-invalid").removeClass("is-valid");
            objCategoria.nome = vlFilter[0].cod;
        }


        if (nvCateg !== undefined && nvCateg !== "") {
             inptUsuario.addClass("is-valid").removeClass("is-invalid");
            objCategoria.nome = nvCateg;
        } else {
           inptUsuario.addClass("is-invalid").removeClass("is-valid");
            objCategoria.nome = vlFilter[0].nome;
        }

        let data_atual = new Date();
        let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();

        if (objCategoria.data_post == "") {
            objCategoria.data_post = data_post;
        }
        if (objCategoria.cod == "") {
            objCategoria.cod = vlFilter[0].cod;
        }
       
        
        const param_api_update_categorias = "?api=updateCategorias";
        console.log(objCategoria)
        
        $.post(urlApi + nameApi + param_api_update_categorias, objCategoria, (res, status) => {

            var editarUsuario = $('#btnCategorias');
          
            if (status === "success") {
                if (res == 0 || res == null) {
                    setMsgError("Erro ao atualizar usuário!");
                    setDisplayError("block");
                    editarUsuario.attr({ "disabled": false });

                } else {
                    setDisplayError("none");
                    setMsgError(null);
                }
                if (res == 1) {
                    setDisplaySuccess("block");
                    setMsgSuccess("Usuário atualizado!");
                    editarUsuario.attr({ "disabled": "disabled" });

                } else {
                    setDisplaySuccess("none");
                    setMsgSuccess(null);
                }
            } else {
                alert("Error: parametros API")
            }

        })
    } 
    const fecharModal = () => {
        window.location.reload();
    }
        console.log(vlFilter)
    useEffect(() => {

          const dataUser = sessionStorage.getItem("cod_estabelecimento");
      var cod_estabelecimento = dataUser;
      if (cod_estabelecimento !== 'null') {
         const param_api_list_categ = `?api=getAllCategorias`;

         var obj = { 'id': cod_estabelecimento };

         $.post(urlApi + nameApi + param_api_list_categ, obj, (res, status) => {
          
            var dataArr =  JSON.parse(res);
            if (Array.isArray(dataArr) && dataArr.length == 0) {
               setDisplayError("block");
               setMsgError("Adicione categoria para o seu item!");
               
               /* 
                  setDisplaySuccess("none");
                  setMsgSuccess(null);
                  alert('Nenhuma categoria adicionada')
                  */
            
            } else {
              setDataFilter(dataArr);
               
            }            

         })
      } else {
         alert("Nenhum cliente estabelecimento");
         //Sair();
      }
    }, [setDataFilter, setEdit]);

    return (

        <div class="modal fade " id={"editCategoria-" + idEdit} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticeditCategoria" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5"><i class="bi bi-pencil-square"></i> Editar categoria(s)</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { fecharModal() }}></button>
                    </div>

                    <div class="modal-body">
                        <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                            <i class="bi bi-check-circle-fill p-2"></i>
                            {msgSuccess !== null && msgSuccess}
                            <button type="button" class="btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close" onClick={() => { fecharModal() }}></button>
                        </div>

                        <div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                            <i class="bi bi-exclamation-triangle-fill  p-2"></i>
                            {msgError !== null && msgError}
                            <button type="button" class="btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close" onClick={() => { fecharModal() }} ></button>
                        </div>


                        {vlFilter && vlFilter.map(e => {
                            return (
                                <div key={e.id}>
                                    <div class="input-group  mb-3 mt-2" style={{ display: 'inline-flex' }}>
                                        <button class="btn btn-outline-primary  animate__animated animate__fadeIn" id="btnCategorias" type="button" onClick={(e) => { editCategoria(e) }} ><i class="bi bi-pencil-square"></i> Editar</button>
                                        <input type="text" class="form-control" id="inpt-categorias" autocomplete="off" onChange={(e) => { setNvCateg(e.target.value) }} placeholder={e.nome} aria-describedby="button-addon2" />

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
export default ModalEditCategorias;