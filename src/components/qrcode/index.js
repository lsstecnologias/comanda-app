
import { useContext, useState } from 'react';
import { UserContext } from '../context';
import printJS from "print-js";
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


	function getPrint() {
		printJS({
			printable: "my-print",
			type: "html",
			targetStyles: ["*"],
			style: ".special-element { visibility: visible; }"
		});
	}
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
	//https://placehold.co/50x50
	return (
		<div class="container mt-2 produtos">
			<div style={{ width: '800px', height: '600px' }} class="container text-center  card d-flex  align-self-center justify-content-around" >

				<div class="container-fluid d-flex align-items-center justify-content-around" id="my-print" >
					<div class="d-none flex-column ">
						<div class="row">
							<div class="col-sm-12">
								<img src="https://placehold.co/150x100" />
							</div>
						</div>
						<div class="row mt-4">
							<div class="col-sm-12">
								<img src="https://placehold.co/150x100" />
							</div>
						</div>
						<div class="row mt-4">
							<div class="col-sm-12">
								<img src="https://placehold.co/150x100" />
							</div>
						</div>
						<div class="row mt-4">
							<div class="col-sm-12">
								<img src="https://placehold.co/150x100" />
							</div>
						</div>

					</div>

					<div class="d-flex align-items-center justify-content-center flex-column">
						<img src={thumb_logo} width={tamLogo} class="mb-4" />
						<div class="qrcodeContent">
							<img id="qrcode" className='card p-2 border' src={imagem} width={tamW ?? 340} />
						</div>
						<div class="text-center mt-4 p-0">
							<h1 class="fw-bolder text-uppercase">{titulo ?? titulo}</h1>
							<h2 class="fw-bolder">{subTitulo ?? subTitulo}</h2>
						</div>
					</div>



					<div class="d-none flex-column">
						<div class="row">
							<div class="col-sm-12">
								<img src="https://placehold.co/150x100" />
							</div>
						</div>
						<div class="row mt-4">
							<div class="col-sm-12">
								<img src="https://placehold.co/150x100" />
							</div>
						</div>
						<div class="row mt-4">
							<div class="col-sm-12">
								<img src="https://placehold.co/150x100" />
							</div>
						</div>
						<div class="row mt-4">
							<div class="col-sm-12">
								<img src="https://placehold.co/150x100" />
							</div>
						</div>

					</div>






				</div>





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
					<label for="range4" class="form-label">Aumentar logo</label>
					<input type="range" class="form-range" min="0" max="500" value={tamLogo} onChange={(e) => { setTamLogo(e.target.value) }} id="range4" />

					<output for="range4" id="rangeValue" aria-hidden="true"><small>Largura {tamLogo}px  </small></output>
				</div>
				<div class="input-group mt-3 mb-4 w-100 ">
					<label for="qrcode" class="form-label">Aumentar QR CODE:</label>
					<input type="range" class="form-range " min="50" max="500" value={tamW} onChange={(e) => { setTamW(e.target.value) }} id="qrcode-w" />
					<output id="qrcode-w lh-1" aria-hidden="true"><small>Largura {tamW}px </small></output>
				</div>

				<div class="input-group mt-3  w-100 ">
					<span class="input-group-text" id="basic-addon2">Titulo 1</span>
					<input type="text" class="form-control" value={titulo} placeholder="Titulo" onChange={(e) => { setTitulo(e.target.value) }} aria-label="Example text with button addon" aria-describedby="button-addon1" />

				</div>

				<div class="input-group mt-3  w-100 ">
					<span class="input-group-text" id="basic-addon2">Titulo 2</span>
					<input type="text" class="form-control" value={subTitulo} placeholder="SubTitulo" onChange={(e) => { setSubTitulo(e.target.value) }} aria-label="Example text with button addon" aria-describedby="button-addon1" />
				</div>
				<div class="input-group mt-3  w-100 ">
					<span class="input-group-text" id="basic-addon2">URL Mesa</span>
					<input type="text" class="form-control" value={valorQR} placeholder="Cole o link" onChange={(e) => { setValorQR(e.target.value) }} aria-label="Example text with button addon" aria-describedby="button-addon1" />

				</div>


				<div class="input-group mt-3 mb-4">
					<button class="btn btn-secondary w-50" type="button" onClick={() => { geraQR() }} value="gerar" ><i class="bi fs-5 bi-arrow-repeat"></i> Gerar QR</button>
					<button className='btn btn-sm btn-primary w-50' onClick={() => { getPrint() }}><i class="bi bi-printer-fill fs-5"></i>  Imprimir</button>
				</div>

			</div>
		</div>
	)
}
export default QRCode;