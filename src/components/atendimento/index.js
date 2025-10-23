
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './style.css';
import { useContext } from 'react';
import { UserContext } from '../context';
import { useEffect, useState, useMemo } from 'react';
const $ = require("jquery");


const Atendimento=()=> {
  const { sessao, status, redirect_login, Sair } = useContext(UserContext);

  const [sessaoUser, setSessaoUser] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [buscarCliente, setBuscarCliente] = useState("");
  const [messagem, setMessagem] = useState("");
  const [subtotal, setSubTotal] = useState([]);


  const urlApi = 'http://10.10.10.6/';
  const nameApi = 'api_comanda/';
  
  const param_api_get_clientes = "?api=getClientes";
  const param_api_find_clientes = "?api=findClientes";
  const param_api_set_atendimento = "?api=setAtendimento";

  const registrarAtendimento = (e) => {
    e.preventDefault();
    let atendente = $('#atendente');
    let cliente = $('#cliente');
    let cod_atendimento = $('#cod_atendimento');
    let data_atendimento = $('#data_atendimento');
    let messagems = $("#menssagem");
    var objAtendimento = { cod_usuario: "", cod_cliente: "", cliente: "", cod_atendimento: "", data_atendimento: "" }
    //parei aqui
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
              setMessagem("Cliente não encontrado!");
              setBuscarCliente(vl.nome);
              objAtendimento.cliente = vl.nome;
              objAtendimento.cod_cliente = vl.cod;
              console.log(objAtendimento);


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


    console.log(objAtendimento)
  }
  const gerarCodAtendimento = () => {

    var uid_str = uuidv4().substring(0, 7);
    let cod_atendimento = $('#cod_atendimento');
    cod_atendimento.val(uid_str).attr({ disabled: 'disabled' })

  }
  

  useEffect(() => {
    if (status == true) {

      setSessaoUser(sessao);

    } else {
      Sair();
    }

    const config = {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        'mode': 'no-cors'
      }
    };

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
    <div className="container-fluid comanda">
      <div class="container animate__animated animate__fadeIn">
       
        <h4 className="mb-2 mt-2 pb-2 ">Atendimento <i class="bi bi-clock"></i></h4>
        <div class="container p-0 m-0 mb-4">
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

            </tbody>
          </table>
          <div class="container p-0 m-0">

            <button class="btn btn-primary w-100" onClick={(e) => { registrarAtendimento(e) }} type="button"> <i class="bi bi-pencil-square"></i> Registrar Atendimento</button>
          </div>
        </div>

       
      </div>
    </div>
  )


}

export default Atendimento;
