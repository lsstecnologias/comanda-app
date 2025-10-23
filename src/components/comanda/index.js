
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './style.css';
import { useContext } from 'react';
import { UserContext } from '../../components/context';
import { useEffect, useState, useMemo } from 'react';
const $ = require("jquery");


function Comanda() {
  const { sessao, status, redirect_login, Sair } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [sessaoUser, setSessaoUser] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [buscarCliente, setBuscarCliente] = useState("");
  const [messagem, setMessagem] = useState("");
  const [subtotal, setSubTotal] = useState([]);


  const urlApi = 'http://10.10.10.6/';
  const nameApi = 'api_comanda/';
  const param_api_get_produtos = "?api=getProdutos";
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
    var objAtendimento = { usuario: "", cliente: "", cod_atendimento: "", data_atendimento: "" }
    //parei aqui
    if (cod_atendimento.val()) {
      console.log(cod_atendimento.val())
      cod_atendimento.addClass("is-valid").removeClass("is-invalid");

    } else {
      cod_atendimento.addClass("is-invalid").removeClass("is-valid");
    }

    if (data_atendimento.val()) {
     console.log(data_atendimento.val())
      data_atendimento.addClass("is-valid").removeClass("is-invalid");
    } else {
      data_atendimento.addClass("is-invalid").removeClass("is-valid");
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
              setMessagem("Selecione o cliente!");
              setBuscarCliente(vl.nome);
              console.log(buscarCliente)

            } else {
              setMessagem("Selecione o cliente!")
              cliente.addClass("is-invalid").removeClass("is-valid");
              messagems.addClass("invalid-feedback").removeClass("valid-feedback");

            }

          } else {
            cliente.addClass("is-invalid").removeClass("is-valid");
            messagems.addClass("invalid-feedback").removeClass("valid-feedback");
            setMessagem("Selecione o cliente!");

          }

        }

      });

    } else {
      cliente.addClass("is-invalid").removeClass("is-valid");
    }

    if (atendente.val()) {
      console.log(atendente.val())
      atendente.addClass("is-valid").removeClass("is-invalid");
    } else {
      atendente.addClass("is-invalid").removeClass("is-valid");
    }


  }
  const gerarCodAtendimento = () => {

    var uid_str = uuidv4().substring(0, 7);
    let cod_atendimento = $('#cod_atendimento');
    cod_atendimento.val(uid_str).attr({ disabled: 'disabled' })

  }
  const marcarQuantidade = (id, preco) => {

    let inpt_qt = $("#inpt-qt-id-" + id);
    let inpt_subtotal = $("#inpt-subtotal-" + id);
    let check = $("#check-inpt-" + id);
    let qt = inpt_qt.val();

    if (!isNaN(qt) && qt !== null && qt !== "") {
      var subtotal = (qt * preco).toFixed(2);
      inpt_subtotal.val(subtotal);
      if (check[0].value == 'on') {
        inpt_qt.attr("disabled", true).addClass("is-valid").removeClass("is-invalid");

        check[0].value = "off";
      } else {
        inpt_qt.attr("disabled", false);
        inpt_qt.addClass("is-valid");
        check[0].value = "on";

      }

    } else {
      inpt_qt.addClass("is-invalid").removeClass("is-valid");
    }

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


    axios.get(urlApi + nameApi + param_api_get_produtos, config)
      .then((res) => {
        var vl = res.data;
        for (var i = 0; i < vl.length; i++) {
          vl[i].subtotal = 0;
        }
        setData(vl);

      }).catch((error) => { alert("Error: parametros API " + error) });

  }, [setData, setBuscarCliente, setMessagem]);

  return (
    <div className="container-fluid comanda">
      <main class="container animate__animated animate__fadeIn">
        { /*Usuário */}
        <h4 className="mb-2 mt-2 pb-2 ">Atendimento <i class="bi bi-clock"></i></h4>
        <div class="container p-0 m-0 mb-4">
          <table class="container-fluid table table-bordered ">
            <thead>
              <tr>
                <th class="fw-medium">Atend. Usuário</th>
                <th class="fw-medium">Cliente</th>
                <th class="fw-medium">Cod. Atendimento</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select class="form-select form-select-sm form-control" id="atendente">
                    <option value={sessaoUser.cod} selected>{sessaoUser.nome}</option>
                  </select>
                </td>
                <td >

                  <div class="input-group input-group-sm  ">
                    <input list="clientes" className='form-select form-control' onChange={(e) => setBuscarCliente(e.target.value)} id="cliente" placeholder='Buscar...' />
                    <datalist id="clientes" className='p-4'>
                      {clientes && clientes.map((vl) => { return <option className='p-4' value={vl.nome} /> })}

                    </datalist>
                    <div id="messagems" class="invalid-feedback">{messagem && messagem}</div>
                  </div>

                </td>
                <td>
                  <div class="input-group input-group-sm ">

                    <input type="text" class="form-control" id="cod_atendimento" placeholder="Gerar cod." aria-label="Recipient’s username" aria-describedby="button-addon2" />
                    <button class="btn btn-outline-secondary" onClick={() => { gerarCodAtendimento() }} type="button" id="button-addon2"><i class="bi bi-arrow-counterclockwise"></i></button>


                  </div>
                  <div class="input-group input-group-sm mt-2 ">
                    <input type='date' class="form-control" id="data_atendimento" />
                  </div>
                </td>

              </tr>

            </tbody>
          </table>
          <div class="container p-0 m-0">
            <button class="btn btn-outline-secondary w-100" onClick={(e) => { registrarAtendimento(e) }} type="button"> <i class="bi bi-pencil-square"></i> Registrar Atendimento</button>
          </div>
        </div>

        { /*Comanda */}
        <div class="container  p-0 m-0 pt-4 mt-4">
          <article>
            <table class="table table-bordered align-right table-responsive">
              <thead class="align-end">
                <tr>
                  <th class="fw-medium">Produto</th>
                  <th class="fw-medium">Quant.</th>
                  <th class="fw-medium">Preço</th>
                  <th class="fw-medium">SubTotal</th>
                </tr>
              </thead>

              <tbody>
                {data && data.map((valor) => {

                  return (
                    <tr key={valor.id}>
                      <td>
                        <p class="lh-1 fw-light text-start m-0">{valor.nome} {valor.descricao}</p>

                      </td>
                      <td class=" d-flex align-items-center justify-content-center">
                        <div class="input-group input-group-sm d-flex align-items-center ">
                          <input type="number" min="1" class="form-control" id={"inpt-qt-id-" + valor.id} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                          <div class="input-group-text" onClick={() => { marcarQuantidade(valor.id, valor.preco) }}>
                            <input class="form-check-input mt-0" type="checkbox" name="block-qtd" style={{ display: "none" }} id={"check-inpt-" + valor.id} />
                            <i class="bi bi-lock-fill"></i>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center mt-2" >
                          <p class="lh-1 fw-light  ">{valor && valor.preco}</p>
                        </div>
                      </td>
                      <td>
                        <div class="d-subtotal">
                          <input type='text' id={"inpt-subtotal-" + valor.id} class="form-control" disabled />

                        </div>
                      </td>

                    </tr>
                  )
                })}

              </tbody>

            </table>

          </article>
        </div>
        {data.length == 0 &&
          <div class="container-fluid alert alert-light" role="alert">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>

            </div>

          </div>
        }
      </main>
    </div>
  )


}

export default Comanda;
