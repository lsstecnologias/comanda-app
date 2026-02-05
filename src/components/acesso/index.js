import './style.css';
import bg_logo from './bg_logo.png';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context';
import 'animate.css';
import md5 from 'md5';
import $ from 'jquery'
const apiUrl = process.env.REACT_APP_API_URL_PRODUCAO; 

const Acesso = () => {
    //PERIMITE NÃO EXIBIR MODAL DE NOTAS
   
    sessionStorage.setItem('modal_notas', 'hide');
    const [emailLogin, setEmailLogin] = useState(null);
    const [senha, setSenha] = useState(null);
    const [typeSenha,setTypeSenha] = useState("password");

    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);
   
    var ObjSessao = { email_login: "", senha: "" };

  
    useEffect(() => {
        // Registrar o cliente estabelecimento, qunando for liberar o acesso
        // const param_api_list_perfil_usuarios ="?api=getPerfilUsuarios";

        /* let id = "57541fc";
         let obj_cliente= {"cod_cliente_estabelecimento":id}
         $.post(urlApi + nameApi + param_api_list_perfil_usuarios,obj_cliente,(res,status)=>{
          var data = JSON.parse(res);
          data.forEach(element => {
             console.log(element.cod)
          });
           
         })-*/
    }, [])
    
			
    const validarForm = (e) => {
        e.preventDefault();

        if (emailLogin !== null && /\S+@\S+\.\S+/.test(emailLogin) && senha !== null && senha.length >= 6) {

            setDisplayError('none');
            setDisplaySuccess("block");
            setMsgSuccess("Aguarde...");
            ObjSessao.email_login = emailLogin;
            ObjSessao.senha = md5(senha);

        } else {
            setDisplayError("block");
            setMsgError("Verifique email e senha!");
            setDisplaySuccess("none");
            setSenha(null);
            setEmailLogin(null);
            ObjSessao.email_login = "";
            ObjSessao.senha = "";

        }

        $.get(apiUrl+"/api/get").done((res)=>{
           
                var dataSession = res.filter((x) => { return x.senha === ObjSessao.senha && x.email === ObjSessao.email_login });

                if (Array.isArray(dataSession) && dataSession.length === 0) {
                    setDisplayError("block");
                    setMsgError("Verifique email e senha!");
                    setDisplaySuccess("none");
                    setMsgSuccess(null);

                } else {
                    // let host = window.location.hostname;
                    //let porta = window.location.port;
                    //let protocolo = window.location.protocol;
                    let pathDir = window.location.pathname;
                    let url = pathDir + 'admin';
                    const estabelecimento_id = (dataSession[0].estabelecimento_id);
                    const status = (dataSession[0].status);
                    sessionStorage.setItem("user_admin", JSON.stringify(dataSession));
                    sessionStorage.setItem("status", status)
                    sessionStorage.setItem('estabelecimento_id', estabelecimento_id);
                    sessionStorage.setItem('modal_notas', 'show');
                    window.location.href = url;

                }

		})
        //REQUISIÇAO - REALIZAR A REQUISIÇAO GET BACKEND SEM PASSAR O IDhttps://edigitapi.infinityfreeapp.com/api/?api=listardata&i=1
       /* fetch("http://leosenadeveloper.dx.am/api/?api=listardata",{method:'GET',mode:'no-cors',headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json"}})
            .then(async (e) => {
                return await e.json();
            }).then(res => {
                console.log(res);
                var dataSession = res.filter((x) => { return x.senha === ObjSessao.senha && x.email === ObjSessao.email_login });

                if (Array.isArray(dataSession) && dataSession.length === 0) {
                    setDisplayError("block");
                    setMsgError("Verifique email e senha!");
                    setDisplaySuccess("none");
                    setMsgSuccess(null);

                } else {
                    // let host = window.location.hostname;
                    //let porta = window.location.port;
                    //let protocolo = window.location.protocol;
                    let pathDir = window.location.pathname;
                    let url = pathDir + 'admin';
                    const estabelecimento_id = (dataSession[0].estabelecimento_id);
                    const status = (dataSession[0].status);
                    sessionStorage.setItem("user_admin", JSON.stringify(dataSession));
                    sessionStorage.setItem("status", status)
                    sessionStorage.setItem('estabelecimento_id', estabelecimento_id);
                    sessionStorage.setItem('modal_notas', 'show');
                    window.location.href = url;

                }


            }).catch(error => {
                alert("ERRO: verifique os serviços ou recursos do API -" + error)
            });*/
    }

    /*
    
        return (
            <div id="login" class="container animate__animated animate__fadeIn">
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
                            <label for="inpt_emailLogin">Email</label>
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
        )*/
    const exibirSenha = (e) => {
        e.preventDefault();

        if (typeSenha == "password") {
            setTypeSenha("text");

        } else {
            setTypeSenha("password");

        }


    }
    return (
        <div class="container-fluid col-xl-10 col-xxl-8 px-4 py-5">
            <div class="row g-lg-5  animate__animated animate__fadeIn">
                <div class="col-md-10 mx-auto col-lg-5 shadow p-3 mb-5 bg-body-tertiary rounded">
                    <div class="overflow-hidden col-lg-7 text-center text-lg-center animate__animated animate__fadeIn" style={{ maxHeight: "40vh", margin: "0 auto" }}>

                        <img src={bg_logo} class="img-fluid  mb-4" alt="Example image" width="1000" height="500" loading="lazy" />

                    </div>
                    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                        <div class="alert alert-success alert-dismissible fade show animate__animated animate__fadeIn" style={{ display: displaySuccess }} role="alert">
                            <i class="bi bi-check-circle p-2"></i>
                            {msgSuccess !== null && msgSuccess}

                        </div>
                        <div class="alert alert-danger alert-dismissible fade show animate__animated animate__fadeIn" style={{ display: displayError }} role="alert">
                            <i class="bi bi-exclamation-triangle p-2"></i>
                            {msgError !== null && msgError}

                        </div>
                        <div class="form-floating  mb-3">
                            <input type="email" class="form-control" id="inpt_email" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} autocomplete="off" placeholder="name@example.com" />
                            <label for="finpt_email">E-mail</label> </div> 
                            <div class="form-floating mb-2">
                            <input type={typeSenha} class="form-control" id="inpt_senha" value={senha} onChange={e => setSenha(e.target.value)} autocomplete="off" placeholder="" />
                           
                            <label for="inpt_senha">Senha </label>
                        </div>
                        <div class="checkbox mb-4 text-end">
                            <button class="btn btn-sm " onClick={(e) => { exibirSenha(e) }}> <i class="bi bi-eye" ></i> Exibir senha</button>                               
                           
                        </div>

                        <button class="w-100 btn btn-sm btn-primary" id="btnAcesso" onClick={(e) => { validarForm(e) }} type="button"><i class="bi fs-5 bi-box-arrow-in-right"></i> Entrar</button>
                        <br/>
                        <div class="text-center mt-4 ">
                            
                            <small class="text-body-secondary m-0 p-0">lsstecnologias&copy;2025</small>
                            </div>

                    </form>
                </div>


            </div>

        </div>
    )
}
export default Acesso;