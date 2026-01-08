 <div class="container-fluid animate__animated animate__fadeIn p-0 m-0 mt-4">
            <div class="alert alert-success alert-dismissible fade show animate__animated animate__fadeIn" style={{ display: displaySuccess }} role="alert">
               <i class="bi bi-clipboard2 p-2"></i>
               {msgSuccess !== null && msgSuccess}
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class=" alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
               <i class="bi bi-exclamation-triangle p-2"></i>
               {msgError !== null && msgError}

            </div>
            <div class="row d-flex align-items-center justify-content-between text-center text-secondary flex-row p-0 m-0 ">
               <div class="col-4 border p-1">
                  <p class="mb-0 lh-1">ESTABELECIMENTO</p>
                  <p className="fs-2 mb-0 mt-0 t-0"> {sessao.estabelecimento_id ? sessao.estabelecimento_id : 'S/N'}</p>

               </div>
               <div class="col-4 border p-1">

                  <p class="mb-0 pb-0 mt-0 lh-1">CLIENTE <i class="bi bi-clipboard2"></i></p>
                  <p className="fs-2 mb-0 mt-0 t-0"> N° {cod ? cod : 'S/N'}</p>

               </div>
               <div class="col-4 border p-1">

                  <div class=" p-2">
                     <div class="form-label p-0">
                        <select class="form-select input-sm w-100 text-center" disabled={true} id="funcionario">
                           <option value={sessao.cod} selected>Funcionário {sessao.nome ? sessao.nome : 'S/N'}</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>
         </div>
