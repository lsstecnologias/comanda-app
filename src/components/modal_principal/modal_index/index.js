
import bg_logo from '../bg_logo.png';

const ModalIndex = () => {
    return (
        <div class="modal fade " id="myModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
            <div class="modal-dialog modal-xl">

                <div class="modal-content">
                    <div class="modal-header">

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                        <small style={{ marginLeft: '10px' }}>Fechar</small>
                    </div>
                    <div class="modal-body d-flex align-items-center justify-content-center ">
                     
                        <div class="col-sm-12 container-fluid">                               
                            <img src={bg_logo} class="img-fluid mb-3 ml-3" alt="Example image" width="240" height="300" style={{ marginLeft: '43px' }} />                          
                        </div>
                    

                    </div>




                </div>

            </div>
        </div>

    )
}
export default ModalIndex;