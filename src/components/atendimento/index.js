
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './style.css';
import { useCallback, useContext } from 'react';
import { UserContext } from '../context';
import { useEffect, useState, useMemo } from 'react';
import 'jquery-mask-plugin';
import $ from 'jquery';

const Atendimento = () => {
  const { sessao, status, redirect_login, Sair } = useContext(UserContext);

  const [sessaoUser, setSessaoUser] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [buscarCliente, setBuscarCliente] = useState("");
  const [messagem, setMessagem] = useState("");

  const [displayError, setDisplayError] = useState('none');
  const [displaySuccess, setDisplaySuccess] = useState('none');
  const [msgError, setMsgError] = useState(null);
  const [msgSuccess, setMsgSuccess] = useState(null);

  const [datacep, setDataCep] = useState("");

  const urlApi = 'http://10.10.10.6/';
  const nameApi = 'api_comanda/';

  const param_api_get_clientes = "?api=getClientes";
  const param_api_find_clientes = "?api=findClientes";

  const config = {
    method: "GET",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true',
      'mode': 'cors'
    }
  };

  /**/


  //let data_cep = $('#cep');
  // data_cep.mask('0000000');
  const validarCep = async () => {
    let data_cep = $('#cep');
    let data_endereco = $('#data_endereco');
    data_cep.mask('00000000');
    if (datacep) {
      $.get("https://viacep.com.br/ws/" + datacep + "/json/", (res, status) => {
        if (status == 'success') {
          data_cep.addClass("is-valid").removeClass("is-invalid");
          let data_str = `${res.logradouro} - ${res.localidade} ${res.uf} - ${res.regiao} ${res.bairro} - ${res.cep}`;
          data_endereco.val(data_str)
          setDataCep("");

        } else {
          data_cep.addClass("is-invalid").removeClass("is-valid");

        }
      });
    } else {
      data_cep.addClass("is-invalid").removeClass("is-valid");

    }

    /*
   async function getData() {
     const url = "https://viacep.com.br/ws/"+datacep+"/json/";
     try {
       const response = await fetch(url,config);
       if (!response.ok) {
         throw new Error(`Response status: ${response.status}`);
       }

       const result = await response.json();
       console.log(result);
     } catch (error) {
       console.error(error.message);
     }
   }
   getData() */
  }

  const validarAtendimento = (e) => {
    e.preventDefault();
    let data_atual = new Date();
    let data_post = data_atual.toLocaleTimeString() + "-" + data_atual.toLocaleDateString().toString();

    const objAtendimento = { cod_usuario: "", cod_cliente: "", cliente: "", cod_atendimento: "", data_atendimento: "", data_post: "", data_endereco: "" }
    if (objAtendimento.data_post == "") { objAtendimento.data_post = data_post; }

    let atendente = $('#atendente');
    let cliente = $('#cliente');
    let cep = $('#cep')
    let cod_atendimento = $('#cod_atendimento');
    let data_atendimento = $('#data_atendimento');
    let endereco = $('#data_endereco');
    let messagems = $("#menssagem");

    if (endereco.val()) {
      objAtendimento.data_endereco = endereco.val();
      endereco.addClass("is-valid").removeClass("is-invalid");

    } else {
      endereco.addClass("is-invalid").removeClass("is-valid");
      objAtendimento.data_endereco = null;

    }

    if (cep.val()) {

      cep.addClass("is-valid").removeClass("is-invalid");

    } else {
      cep.addClass("is-invalid").removeClass("is-valid");


    }


    if (cod_atendimento.val()) {
      objAtendimento.cod_atendimento = cod_atendimento.val();
      cod_atendimento.addClass("is-valid").removeClass("is-invalid");

    } else {
      cod_atendimento.addClass("is-invalid").removeClass("is-valid");
      objAtendimento.cod_atendimento = null;
    }

    if (data_atendimento.val()) {
      objAtendimento.data_atendimento = data_atendimento.val();
      data_atendimento.addClass("is-valid").removeClass("is-invalid");

    } else {
      data_atendimento.addClass("is-invalid").removeClass("is-valid");
      objAtendimento.data_atendimento = null;
    }

    if (atendente.val()) {
      objAtendimento.cod_usuario = atendente.val();
      atendente.addClass("is-valid").removeClass("is-invalid");

    } else {
      atendente.addClass("is-invalid").removeClass("is-valid");
      objAtendimento.cod_usuario = null;

    }


    if (cliente.val() && buscarCliente !== "") {

      $.post(urlApi + nameApi + param_api_find_clientes, { buscar: buscarCliente ?? buscarCliente }, async (data, status) => {
        if (status == 'success') {
          if (data !== 'false') {
            const resp = JSON.parse(data);
            let vl = resp.find((e) => { return e.nome == buscarCliente });

            if (vl) {
              messagems.addClass("valid-feedback").removeClass("invalid-feedback");
              cliente.addClass("is-valid").removeClass("is-invalid");

              setBuscarCliente(vl.nome);
              objAtendimento.cliente = vl.nome;
              objAtendimento.cod_cliente = vl.cod;

              const param_api_save_atendimento = "?api=setAtendimentos";



              $.post(urlApi + nameApi + param_api_save_atendimento, objAtendimento, (res, status) => {
                if (status == "success") {
                  if (res == 1) {
                    setDisplaySuccess("block");
                    setMsgSuccess("Atendimento registrado!");

                    $('#cliente').val("");
                    $('#cod_atendimento').val("");
                    $('#data_atendimento').val("");
                    $("#menssagem").val("");

                    setDisplayError("none");
                    setMsgError(null);
                    return objAtendimento;
                  } else {
                    setDisplayError("block");
                    setMsgError("O atendimento não foi registrado!");
                    setDisplaySuccess("none");
                    setMsgSuccess(null);
                  }
                }
              })


            } else {
              setMessagem("Selecione o cliente!")
              cliente.addClass("is-invalid").removeClass("is-valid");
              messagems.addClass("invalid-feedback").removeClass("valid-feedback");
              objAtendimento.cliente = null;
              objAtendimento.cod_cliente = null;

            }

          } else {
            cliente.addClass("is-invalid").removeClass("is-valid");
            messagems.addClass("invalid-feedback").removeClass("valid-feedback");
            setMessagem("Erro ao selecionar o cliente!");


          }

        }

      });

    } else {
      cliente.addClass("is-invalid").removeClass("is-valid");
    }

    return;

  }

  const gerarCodAtendimento = () => {

    var cod = Math.floor(Math.random() * (777 + 0)) - 1;
    let cod_atendimento = $('#cod_atendimento');
    cod_atendimento.val(cod).attr({ disabled: 'disabled' })

  }

  const fecharModal = () => {
     window.location.reload();
  }
  useEffect(() => {
    if (status == true) {

      setSessaoUser(sessao);

    } else {
      Sair();
    }

    let data_cep = $('#cep');
    data_cep.mask('00000000');


    const getCliente = () => {
      axios.get(urlApi + nameApi + param_api_get_clientes, config)
        .then((res) => {
          if (res.status == 200) {
            setClientes(res.data);
          }

        }).catch((error) => { alert("Error: parametros API " + error) });

    }
    getCliente();

  }, [setBuscarCliente, setMessagem]);

  return (
    <div className="container comanda">
      <div class="container animate__animated animate__fadeIn">

        <h4 className="mb-4 mt-4">Atendimentos <i class="bi bi-clock"></i></h4>
        <div class="container p-0 m-0">
          <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
            <i class="bi bi-check-circle-fill p-2"></i>
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
                <th class="fw-medium">Cod. Atendimento</th>
              </tr>
            </thead>
            <tbody>
              <tr colspan="2">
                <td>
                  <div class="input-group">
                    <select class="form-select  form-control" id="atendente">
                      <option value={sessaoUser.cod} selected>{sessaoUser.nome}</option>
                    </select>
                  </div>
                </td>
                <td colspan="2">
                  <div class="input-group ">
                    <input type="text" class="form-control" id="cod_atendimento" placeholder="Gerar cod." aria-label="Recipient’s username" aria-describedby="button-addon2" />
                    <button class="btn btn-secondary" onClick={() => { gerarCodAtendimento() }} type="button" id="button-addon2"><i class="bi bi-arrow-repeat"></i></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <td class="lh-3 fw-light">Cliente Nome</td>
                  <div class="input-group  mt-2 mb-2">

                    <input list="clientes" className='form-select form-control' onChange={(e) => setBuscarCliente(e.target.value)} id="cliente" placeholder='Buscar cliente...' /> <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
                    <datalist id="clientes" className='p-4'>
                      {clientes && clientes.map((vl) => { return <option className='p-4' value={vl.nome} /> })}
                    </datalist>
                    <div id="messagems" class="invalid-feedback">{messagem && messagem}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <td class="fw-light">Data do Atendimento</td>
                  <div class="input-group mt-2 mb-2 ">
                    <input type='date' class="form-control" id="data_atendimento" />
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <td class="fw-light">C.E.P</td>
                  <div class="input-group mt-2 mb-2 ">

                    <input type='text' class="form-control" id="cep" value={datacep} placeholder='0000-000' onChange={(e) => setDataCep(e.target.value)} />
                    <button class="btn btn-success " type="button" onClick={() => validarCep()} id="button-addon2"><i class="bi bi-search"></i> </button>
                  </div>

                </td>

              </tr>
              <tr>
                <td colspan="2">
                  <td class="fw-light">Endereço:</td>
                  <div class="input-group mt-2 mb-2 ">
                    <input type='text' class="form-control" placeholder='Endereço' id="data_endereco" />

                  </div>

                </td>

              </tr>

            </tbody>
          </table>
          <div class="container p-0 m-0 mt-4">

            <button class="btn btn-primary w-100" onClick={(e) => { validarAtendimento(e) }} type="button"> <i class="bi bi-pencil-square"></i> Registrar Atendimento</button>
          </div>
        </div>


      </div>
    </div>
  )


}

export default Atendimento;
