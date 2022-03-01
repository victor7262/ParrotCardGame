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

let qtdCartas = 0;

//init();

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
			qtdCartas = Number(qtd);
	} while (qtdCartas == 0);

	renderizarCartas(qtdCartas);
}

function renderizarCartas(qtd) {
	cartasDaPartida = montarArrCartasDaPartida(qtd);

	for (let index = 0; index < cartasDaPartida.length; index++) {
		adicionarCartaNaTela(cartasDaPartida[index]);
	}
}

function montarArrCartasDaPartida(qtd) {
	let arr = [];
	let qtdCartasDiferentes = qtd / 2;

	for (let index = 0; index < qtdCartasDiferentes; index++) {
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

	let NovaCartaHtml = `<div class="carta">
<div class="frente face">
	<img src="./src/img/front.png" alt="" />
</div>
<div class="costa face">
	<img src="./src/img/${nomeDaImagem}.gif" />
</div>
</div>`;

	lista.innerHTML += NovaCartaHtml;
}
