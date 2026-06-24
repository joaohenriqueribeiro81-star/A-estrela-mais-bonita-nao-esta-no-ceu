let progresso = 0;

let intervaloCeu = null;

const inicio = new Date("2025-12-28T17:40:00");

const ordem = [
    "estrela1",
    "estrela2",
    "estrela3",
    "estrela4",
    "estrela5",
    "estrela6"
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
    });
}

function iniciarCeu(){

    if(intervaloCeu) return;

    console.log("ceu iniciado");

    intervaloCeu = setInterval(criarEstrela, 400);

    let 
}

function resetarProgresso(){

    progresso = 0;

    console.log("resetou");
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
    }
}

function abrirCartaFinal(){

    const carta = document.querySelector(".cartaFinal");
    console.log("Abriu");

    carta.style.opacity = 1;
    carta.style.transform = "translate(-50%, -50%) scale(1)";
    carta.style.pointerEvents = "auto";
}

function fecharCarta(){

    const carta = document.querySelector(".cartaFinal");
    console.log("fechou");

    carta.style.opacity = 0;
    carta.style.transform = "translate(-50%, -50%) scale(0.8)";
    carta.style.pointerEvents = "none";
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

setInterval(atualizarContador,1000);

atualizarContador();
