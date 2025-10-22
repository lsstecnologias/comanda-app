function genQRCode() {
    const input = document.querySelector("input");
const qrcode = document.querySelector("#qrcode");
  if (!input.value) return;

  qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${input.value}`;
}
    const qrcode = require('wifi-qr-code-generator');

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

   
   
const QRCode = () => {
    //dimensao-logomarca-valor-http://localhost:3001/?mesa=3
    return (
        <div class="container-fluid mt-3 produtos">
            <div class="container">
                <input placeholder="Escreva aqui" /> 
                <input type="button" onclick="genQRCode()" value="gerar"/>
                    <div class="qrcodeContent">
                        <img id="qrcode" src=""/>
                    </div>
                
            </div>

        </div>
    )
}
export default QRCode;