const ordem = [
    "estrela1",
    "estrela2",
    "estrela3",
    "estrela4",
    "estrela5",
    "estrela6"
];

function criarEstrela(){
    console.log("criando estrela");

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
    console.log("ceu iniciado");

    setInterval(criarEstrela, 400);
}

function marcarEstrela(nome){

    const esperado = ordem[progresso];

    if(nome !== esperado){
        return; // ignorar se não for a próxima da sequência
    }

    progresso++;

    if(progresso === ordem.length){
        iniciarCeu();
    }
}
