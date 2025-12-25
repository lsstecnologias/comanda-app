import ModalFormEstabelecimento from './modal_form_estabelecimento';
import ModalIndex from './modal_index';

const ModalPrincipal = () => {

	

	   const status = sessionStorage.getItem('status');

	return (
		<div>
			{status == 'n' ?
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