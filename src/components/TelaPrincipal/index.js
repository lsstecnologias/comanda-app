import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../components/context';
import 'animate.css';
const TelaPrincipal = () => {
    const { sessao,status } = useContext(UserContext);
  let params = useParams();
  console.log(sessao,status)
    return (
        <div className="container-fluid tela-principal">
            <div className='container animate__animated animate__fadeIn'>
                <h1>Olá : {params == 'admin' ?? 'ok'}</h1>
            </div>

        </div>
    )
}
export default TelaPrincipal;