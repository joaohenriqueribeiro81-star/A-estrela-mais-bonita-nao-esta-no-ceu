
function criarEstrela(){

    const estrela = document.createElement("img");

    estrela.src = "estrelaa.png";

    estrela.classList.add("decorativa");

    estrela.style.left = Math.random() * 95 + "%";

    estrela.style.top = Math.random() * 95 + "%";

    document.body.appendChild(estrela);

    estrela.addEventListener("animationend", ()=>{

        estrela.remove();

    });

}

criarEstrela();


