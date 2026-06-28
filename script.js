let progresso = 0;

let intervaloCeu = null;

let luaberta = false;

let dialogoRodando = false;

let etapas = {
    casona: false,
    estrelado: false,
    casalzao: false,
    luar: false
};

let chuva = null;

let animacaoIniciada = false;

const inicio = new Date("2025-12-28T17:00:00");

const musica = document.getElementById("musica")

const ordem = [
    "estrela1",
    "estrela2",
    "estrela3",
    "estrela4",
    "estrela5",
    "estrela6"
];

const images = [
  "coracao.png",
  "teamo.png",
  "teamocoracao.png"
];

function criarEstrela(){

    const estrela = document.createElement("img");
    estrela.src = "estrelaa.png";
    estrela.classList.add("decorativa");

    estrela.style.left = Math.random() * 100 + "%";
    estrela.style.top = Math.random() * 100 + "%";

    document.querySelector(".ceu").appendChild(estrela);

    estrela.addEventListener("animationend", () => {
        estrela.remove();

    if (etapas.estrelado) return;
    etapas.estrelado = true;

    verificarConclusao();

    });
}

function iniciarCeu(){

    if(intervaloCeu) return;

    musica.play();

    console.log("ceu iniciado");

    document.getElementById("pEstrela").classList.add("descoberto");

    intervaloCeu = setInterval(criarEstrela, 200);

}

function resetarProgresso(){

    progresso = 0;

    console.log("resetou");

    document.getElementById("pEstrela").classList.add("descoberto");

}

function marcarEstrela(nome){

    const esperado = ordem[progresso];

    if(nome !== esperado){
        resetarProgresso();
        return;
    }

    progresso++;

    if(progresso === ordem.length){
        iniciarCeu();
        luaberta = true;
    }
}

function abrirCartaFinal(){

    resetarPilha(); // <<< ESSA LINHA É A CHAVE

    const carta = document.querySelector(".cartaFinal");

    carta.style.opacity = 1;
    carta.style.pointerEvents = "auto";
    document.getElementById("pCasal").classList.add("descoberto");

    if (etapas.casalzao) return;
    etapas.casalzao = true;

    verificarConclusao();
}

function proximaCarta(el){

    el.style.transform = "translateX(-400px) rotate(-15deg)";
    el.style.opacity = "0";

    setTimeout(() => {
        el.remove();

        const restantes = document.querySelectorAll(".cartaPilha");

        if(restantes.length === 0){
            fecharCarta();
        }

    }, 400);
}

function fecharCarta(){
    const carta = document.querySelector(".cartaFinal");

    carta.style.opacity = 0;
    carta.style.pointerEvents = "none";
}

function resetarPilha(){

    const container = document.querySelector(".cartaFinal");

    const cartas = [
        "pagina1.png",
        "pagina2.png",
        "pagina3.png",
        "pagina4.png"
    ];

    container.innerHTML = "";

    cartas.forEach((src) => {

        const img = document.createElement("img");

        img.src = src;
        img.className = "cartaPilha";
        img.onclick = function(){
            proximaCarta(this);
        };

        container.appendChild(img);
    });
}

function lua(){

    if(luaberta === true){
        const luacarta = document.querySelector(".luacarta");

        luacarta.style.opacity = 1;
        luacarta.style.transform = "translate(-50%, -50%) scale(1)";
        luacarta.style.pointerEvents = "auto";
        document.getElementById("pLua").classList.add("descoberto");
        iniciarDialogo();
        
        if (etapas.luar) return;
        etapas.luar = true;

        verificarConclusao();

    }
}

function luacarta(){

    const luacarta = document.querySelector(".luacarta");

    luacarta.style.opacity = 0;
    luacarta.style.transform = "translate(-50%, -50%) scale(0.8)";
    luacarta.style.pointerEvents = "none";

    dialogoRodando = false;
}

function abrirCasa(){

     const abrirCasa = document.querySelector(".abrirCasa");

    document.getElementById("pCasa").classList.add("descoberto");
    abrirCasa.style.opacity = 1;
    abrirCasa.style.transform = "translate(-50%, -50%) scale(1)";
    abrirCasa.style.pointerEvents = "auto";

    if (etapas.casona) return;
    etapas.casona = true;

    verificarConclusao();

}

function fecharCasa(){

    const abrirCasa = document.querySelector(".abrirCasa");

    abrirCasa.style.opacity = 0;
    abrirCasa.style.transform = "translate(-50%, -50%) scale(0.8)";
    abrirCasa.style.pointerEvents = "none";

}

function fecharMenu(){

    document.querySelector(".menu").style.display = "none";

}

function atualizarContador(){
    const agora = new Date();
    const diferenca = agora - inicio;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / (1000)) % 60);

    document.getElementById("contador").innerHTML =
    `${dias} Dias ${horas} Horas ${minutos} Minutos ${segundos} Segundos`;
}

function verificarConclusao() {
    console.log(etapas);

    if (animacaoIniciada) return;

    if (
        etapas.casona &&
        etapas.casalzao &&
        etapas.luar &&
        etapas.estrelado
    ) {
        animacaoIniciada = true;

        iniciarChuva();

        console.log("Animação chamada");
    }
}

function iniciarChuva() {

    if (chuva) return;

    chuva = setInterval(() => {
        spawnFloatingImage();
    }, 120);

}

function spawnFloatingImage() {

    const layer = document.getElementById("animation-layer");

    const img = document.createElement("img");
    img.classList.add("floating-img");

    // Escolhe uma imagem aleatória
    img.src = images[Math.floor(Math.random() * images.length)];

    // Posição horizontal aleatória
    const x = Math.random() * window.innerWidth;

    // Sempre nasce no chão
    const y = window.innerHeight + 20;

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    // Tamanho inicial aleatório
    const tamanho = 3 + Math.random() * 2;
    img.style.width = `${tamanho}vw`;

    // Velocidade aleatória
    const duration = 3500 + Math.random() * 2500;

    img.style.animationDuration = `${duration}ms`;

    layer.appendChild(img);

    setTimeout(() => {
        img.remove();
    }, duration);
}

setInterval(atualizarContador,1000);

atualizarContador();

const frases = [

"O que é isso João??",

"O que é isso?",

"As alianças chegaram!",

"Mas o que é isso?"

];

function esperar(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

async function escrever(texto){

    const balao = document.getElementById("balao");

    balao.innerHTML = "";

    for(const letra of texto){

        balao.innerHTML += letra;

        await esperar(45);

    }

}

async function mostrarBalao(texto){

    const balao = document.getElementById("balao");

    balao.style.opacity = 1;

    balao.style.transform = "translateX(-50%) scale(1)";

    await escrever(texto);

    await esperar(2000);

    balao.style.opacity = 0;

    balao.style.transform = "translateX(-50%) scale(.8)";

    await esperar(600);

}

async function iniciarDialogo(){

    if(dialogoRodando) return;

    dialogoRodando = true;

    while(dialogoRodando){

        for(const frase of frases){

            if(!dialogoRodando) return;

            await mostrarBalao(frase);

            await esperar(1000);
        }

        await esperar(3000);
    }

}
