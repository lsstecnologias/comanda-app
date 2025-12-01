
import { useState, createContext, useEffect } from 'react';
import thumb_logo from '../lss_tecnologias.png';
export const UserContext = createContext({});

function UserProvider({ children }) {
    const [sessao, setSessao] = useState([]);
    const [status, setStatus] = useState(false);
    
    const redirect_login = () => {
        let host = window.location.hostname;
        let porta = window.location.port;
        let protocolo = window.location.protocol;
        let url = protocolo + "//" + host + ':' + porta;
        window.location.href = url;
    }

    useEffect(() => {
        const dataUser = sessionStorage.getItem("user_admin");
        var data = dataUser ? JSON.parse(dataUser) : [];

        if (Array.isArray(data) && data.length == 0) {
            setStatus(false);
            redirect_login();

        } else {
            setStatus(true);
            const {cod,cod_estabelecimento,data_post,email,id,nome,sobrenome,perfil,senha,status} = data[0] ?? redirect_login();
                     
            setSessao({cod,cod_estabelecimento,data_post,email,id,nome,sobrenome,perfil,senha,status});
        }

    }, [setSessao,setStatus]);

    const Sair = () => {
        setStatus(false);
        sessionStorage.removeItem("user_admin");
        sessionStorage.removeItem("cod_estabelecimento");
        sessionStorage.clear();
        redirect_login();
        
    }
    return (
        <UserContext.Provider value={{ sessao,thumb_logo, status, Sair, redirect_login }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;