import Imagens from "../Imagens";
import TabelaUsuario from "../tabela_usuario";

const Usuarios = () => {
    return (
        <div>
            <h3 className="mb-3">Logo</h3>
                <Imagens />
            <h3 className="mb-3 mt-3">Usuarios</h3>

            <button type="button" class="btn  w-100 btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#novoUsuario">
               <i class="bi bi-person-fill-add"></i> Novo
            </button>

            <div class="modal fade" id="novoUsuario" tabindex="-1"   data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="novoUsuario" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="novoUsuario">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput" class="form-label">Example label</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder"/>
                                </div>
                                <div class="mb-3">
                                    <label for="formGroupExampleInput2" class="form-label">Another label</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder"/>
                                </div>
                                 <div class="mb-3">
                                    <label for="formGroupExampleInput2" class="form-label">Sua logo</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder"/>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <TabelaUsuario />

        </div>
    )

}
export default Usuarios;