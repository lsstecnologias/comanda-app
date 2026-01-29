import ModalFormEstabelecimento from './modal_form_estabelecimento';
import ModalIndex from './modal_index';

const ModalPrincipal = () => {
	
	
		//atualizar status do estabelecimento
		//
	   const status = sessionStorage.getItem('status');

	return (
		<div>
			{//para exibir coloca n,
			status == 'n' ?
				<div>
					<ModalFormEstabelecimento />
				</div>
				:
				<div>
					<ModalIndex />
				</div>
			}


		</div>
	);
}
export default ModalPrincipal;