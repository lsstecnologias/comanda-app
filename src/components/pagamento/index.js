import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/context';
import jQuery from 'jquery';

const Pagamento = () => {

	sessionStorage.setItem('modal_notas', 'hide');
	const { GetSession, sessao, Sair, status } = useContext(UserContext);
	return (
		<div className="container-fluid mt-3 produtos">
			<div className="container p-0 animate__animated  animate__fadeIn">
				<h4 className="mb-4 mt-2 pb-2 "> Pagamentos  <i class="bi bi-box-fill"></i></h4>
				<p>
					<ul>
						<li>Token de autenticação ambiente de Produção;</li>
						<li>Acesse a sua conta via desktop PagBank;</li>
						<li>No menu lateral, selecione Venda online;</li>
						<li>Selecione a opção Integrações;</li>
						<li>Clique em Gerar Token.</li>
					</ul>
				</p>
			</div>
		</div>
	)

}
export default Pagamento;