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

iniciarCeu();
