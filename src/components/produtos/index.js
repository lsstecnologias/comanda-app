import TabelaProduto from "../tabela_produto";

const $ = require("jquery");
const Produto = () => {
    return (
        <div className="container">
        

            <div className="container">
                <button type="button" class="btn w-100 btn-primary" data-bs-toggle="modal" data-bs-target="#nvProduto">
                  <i class="bi bi-plus-circle-dotted fs-4"></i> <p>Novo Produto</p>
                </button>
            </div>

           
            <div class="modal fade" id="nvProduto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticnvProduto" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticnvProduto">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
            <TabelaProduto />
        </div>
    )
}
export default Produto;