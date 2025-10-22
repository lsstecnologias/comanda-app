
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useEffect, useState } from 'react';
const $ = require("jquery");
const uid_str = uuidv4().substring(0, 7);

function Comanda() {

  const [data, setData] = useState([]);
  const [subtotal, setSubTotal] = useState([]);

  const urlApi = 'http://10.10.10.6/';
  const nameApi = 'api_comanda/';
  const param_api_get_categorias = "?api=getProdutos";

  const registrarAtendimento = (e) =>{
    e.preventDefault();

    alert("E")
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
    const getCliente = () =>{

    }

    const getAtendente = () =>{

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
    axios.get(urlApi + nameApi + param_api_get_categorias, config)
    .then((res) => {
      var vl = res.data;
      for (var i = 0; i < vl.length; i++) {
        vl[i].subtotal = 0;
      }
      setData(vl);

    }).catch((error) => { alert("Error: parametros API " + error) });

  }, [setData]);

  return (
    <div className="container-fluid comanda">
      <main class="container animate__animated animate__fadeIn">
        { /*Usuário */}
        <h4 className="mb-2 mt-2 pb-2 ">Atendimento <i class="bi bi-clock"></i></h4>
        <div class="container p-0 m-0 mb-4">
          <table class="container-fluid table table-bordered ">
            <thead>
              <tr>
                <th >Atend.Usuário</th>
                <th >Cliente</th>
                <th >Cod.Atendimento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select class="form-select form-select-sm form-control">
                    <option selected>Selecione</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </td>
                <td>
                  <div class="input-group input-group-sm ">
                    <input list="browsers" className='form-select form-control' placeholder='Buscar...' />
                    <datalist id="browsers">
                      <option value="Edge" />
                      <option value="Firefox" />
                      <option value="Chrome" />
                      <option value="Opera" />
                      <option value="Safari" />
                    </datalist>

                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm ">
                    <input disabled id="cod_comanda" class="form-control input-group-sm w-50 p-1" value={uid_str} />
                    <input type='date' class="form-control w-50"  />
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
          <div class="container p-0 m-0">
            <button class="btn btn-outline-secondary w-100" onClick={(e)=>{  registrarAtendimento(e) }} type="button"> <i class="bi bi-pencil-square"></i> Registrar Atendimento</button>
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
            {data.length == 0 &&
              <div class="alert alert-light" role="alert">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>

                </div>

              </div>
            }
          </article>
        </div>

      </main>
    </div>
  )


}

export default Comanda;
