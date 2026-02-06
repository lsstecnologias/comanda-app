import { useEffect, useState, useContext } from "react";
import $ from 'jquery';
import TabelaCategoria from "../tabela_categoria";
import { UserContext } from '../context';
import 'animate.css';
const Categorias = () => {
    //PERIMITE NÃO EXIBIR MODAL DE NOTAS
    sessionStorage.setItem('modal_notas', 'hide');
    const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO;
    const { GetSession, sessao, Sair, status } = useContext(UserContext);
    const [acao, setAcao] = useState("");

    const [resultBuscar, setResultBuscar] = useState([]);

    const [dataFind, setDataFind] = useState("");
    //const [listCateg, setListCateg] = useState(null);
    const [statusFormAddCateg, setStatusFormAddCateg] = useState("none");

    //HOOK MSG ERROS
    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");

    const fecharModal = () => {
        window.location.reload();
    }
    const buscarCategoria = (e) => {
        e.preventDefault();
        let categ_input = $("#inpt_acao");

        if (categ_input.val()) {
            $.post(apiUrl + '?api=findCategorias', { estabelecimento_id: estabelecimento_id, buscar: categ_input.val() }).done((res) => {
                console.log(res)
                if (res !== "false") {
                    var data = JSON.parse(res);

                    var result = data.find((element) => element);

                    setResultBuscar(data)
                    setDataFind(result.categoria)
                    categ_input.addClass('is-valid').removeClass('is-invalid')

                } else {
                    categ_input.addClass('is-invalid').removeClass('is-valid')
                    setDataFind('Não encontrado!')
                }
            })

        } else {
            categ_input.addClass('is-invalid').removeClass('is-valid')
            return
        }
    }
    const addNvCategoria = (e) => {

        e.preventDefault();
        let categ_input = $("#inpt_acao");
        let data_atual = new Date();
        let data_post = data_atual.toLocaleTimeString() + " - " + data_atual.toLocaleDateString().toString();

        const obj_categoria = { estabelecimento_id: "", cod: "", categoria: "", data_post: "" };
        //Valida hora-data e cod da categoria do item
        if (obj_categoria.data_post == "" && obj_categoria.cod == "") {
            obj_categoria.data_post = data_post;
            obj_categoria.cod = Math.floor(Math.random() * (777 + 0)) - 1;
        }

        //Valida os campos
        if (categ_input.val()) {
            categ_input.addClass("is-valid").removeClass("is-invalid");
            obj_categoria.categoria = categ_input.val();

        } else {
            setDisplayError("block");
            setMsgError("Preencha os campo!");
            categ_input.addClass("is-invalid").removeClass("is-valid");
            obj_categoria.categoria = null;

        }

        /*if (categ_input.val()) {
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

        const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");

        if (categ_input.val() && acao === 'text') {
            if (estabelecimento_id !== 'null') {
                const param_api_save_categoria = "/api/setCategorias";
                obj_categoria.estabelecimento_id = estabelecimento_id;
                $.post(apiUrl + param_api_save_categoria, obj_categoria, (res, status) => {
                    window.location.reload()

                    if (status == 'success') {
                        setStatusFormAddCateg("none");
                        $("#addCategorias").val("");

                    } else {
                        setDisplayError("block");
                        setMsgError("Erro: !");
                        setDisplaySuccess("none");
                        setMsgSuccess(null);

                    }

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
                <h4 className="mb-4 mt-2 pb-2 ">Categorias <i class="bi bi-box-fill"></i></h4>
                <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                    {msgSuccess !== null && msgSuccess}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => { fecharModal() }}></button>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="input-group">
                            <span class="input-group-text btn-edigit-secondary text-white" for="basic-addon1"><i class="bi bi-caret-down-fill fs-6"></i> Acão </span>
                            <select id="basic-addon1" class="form-select" onChange={(event) => { setAcao(event.target.value) }}>
                                <option value="search">BUSCAR </option>
                                <option value="text">ADICIONAR </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="input-group">

                            <input type={acao === 'text' ? 'text' : 'search'} list="lista-categorias" value={dataFind} onChange={(event) => { setDataFind(event.target.value) }} class="form-control animate__animated  animate__fadeIn " id="inpt_acao" autocomplete="off" placeholder={acao === 'text' ? 'Nova categoria' : 'Buscar'} aria-describedby="button-addon2" />
                            <button class="btn btn-primary btn-sm btn-edigit " onClick={(e) => { acao === 'text' ? addNvCategoria(e) : buscarCategoria(e) }} type="button" > {acao === 'text' ? <i class="bi bi-plus-circle"></i> : <i class="bi bi-search"></i>}  </button>
                            <datalist id="lista-categorias">
                                {resultBuscar.map((element) => { return <option value={element.categoria}></option> })}
                            </datalist>

                        </div>
                    </div>

                </div>


            </div>
            <div class="container p-0">
                <TabelaCategoria />
            </div>
        </div>

    )
}


export default Categorias;