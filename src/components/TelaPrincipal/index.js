import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../components/context';
import 'animate.css';
const TelaPrincipal = () => {
    const { sessao, status } = useContext(UserContext);
   
    return (

        <div className="container-fluid tela-principal">
            
                <div className='container animate__animated animate__fadeIn'>
                    <h1>Olá </h1>
                </div>
            
        </div>

    )
}
export default TelaPrincipal;