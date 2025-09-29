import axios from 'axios';
import { useEffect, useState } from 'react';
const $ = require("jquery");

function Comanda() {

  const [data, setData] = useState([]);
  const [subtotal, setSubTotal] = useState([]);

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

    let config = {

      method: "get",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        'mode': 'no-cors'
      }
    };
    axios.get('http://10.10.10.6/api_comanda/?api=index', config)
      .then((res) => {
       var vl = res.data;
         
       for(var i=0; i < vl.length;i++){
          vl[i].subtotal=0;
       }
       
        setData(vl);

      }).catch((error) => { alert(error); });

  }, [setData]);

  return (
    <div className="App">

      <main class="container">
        <div class="alert alert-danger text-start" style={{ display: "none" }} role="alert">
          A simple danger alert—check it out!
        </div>
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
                        <input type='text' id={"inpt-subtotal-" + valor.id}  class="form-control" disabled/>
                        
                      </div>
                    </td>

                  </tr>
                )
              })}


            </tbody>

          </table>
        </article>
      </main>
    </div>
  )

}

export default Comanda;
