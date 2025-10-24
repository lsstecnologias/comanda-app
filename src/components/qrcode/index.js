
import { useContext, useState } from 'react';
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
    const [tamLogo, setTamLogo] = useState(0);
    const [tamW, setTamW] = useState(0);
    const [tamH, setTamH] = useState(0);
    const { sessao, status, redirect_login, thumb_logo, Sair } = useContext(UserContext);
    function geraQR() {
        const input = document.querySelector("input");
        const qrcode = document.querySelector("#qrcode");
        if (input.value ) {

            qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${input.value}`;

        } else {
            alert("ERRO")
            return
        }



    }

    return (
        <div class="container-fluid mt-3 produtos">
            <div style={{ maxWidth: '800px' }} class="container text-center  card">

                <div class="container logo m-4">
                    <img className='img-fluid ' src={thumb_logo} width={tamLogo} />
                </div>
                <div class="container qrcodeContent m-4 d-flex align-items-center justify-content-center  ">
                    <img id="qrcode" className='card p-2' src="" width={tamW ?? 340} />
                </div>

                <div class="container logo mb-4">
                  <p>texto</p>
                  <p>texto</p>
                </div>
            </div>

            <div class="container  card mt-4 " style={{ maxWidth: '800px' }}>
                <div class="input-group mt-3" >
                    <button className='btn btn-sm btn-primary'><i class="bi bi-printer-fill fs-5"></i>  Imprimir</button>
                </div>
                <div class="input-group mt-3  w-100 ">
                    <label for="range4" class="form-label">Aumentar logo</label>
                    <input type="range" class="form-range" min="0" max="500" value={tamLogo} onChange={(e) => { setTamLogo(e.target.value) }} id="range4" />

                    <output for="range4" id="rangeValue" aria-hidden="true">{tamLogo}</output>
                </div>
                <div class="input-group mt-3  w-100 ">
                    <label for="qrcode" class="form-label">Aumentar QR CODE:</label>
                    <input type="range" class="form-range mb-4" min="0" max="500" value={tamW} onChange={(e) => { setTamW(e.target.value) }} id="qrcode-w" />
                    <output id="qrcode-w" aria-hidden="true">Largura {tamW}px</output>

                   


                    
                </div>
                <div class="input-group mt-3  w-100 ">
                    <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                </div>

                <div class="input-group w-100 mt-3 mb-4">
                    <button class="btn btn-secondary w-100" type="button" onClick={() => { geraQR() }} value="gerar" id="button-addon1"><i class="bi fs-5 bi-arrow-repeat"></i> Gerar QR</button>

                </div>
            </div>
        </div>
    )
}
export default QRCode;