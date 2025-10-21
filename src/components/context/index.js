
import { useState, createContext, useEffect } from 'react';
export const UserContext = createContext({});

function UserProvider({ children }) {
    const [sessao, setSessao] = useState([]);
    const [status, setStatus] = useState(false);

    const Host = () => {
        let host = window.location.hostname;
        let porta = window.location.port;
        let protocolo = window.location.protocol;
        let url = protocolo + "//" + host + ':' + porta;
        return url;
    }

    useEffect(() => {
        const dataUser = sessionStorage.getItem("user_admin");
        var data = dataUser ? JSON.parse(dataUser) : [];

        if (Array.isArray(data) && data.length == 0) {
             setStatus(false);
            window.location.href = Host();
        } else {
            setSessao(data);
            setStatus(true);
        }

    }, [setSessao,setStatus])
    const Sair = () => {
        setStatus(false);
        sessionStorage.removeItem("user_admin");
        sessionStorage.clear();
        window.location.href = Host();
    }
    return (
        <UserContext.Provider value={{ sessao, status, Sair }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;