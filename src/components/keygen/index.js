import { useEffect, useState } from "react";
import $ from 'jquery';
const Keygen = () => {
    const [chave,setChave] = useState("");
    
    const validarLicenca=(e)=>{
        e.preventDefault();
        if(chave.length == 7){
            

            console.log(chave)
        }
           
    }

    useEffect(()=>{
        $('#chaveLicenca').mask('000-000-000-000');
    
        
    },[setChave]);
    return (
        <div className="container mt-2 usuario">
            <h4 className="mb-4 mt-2 pb-2">Keygen <i class="bi bi-key"></i></h4>
            <h5 className="mb-2  pb-2">Licença de acesso</h5>



            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>


            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Licença de uso <i class="bi bi-key"></i> </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <div class="input-group mb-3">
                                
                                <input type="text" placeholder="XXX-XXX-XXX-XXX" id="chaveLicenca" onChange={(e)=>{setChave(e.target.value)}} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                                
                            </div>
                        </div>
                        <div class="modal-footer">
                           
                            <button type="button" class="btn w-100 btn-primary" onClick={(e)=>{validarLicenca(e)}}>Validar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Keygen;