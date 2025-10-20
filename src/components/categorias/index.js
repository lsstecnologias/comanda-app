import { useEffect, useState } from "react";
import $ from 'jquery';
import TabelaCategoria from "../tabela_categoria";

const Categorias = () => {
    
    const [valorCateg, setCategorias] = useState();
    const [nvCateg, setNvCateg] = useState();
    const [listCateg, setListCateg] = useState(null);
    const [statusFormAddCateg, setStatusFormAddCateg] = useState("none");
    
    //HOOK MSG ERROS
    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';

    const addNvCategoria = (e) => {
        e.preventDefault();
        let categ_input = $("#addCategorias");
        let data_atual = new Date();
        let data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();

        const obj_categoria = { cod: "", nome: "", data_post: "" };

        if (obj_categoria.data_post == "" && obj_categoria.cod == "") {
            obj_categoria.data_post = data_post;
            obj_categoria.cod = Math.floor(Math.random() * (777 + 0)) - 1;
        }

        if (nvCateg !== undefined && nvCateg !== "") {
            categ_input.addClass("is-valid").removeClass("is-invalid");
            obj_categoria.nome = nvCateg;
        } else {
            categ_input.addClass("is-invalid").removeClass("is-valid");
            obj_categoria.nome = null;
        }

        const param_api_save_categoria = "?api=setCategoria";
        $.post(urlApi + nameApi + param_api_save_categoria, obj_categoria, (res, status) => {
            if (status === "success") {
                setStatusFormAddCateg("none");
                $("#addCategorias").val("");
                let categ_input = $("#addCategorias");
                categ_input.addClass("is-invalid").removeClass("is-valid");
                var btnAdicionar = $('#btnAdicionar')
                if (res == "null") {
                    setDisplayError("block");
                    setMsgError("Erro ao adicionar a categoria!")
                    btnAdicionar.attr({ "disabled": false });
                } else {
                    setDisplayError("none");
                    setMsgError(null)
                }
                if (res == 1) {


                    setDisplaySuccess("block");
                    setMsgSuccess("Nova categoria adicionada!");
                } else {
                    setDisplaySuccess("none");
                    setMsgSuccess(null);
                }
            } else {
                alert("Error: parametros API!")
            }

        })
    }
    const exibeFormAddCateg = (e) => {
        e.preventDefault();
        setStatusFormAddCateg("inline-flex");

    }
    return (
        <div class="container mt-4 categorias">
             <h4>Categorias</h4>
            <div class="container-fluid animate__animated  animate__fadeIn">
               
                <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                    <i class="bi bi-check-circle p-2"></i>
                    {msgSuccess !== null && msgSuccess}

                </div>
                <div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                    <i class="bi bi-exclamation-triangle p-2"></i>
                    {msgError !== null && msgError}

                </div>
                <button class="btn btn-secondary w-100 mt-3 " onClick={(e) => { exibeFormAddCateg(e) }} type="button">  <i class="bi bi-plus-circle-dotted fs-4"></i> Nova categoria</button>
                <div class="input-group animate__animated  animate__fadeIn mb-3 mt-4" style={{ display: statusFormAddCateg }}>
                    <button class="btn btn-primary " type="button" onClick={(e) => { addNvCategoria(e) }} ><i class="bi bi-plus-circle-fill"></i> Adicionar</button>
                    <input type="text" class="form-control " id="addCategorias" autocomplete="off" onChange={(e) => { setNvCateg(e.target.value) }} placeholder="Nome da categoria" aria-label="Categoria do produto" aria-describedby="button-addon2" />
                  
                </div>
                <TabelaCategoria />
            </div>
        </div>

    )

}

export default Categorias;