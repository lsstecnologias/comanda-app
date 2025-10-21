
import { useState, createContext, useEffect } from 'react';
export const UserContext = createContext({});

function UserProvider({ children }) {
    const [data, setData] = useState([]);
    const [status,setStatus] = useState(false);

    useEffect(() => {
        const dataUser = sessionStorage.getItem("user_admin");
        var data = dataUser ? JSON.parse(dataUser) : [];
      
        if (Array.isArray(data) && data.length == 0) {
            let host = window.location.hostname;
            let porta = window.location.port;
            let protocolo = window.location.protocol;
          
            let url = protocolo + "//" + host + ':' + porta;
            window.location.href= url; 
        } else {
          
            setData(data);
            setStatus(true);
        }

    }, [setData])

    return (
        <UserContext.Provider value={{ data,status }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;