const cartasDoJogo = [
	"bobrossparrot",
	"explodyparrot",
	"fiestaparrot",
	"metalparrot",
	"revertitparrot",
	"tripletsparrot",
	"unicornparrot",
];

let cartasDaPartida = [];

let qtdCartasRestantes = 0,
	tentativas = 0;

let primeiraCarta = null;
let segundaCarta = null;

init();

function init() {
	do {
		let qtd = prompt("Informe um número par entre 4 e 14 para iniciar:");
		console.log(qtd);
		if (
			Number(qtd) != NaN &&
			Number(qtd) % 2 == 0 &&
			Number(qtd) >= 4 &&
			Number(qtd) <= 14
		)
			qtdCartasRestantes = Number(qtd) / 2;
	} while (qtdCartasRestantes == 0);

	renderizarCartas(qtdCartasRestantes);
}

function renderizarCartas(qtd) {
	cartasDaPartida = montarArrCartasDaPartida(qtd);

	for (let index = 0; index < cartasDaPartida.length; index++) {
		adicionarCartaNaTela(cartasDaPartida[index]);
	}
}

function montarArrCartasDaPartida(qtd) {
	let arr = [];

	for (let index = 0; index < qtd; index++) {
		arr.push(cartasDoJogo[index]);
		arr.push(cartasDoJogo[index]);
	}

	return arr.sort(comparador);
}

function comparador() {
	return Math.random() - 0.5;
}

function adicionarCartaNaTela(nomeDaImagem) {
	const lista = document.querySelector(".lista-de-cartas");

	let NovaCartaHtml = `<div class="carta" onclick="virarCarta(this)">
<div class="frente face">
	<img src="./src/img/front.png" alt="" />
</div>
<div class="divImagem costa face">
	<img class="imagem" src="./src/img/${nomeDaImagem}.gif" />
</div>
</div>`;

	lista.innerHTML += NovaCartaHtml;
}

function virarCarta(e) {
	if (e.classList.contains("completa") || e == primeiraCarta) return;

	e.querySelector(".divImagem").classList.toggle("costa");
	tentativas++;

	if (primeiraCarta == null) {
		primeiraCarta = e;
	} else if (
		primeiraCarta.querySelector(".imagem").src != e.querySelector(".imagem").src
	) {
		segundaCarta = e;
		setTimeout(desvirarCartas, 1000);
	} else {
		e.classList.add("completa");
		primeiraCarta.classList.add("completa");
		primeiraCarta = null;

		verificaFimDeJogo();
	}
}

function verificaFimDeJogo() {
	qtdCartasRestantes--;
	if (qtdCartasRestantes == 0) {
		alert(`Você ganhou em ${tentativas} jogadas!`);

		if (confirm("Você quer compartilhar sua vitória?") == true)
			enviarMensagem();

		if (confirm("Quer jogar novamente?") == true) prepararJogo();
	}
}

function desvirarCartas() {
	primeiraCarta.querySelector(".divImagem").classList.toggle("costa");
	primeiraCarta = null;

	segundaCarta.querySelector(".divImagem").classList.toggle("costa");
	segundaCarta = null;
}

function prepararJogo() {
	document.querySelector(".lista-de-cartas").innerHTML = "";
	cartasDaPartida = [];

	qtdCartasRestantes = 0;
	tentativas = 0;

	primeiraCarta = null;
	segundaCarta = null;

	init();
}

function enviarMensagem() {
	const telefone = "5569999349205";
	const mensagem = `Gustavo, eu ganhei mais uma! :)`;

	const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

	window.open(url, "_blank").focus();
}
