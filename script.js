let progresso = 0;

let intervaloCeu = null;

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
