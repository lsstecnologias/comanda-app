import { useEffect, useState, useContext } from "react";
import $ from 'jquery';
import TabelaCategoria from "../tabela_categoria";
import { UserContext } from '../context';
import 'animate.css';
const Categorias = () => {
    //PERIMITE NÃO EXIBIR MODAL DE NOTAS
    sessionStorage.setItem('modal_notas', 'hide');
    const { GetSession, sessao, Sair, status } = useContext(UserContext);

    const [valorCateg, setCategorias] = useState();
 
    //const [listCateg, setListCateg] = useState(null);
    const [statusFormAddCateg, setStatusFormAddCateg] = useState("none");

    //HOOK MSG ERROS
    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const fecharModal = () => {
        window.location.reload();
    }

    const addNvCategoria = (e) => {
        e.preventDefault();
        let categ_input = $("#inpt_categoria");
        let data_atual = new Date();
        let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();

        const obj_categoria = { id_estabelecimento: "", cod: "", nome: "", data_post: "" };
        //Valida hora-data e cod da categoria do item
        if (obj_categoria.data_post == "" && obj_categoria.cod == "") {
            obj_categoria.data_post = data_post;
            obj_categoria.cod = Math.floor(Math.random() * (777 + 0)) - 1;
        }

        //Valida os campos
        if (categ_input.val()) {
           categ_input.addClass("is-valid").removeClass("is-invalid");
            obj_categoria.nome = categ_input.val();
        } else {

            setDisplayError("block");
            setMsgError("Preencha os campo!");

            categ_input.addClass("is-invalid").removeClass("is-valid");
            obj_categoria.nome = null;

        }

      /*  if (categ_input.val()) {
            setDisplaySuccess("block");
            setMsgSuccess("Nova categoria adicionada!");
            window.location.reload();
            setDisplayError("none");
            setMsgError(null);

            categ_input.addClass("is-valid").removeClass("is-invalid");
        } else {
            setDisplayError("block");
            setMsgError("Preencha os campo!");

            setDisplaySuccess("none");
            setMsgSuccess(null);
             
            categ_input.addClass("is-invalid").removeClass("is-valid");
        }*/

        const dataUser = sessionStorage.getItem("cod_estabelecimento");
        var cod_estabelecimento = dataUser;
         if(categ_input.val()){  
            if (cod_estabelecimento !== 'null') {
                const param_api_save_categoria = "?api=setCategorias";
                obj_categoria.id_estabelecimento = cod_estabelecimento;
                
                $.post(urlApi + nameApi + param_api_save_categoria, obj_categoria, (res, status) => {
                    window.location.reload()
                    /*
                    if (status == 'success') {
                        setStatusFormAddCateg("none");
                        $("#addCategorias").val("");
                    

                    } else {
                        setDisplayError("block");
                        setMsgError("Erro: !");
                        setDisplaySuccess("none");
                        setMsgSuccess(null);

                    }*/

                })
            } else {
                alert("Nenhum cliente estabelecimento");
                Sair();
            }
        }


    }


    return (
        <div class="container-fluid mt-4 categorias">
            <div class="container  p-0 ">
                <h4 className="mb-2 mt-2 pb-2 ">Categorias</h4>
                <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                    <i class="bi bi-check-circle-fill p-2"></i>
                    {msgSuccess !== null && msgSuccess}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => { fecharModal() }}></button>
                </div>

                <div class="input-group  mb-3 mt-2" style={{ display: 'inline-flex' }}>
                    <button class="btn btn-primary btn-sm " type="button" onClick={(e) => { addNvCategoria(e) }} > Adicionar <i class="bi bi-plus-circle-dotted "></i> </button>
                    <input type="text" class="form-control animate__animated  animate__fadeIn " id="inpt_categoria" autocomplete="off"  placeholder="Nome da categoria" aria-label="Categoria do produto" aria-describedby="button-addon2" />
                    
                </div>
                <TabelaCategoria />
            </div>
        </div>

    )
}


export default Categorias;