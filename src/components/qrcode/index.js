
import { useContext } from 'react';
import { UserContext } from '../context';

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
    const { sessao, status, redirect_login, thumb_logo, Sair } = useContext(UserContext);
    async function geraQR() {
        const input = document.querySelector("input");
        const qrcode = document.querySelector("#qrcode");
        if (input.value) {

            qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${input.value}`;

        } else {
            alert("ERRO")
            return
        }



    }
    return (
        <div class="container-fluid mt-3 produtos">
            <div style={{ maxWidth: '800px' }} class="container  card">

                <div class="container logo m-4">
                    <img className='' src={thumb_logo} width={100} />
                </div>
                <div class="container qrcodeContent m-4">
                    <img id="qrcode" src="" />
                </div>


            </div>
            <div class="container  card mt-4 " style={{ maxWidth: '800px' }}>
                <div class="input-group mt-4  w-100 ">
                    <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                </div>

                <div class="input-group w-100 mt-4 mb-4">
                    <button class="btn btn-secondary w-100" type="button" onClick={() => { geraQR() }} value="gerar" id="button-addon1"><i class="bi fs-5 bi-arrow-repeat"></i> Gerar QR</button>

                </div>
            </div>
        </div>
    )
}
export default QRCode;