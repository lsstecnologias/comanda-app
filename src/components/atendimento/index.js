
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './style.css';
import { useCallback, useContext } from 'react';
import { UserContext } from '../context';
import { useEffect, useState, useMemo } from 'react';
import 'jquery-mask-plugin';
import $ from 'jquery';

const Atendimento = () => {
     const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO;
  const { sessao, status, redirect_login, Sair } = useContext(UserContext);
  //PERIMITE NÃO EXIBIR MODAL DE NOTAS
  sessionStorage.setItem('modal_notas', 'hide');

  const [clientes, setClientes] = useState([]);
  const [buscarCliente, setBuscarCliente] = useState("");
  const [codCliente, setCodCliente] = useState("");
  const [messagem, setMessagem] = useState("");

  const [displayError, setDisplayError] = useState('none');
  const [displaySuccess, setDisplaySuccess] = useState('none');
  const [msgError, setMsgError] = useState(null);
  const [msgSuccess, setMsgSuccess] = useState(null);
  const [statusAtendimento, setStatusAtendimento] = useState(null);
  const [statusPosAtendimento, setPosStatusAtendimento] = useState();

  const [datacep, setDataCep] = useState("");

  const param_api_get_clientes = "?api=getClientes";
  const estabelecimento_id = sessionStorage.getItem("estabelecimento_id");

  const validarCep = () => {
    let data_cep = $('#cep');
    let data_endereco = $('#data_endereco');
    data_cep.mask('00000000');

    if (datacep) {
      $.get("https://viacep.com.br/ws/" + datacep + "/json/", async (res, status) => {

        if (status == 'success') {
          if (res) {

            let val = res;
            let data_str = `${await val.logradouro} - ${await val.localidade} ${await val.uf} - ${await val.regiao} ${await val.bairro} - ${await val.cep}`;
            data_endereco.val(data_str)
            data_cep.addClass("is-valid").removeClass("is-invalid");
            data_endereco.addClass("is-valid").removeClass("is-invalid");



          }
          if (res.erro) {
            data_cep.addClass("is-invalid").removeClass("is-valid");
            data_endereco.addClass("is-invalid").removeClass("is-valid");
            data_endereco.val(null);
          }



        } else {
          data_cep.addClass("is-invalid").removeClass("is-valid");
          data_endereco.addClass("is-invalid").removeClass("is-valid");
          data_endereco.val(null);
        }
      });
    } else {
      data_cep.addClass("is-invalid").removeClass("is-valid");
      data_endereco.addClass("is-invalid").removeClass("is-valid");
      data_endereco.val(null);
    }


  }

  const validarBusca = () => {
    var inptBuscar = $('#inpt_buscar');
    const param_api_find_clientes = "?api=findClientes";

    if (inptBuscar.val()) {
      $.post(apiUrl + param_api_find_clientes, { buscar: buscarCliente ?? buscarCliente, estabelecimento_id: estabelecimento_id }, (res, status) => {

        if (status == 'success') {
          const data = JSON.parse(res);
          const { nome, cliente_id } = data[0] ?? false;

          if (nome && cliente_id) {
            inptBuscar.addClass("is-valid").removeClass("is-invalid");
            setBuscarCliente(nome);
            setCodCliente(cliente_id);
            setMessagem("");
            alert(cliente_id)

          } else {
            setCodCliente(cliente_id);
            setBuscarCliente(nome);
            inptBuscar.addClass("is-invalid").removeClass("is-valid");

          }
        } else {
          inptBuscar.addClass("is-invalid").removeClass("is-valid");
          setMessagem("Cliente não encontrado!")
        
        }

      })
    }
  }
  
  const validarAtendimento = (e) => {
    e.preventDefault();
    const data_atual = new Date();
    let data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();
    const objAtendimento = { estabelecimento_id: null, cod_atendimento: null, cod_atendente: null, cod_cliente: null, cliente: null, data_endereco: null, data_atendimento: null, data_post: null };

    objAtendimento.data_post = data_post;
    let atendente = $('#atendente');
    let cep = $('#cep');
    let cod_atendimento = $('#cod_atendimento');
    let data_atendimento = $('#data_atendimento');
    let endereco = $('#data_endereco');
    let inpt_buscar = $('#inpt_buscar');

    if (cod_atendimento.val()) {
      cod_atendimento.addClass("is-valid").removeClass("is-invalid");
      objAtendimento.cod_atendimento = cod_atendimento.val();

    } else {
      cod_atendimento.addClass("is-invalid").removeClass("is-valid");
      objAtendimento.cod_atendimento = null;
    }

    if (atendente.val()) {
      atendente.addClass("is-valid").removeClass("is-invalid");
      objAtendimento.cod_atendente = atendente.val();

    } else {
      atendente.addClass("is-invalid").removeClass("is-valid");
      objAtendimento.cod_atendente = null;

    }

    if (cep.val()) {
      cep.addClass("is-valid").removeClass("is-invalid");
    } else {
      cep.addClass("is-invalid").removeClass("is-valid");
    }

    if (inpt_buscar.val() && codCliente) {

      objAtendimento.cliente = inpt_buscar.val();
      objAtendimento.cod_cliente = codCliente;
      setMessagem("Clique em buscar!");
      inpt_buscar.addClass("is-valid").removeClass("is-invalid");
    } else {

      objAtendimento.cliente = null;
      objAtendimento.cod_cliente = null;
      inpt_buscar.addClass("is-invalid").removeClass("is-valid");
    }

    if (data_atendimento.val()) {
      data_atendimento.addClass("is-valid").removeClass("is-invalid");
      objAtendimento.data_atendimento = data_atendimento.val();
    } else {
      data_atendimento.addClass("is-invalid").removeClass("is-valid");
      objAtendimento.data_atendimento = null;
    }

    if (endereco.val()) {
      endereco.addClass("is-valid").removeClass("is-invalid");
      objAtendimento.data_endereco = endereco.val();
    } else {
      endereco.addClass("is-invalid").removeClass("is-valid");
      objAtendimento.data_endereco = null;

    }

    const param_api_save_atendimento = "?api=setAtendimentos";
 
    if (objAtendimento.cod_atendimento == null || objAtendimento.cod_atendente == null || objAtendimento.cod_cliente == null || objAtendimento.cliente == null || objAtendimento.data_endereco == null || objAtendimento.data_atendimento == null || objAtendimento.data_post == null) {
      setDisplaySuccess("none");
      setMsgSuccess(null);
      setDisplayError("block");
      setMsgError("Preencha os campos!");

    } else {

      if (estabelecimento_id !== 'null') {

        objAtendimento.estabelecimento_id = estabelecimento_id;
        $.post(apiUrl + param_api_save_atendimento, objAtendimento, (res, status) => {
         
          if (status == "success") {
            if (res == 1) {

              setDisplaySuccess("block");
              setMsgSuccess("Atendimento registrado!");
              setDisplayError("none");
              setMsgError(null);
              window.location.href = '/admin/lista-atendimento';

            } else {
              setDisplaySuccess("none");
              setMsgSuccess(null);
              setDisplayError("block");
              setMsgError("Preencha os campos!");
            }
          }

        })
      } else {
        alert("Nenhum cliente estabelecimento");
        Sair();
      }
      /*
      $.post(urlApi + nameApi + param_api_save_atendimento, objAtendimento, (res, status) => {
        if (status == "success") {
          if (res == 1) {
   
            setDisplaySuccess("block");
            setMsgSuccess("Atendimento registrado!");
            setDisplayError("none");
            setMsgError(null);
   
          } else {
            setDisplaySuccess("none");
            setMsgSuccess(null);
            setDisplayError("block");
            setMsgError("Preencha os campos!");
          }
        }
      })*/

    }

  }
  //VALOR PARA DATA ATUAL, INPUT
  //const mostrarDataAtual = () => {
   // let d = new Date();
   // return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
 // }
  const gerarCodAtendimento = () => {
    let cod_atendimento = $('#cod_atendimento');
    var cod = Math.floor(Math.random() * (777 + 0)) - 1;

    cod_atendimento.val(cod).attr({ disabled: 'disabled' });

    if (cod_atendimento.val() > 0) {
      cod_atendimento.addClass("is-valid").removeClass("is-invalid");
    } else {
      cod_atendimento.addClass("is-valid").removeClass("is-invalid");
    }

  }
  /*
    const statusPos=()=>{
       
    }
    statusPos();*/

  /* const mudarStatusAtendimento = (e) => {
     e.preventDefault();
  
     console.log(statusAtendimento)
     const param_api_update_status = '?api=setUpdateStatus';
     var obj_status = {status_pos:statusAtendimento}
     $.post(urlApi+nameApi+param_api_update_status,obj_status,(res,status)=>{
       console.log(res)
     })
   }*/



  const fecharModal = () => {
    window.location.reload();
  }
  useEffect(() => {

    let data_cep = $('#cep');
    data_cep.mask('00000000');
   
    const getCliente = () => {
      $.post(apiUrl + param_api_get_clientes, { estabelecimento_id: estabelecimento_id }, (res, status) => {
        if (status == 'success') {
          var data_cliente = JSON.parse(res);
          setClientes(data_cliente);
        } else {
          alert("Error: parametros API ");
        }

      })

    }
    getCliente();

  }, [setBuscarCliente, setMessagem, setPosStatusAtendimento]);

  return (
    <div className="container comanda">
      <div class="container animate__animated animate__fadeIn">

        <h4 className="mb-4 mt-4"> Novo Atendimento <i class="bi bi-clock"></i></h4>
      
        <div class="container p-0 m-0">
          <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
            <i class="bi bi-clock p-2"></i>
            {msgSuccess !== null && msgSuccess}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => { fecharModal() }}></button>
          </div>
          <div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
            <i class="bi bi-exclamation-triangle p-2"></i>
            {msgError !== null && msgError}

          </div>
          <table class="container-fluid table table-bordered ">
            <thead>
              <tr>
                <th class="fw-medium">Atendente</th>
                <th class="fw-medium">N° Atendimento</th>
              </tr>
            </thead>
            <tbody>
              <tr colspan="2">
                <td>
                  <div class="input-group">
                    <select class="form-select  form-control" id="atendente">
                      <option value={sessao.cod} selected>{sessao.nome}</option>
                    </select>
                  </div>
                </td>
                <td colspan="2">
                  <div class="input-group  ">
                    <input type="text" class="form-control" id="cod_atendimento" placeholder="N° Atendimento" aria-label="Recipient’s username" aria-describedby="button-addon2" />
                    <button class="btn btn-secondary" onClick={() => { gerarCodAtendimento() }} type="button" id="button-addon2">  <i class="bi bi-arrow-repeat"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <td class="lh-3 fw-medium">Cliente</td>
                  <div class="input-group  mt-2 mb-2">
                    <button class="btn btn-success " type="button" onClick={() => validarBusca()} id="button-addon2">Confirmar <i class="bi bi-check2-all"></i></button>
                    <input list="clientes" class='form-select form-control' id="inpt_buscar" value={buscarCliente} onChange={(e) => setBuscarCliente(e.target.value)} placeholder='Encontrar cliente...' aria-describedby="button-addon2" />
                    <datalist id="clientes" className='p-4'>
                      {clientes && clientes.map((vl) => { return <option className='p-4' value={vl.nome} /> })}
                    </datalist>
                    <div id="messagems" class="invalid-feedback">{messagem && messagem}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <td class="fw-medium">Data do Atendimento</td>
                  <div class="input-group mt-2 mb-2 ">
                    <input type='date' class="form-control" id="data_atendimento"  min="1900-01-01" />
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <td class="fw-medium">CEP</td>
                  <div class="input-group mt-2 mb-2 ">
                    <input type='text' class="form-control" id="cep" value={datacep} placeholder='CEP' onChange={(e) => setDataCep(e.target.value)} />
                    <button class="btn btn-success" type="button" onClick={() => validarCep()} id="button-addon2"><i class="bi bi-search"></i> </button>
                  </div>

                </td>

              </tr>
              <tr>
                <td colspan="2">
                  <td class="fw-medium">Endereço</td>
                  <div class="input-group mt-2 mb-2 ">
                    <input type='text' class="form-control" placeholder='Endereço' id="data_endereco" />

                  </div>

                </td>

              </tr>


            </tbody>
          </table>
          <div class="container-fluid p-0 m-0 mt-4">

            <button class="btn btn-md btn-primary w-100 btn-edigit" onClick={(e) => { validarAtendimento(e) }} type="button"> <i class="bi bi-pencil-square"></i> Registrar Atendimento</button>
          </div>
        </div>


      </div>
    </div>
  )


}

export default Atendimento;
