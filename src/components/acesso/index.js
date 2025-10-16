import './style.css';
import { useEffect, useState } from 'react';
import md5 from 'md5';
const Acesso = () => {
    const [emailLogin, setEmailLogin] = useState(null);
    const [senha, setSenha] = useState(null);

    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    var ObjSessao = { email_login: "", senha: "" };

    const urlApi = 'http://10.10.10.6/';
    const nameApi = 'api_comanda/';
    const param_api_get_usuarios = "?api=getUsuarios";

    const validarForm = (e) => {
        e.preventDefault();

        if (emailLogin !== null && /\S+@\S+\.\S+/.test(emailLogin) && senha !== null && senha.length >= 6) {

            setDisplayError('none');
            setDisplaySuccess("block");
            setMsgSuccess("Aguarde...");
            ObjSessao.email_login = emailLogin;
            ObjSessao.senha = md5(senha);
            console.log(emailLogin)
        } else {
            setDisplayError("block");
            setMsgError("Verifique email e senha!");
            setDisplaySuccess("none");
            setSenha(null);
            setEmailLogin(null);
            ObjSessao.email_login = "";
            ObjSessao.senha = "";
            return;
        }

        fetch(urlApi + nameApi + param_api_get_usuarios)
        .then(async (e) => {
            return await e.json();
        }).then(res => {
            var dataSession = res.filter((x) => { return x.senha === ObjSessao.senha && x.email === ObjSessao.email_login });
            if (Array.isArray(dataSession) && dataSession.length === 0) {
                setDisplayError("block");
                setMsgError("Email ou Senha incorreto!");
                setDisplaySuccess("none");
                setMsgSuccess(null);

            } else {
                let host = window.location.hostname;
                let porta = window.location.port;
                let protocolo = window.location.protocol;
                let pathDir = window.location.pathname;
                let url = protocolo + "//" + host + ':' + porta + pathDir + 'admin';
                sessionStorage.setItem("user_admin", JSON.stringify(dataSession))
                window.location.href = url;
                
            }


        }).catch(error => {
            alert("ERRO: verificar os serviços ou recursos API" + error)
        });
    }



    return (
        <div id="login">
            <main class="form-signin w-100 m-auto">
                <form >

                    <h1 class="h1 mb-3 fw-normal">Login</h1>
                    <div class="alert alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                        <i class="bi bi-check-circle p-2"></i>
                        {msgSuccess !== null && msgSuccess}

                    </div>
                    <div class="alert alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                        <i class="bi bi-exclamation-triangle p-2"></i>
                        {msgError !== null && msgError}

                    </div>
                    <div class="form-floating">
                        <input type="email" name="login" class="form-control" id="inpt_email_login" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} autocomplete="off" placeholder="login" />
                        <label for="inpt_emailLogin">Login ou Email</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" name="pass" class="form-control" id="inpt_senha" value={senha} onChange={e => setSenha(e.target.value)} autocomplete="off" placeholder="Password" />
                        <label for="inpt_senha">Senha</label>
                    </div>
                    <div class="form-check text-start my-3">
                        <input class="form-check-input" type="checkbox" value="remember-me" id="checkDefault" />
                        <label class="form-check-label fw-normal lh-1" for="checkDefault"><small>Lembrar?  </small> </label>
                    </div>
                    <button class="btn btn-primary w-100 " onClick={(e) => { validarForm(e) }} type="button"> <i class="bi fs-5 bi-box-arrow-in-right"></i> Entrar</button>
                    <p class="mt-3 mb-3 text-center text-body-secondary">lsstecnologias &copy; 2017–2025</p>
                </form>
            </main>
        </div>
    )
}
export default Acesso;