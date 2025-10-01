function genQRCode() {
    const input = document.querySelector("input");
const qrcode = document.querySelector("#qrcode");
  if (!input.value) return;

  qrcode.src = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${input.value}`;
}
const QRCode = () => {
    //dimensao-logomarca-valor-http://localhost:3001/?mesa=3
    return (
        <div>
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