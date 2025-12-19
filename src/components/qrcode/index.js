
import { useContext, useState } from 'react';
import { UserContext } from '../context';
import printJS from 'print-js';



/*   const qrcode = require('wifi-qr-code-generator');

   const pr = qrcode.generateWifiQRCode({
     ssid: 'Hello world',
     password: 'testpass',
     encryption: 'WPA',
     hiddenSSID: false,
     outputFormat: { type: 'image/png' }
   });

 // pr.then((data) => console.log(data) ); // Logs a data URL for the PNG image
var ssid = "IONE_SENA";
   var password = "143113Lu";
   var encryption = "WPA/WPA2"; // WPA/WPA2, WEP, or None
   var wifiData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
   var apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(wifiData)}`;

  */

const QRCode = () => {
    //dimensao-logomarca-valor-http://localhost:3001/?mesa=3
    	//PERIMITE NÃO EXIBIR MODAL DE NOTAS
	sessionStorage.setItem('modal_notas', 'hide');
    const { sessao, status, redirect_login, thumb_logo, Sair } = useContext(UserContext);
    (sessao) ?? Sair();
    const [tamLogo, setTamLogo] = useState(0);
    const [tamW, setTamW] = useState(0);
    const [titulo, setTitulo] = useState("");
    const [subTitulo, setSubTitulo] = useState("");
    const [valorQR, setValorQR] = useState(null);

    const [imagem, setImg] = useState("https://placehold.co/100x100");

    const [displayError, setDisplayError] = useState('none');
    const [displaySuccess, setDisplaySuccess] = useState('none');
    const [msgError, setMsgError] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState(null);

    function geraQR() {

        if (valorQR) {

            setImg(`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${valorQR}`);
            setDisplaySuccess('block');
            setMsgSuccess("Qr-code gerado com sucesso!");
            setDisplayError("none");
            setMsgError(null)
            setValorQR("")
        } else {
            setDisplayError('block');
            setMsgError("Cole o link para gerar Qr-code!")
            setDisplaySuccess("none");
            setMsgSuccess(null)

        }



    }

    return (
        <div class="container mt-2 produtos">
            <div style={{ maxWidth: '800px', height: '500px' }} class="container text-center table-responsive card d-flex  align-self-center justify-content-start" >


                <h3 className="mb-2 text-start mt-2 pb-2 ">GEN <i class="bi bi-qr-code"></i> QR</h3>
                
                <table id="printJS-form" class="table align-middle " >
                    <tr class="align-middle">
                        <td className='text-center'>
                            <div class="d-flex align-items-center justify-content-center align-middle">
                                <img src={thumb_logo} width={tamLogo} />
                            </div>
                        </td>
                    </tr>
                    <tr class="align-middle">
                        <td className='text-center'>
                            <div class="qrcodeContent m-4 d-flex align-items-center justify-content-center m-0 p-0">
                                <img id="qrcode" className='card p-2 border' src={imagem} width={tamW ?? 340} />
                            </div>
                        </td>
                    </tr>
                    <tr class="align-middle">
                        <td>
                            <div class="text-center m-0 p-0">
                                <h5 class="text-center">{titulo ?? titulo}</h5>
                                <p class="text-center">{subTitulo ?? subTitulo}</p>
                            </div>
                        </td>
                    </tr>

                </table>




            </div>

            <div class="container  card mt-4 " style={{ maxWidth: '800px' }}>



                <div class="alert mt-3 alert-success alert-dismissible fade show" style={{ display: displaySuccess }} role="alert">
                    <i class="bi bi-check-circle p-2"></i>
                    {msgSuccess !== null && msgSuccess}

                </div>
                <div class="alert  mt-3 alert-danger alert-dismissible fade show" style={{ display: displayError }} role="alert">
                    <i class="bi bi-exclamation-triangle p-2"></i>
                    {msgError !== null && msgError}

                </div>
                
                <div class="input-group mt-3  w-100 ">
                    <input type="text" class="form-control" value={titulo} placeholder="Titulo" onChange={(e) => { setTitulo(e.target.value) }} aria-label="Example text with button addon" aria-describedby="button-addon1" />

                </div>
                <div class="input-group mt-3  w-100 ">
                    <input type="text" class="form-control" value={subTitulo} placeholder="SubTitulo" onChange={(e) => { setSubTitulo(e.target.value) }} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                </div>
                <div class="input-group mt-3  w-100 ">
                    <span class="input-group-text" id="basic-addon2">@example.com</span>
                    <input type="text" class="form-control" value={valorQR} placeholder="Cole o link" onChange={(e) => { setValorQR(e.target.value) }} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    
                </div>
                
                <div class="input-group mt-3  w-100 ">
                    <label for="range4" class="form-label">Aumentar logo</label>
                    <input type="range" class="form-range" min="0" max="500" value={tamLogo} onChange={(e) => { setTamLogo(e.target.value) }} id="range4" />

                    <output for="range4" id="rangeValue" aria-hidden="true"><small>Largura {tamLogo}px  </small></output>
                </div>
                <div class="input-group mt-3 mb-4 w-100 ">
                    <label for="qrcode" class="form-label">Aumentar QR CODE:</label>
                    <input type="range" class="form-range " min="50" max="500" value={tamW} onChange={(e) => { setTamW(e.target.value) }} id="qrcode-w" />
                    <output id="qrcode-w lh-1" aria-hidden="true"><small>Largura {tamW}px </small></output>
                </div>
                <div class="input-group mt-3  mb-4 " >
                    <button class="btn btn-secondary w-50" type="button" onClick={() => { geraQR() }} value="gerar" ><i class="bi fs-5 bi-arrow-repeat"></i> Gerar QR</button>
                    <button className='btn btn-sm btn-primary w-50' onClick={() => { printJS('printJS-form', 'html') }}><i class="bi bi-printer-fill fs-5"></i>  Imprimir</button>
                </div>
               
            </div>
        </div>
    )
}
export default QRCode;