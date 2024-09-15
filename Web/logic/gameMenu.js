function startMenu() {
    var canvas = document.getElementById("juego_placeholder");
    var menuPlaceHolder = document.getElementById("menu_placeholder");
    if (!menuPlaceHolder) {
        menuPlaceHolder = document.createElement("div");
        menuPlaceHolder.id = "menu_placeholder";
    }
    canvas.appendChild(menuPlaceHolder);

    // Propiedades Generales del menú
    menuPlaceHolder.style.position = "absolute";
    menuPlaceHolder.style.backgroundColor = "rgb(78, 70, 115)";
    menuPlaceHolder.style.backgroundImage = "url('../media/img/menuImg.png')";
    menuPlaceHolder.style.backgroundSize = "25rem";
    menuPlaceHolder.style.backgroundRepeat = "no-repeat";
    menuPlaceHolder.style.backgroundPosition = "right";
    menuPlaceHolder.style.width = "1000px";
    menuPlaceHolder.style.height = "500px";
    menuPlaceHolder.style.borderRadius = "10px";
    menuPlaceHolder.style.fontFamily = "'Jersey 20', sans-serif";

    var titulo = document.createElement("h1");
    titulo.textContent = "¡Que no te atropellen!";
    titulo.style.fontSize = "5rem";
    titulo.style.color = "rgb(12, 12, 151)";
    titulo.style.position = "absolute";
    titulo.style.marginLeft = "50px";
    titulo.style.marginTop = "60px";
    menuPlaceHolder.appendChild(titulo);

    var botonComenzar = document.createElement("button");
    botonComenzar.textContent = "Comenzar";
    botonComenzar.style.position = "absolute";
    botonComenzar.style.marginLeft = "220px";
    botonComenzar.style.marginTop = "200px";
    botonComenzar.style.borderRadius = "10px";

    botonComenzar.style.fontFamily = "'Jersey 20', sans-serif";
    botonComenzar.style.fontSize = "2rem";
    // On hover css
    botonComenzar.classList.add("menuButton");

    var imagenDebajo = document.createElement("img");
    imagenDebajo.src = "./../media/img/awsd.png"; 
    imagenDebajo.style.position ="absolute";
    imagenDebajo.style.width = "200px"; 
    imagenDebajo.style.height = "auto";  
    imagenDebajo.style.marginTop = "240px";
    imagenDebajo.style.width ="30%";  
    imagenDebajo.style.marginLeft = "220px"; 
    menuPlaceHolder.appendChild(imagenDebajo);

    botonComenzar.onclick = startTrailer;
    menuPlaceHolder.appendChild(botonComenzar);
}

function endMenu(score){
    var canvas = document.getElementById("juego_placeholder");
    var menuPlaceHolder = document.getElementById("menu_placeholder");
    if (!menuPlaceHolder) {
        menuPlaceHolder = document.createElement("div");
        menuPlaceHolder.id = "menu_placeholder";
    }
    canvas.appendChild(menuPlaceHolder);

    // Propiedades Generales del menú
    menuPlaceHolder.style.position = "absolute";
    menuPlaceHolder.style.backgroundColor = "rgb(0, 0, 10, 0.4)";
    menuPlaceHolder.style.width = "1000px";
    menuPlaceHolder.style.height = "500px";
    menuPlaceHolder.style.borderRadius = "10px";
    menuPlaceHolder.style.fontFamily = "'Jersey 20', sans-serif";

    var titulo = document.createElement("h1");
    titulo.textContent = "¡Has ganado!";
    titulo.style.fontSize = "5rem";
    titulo.style.color = "white";
    titulo.style.position = "absolute";
    titulo.style.marginLeft = "310px";
    titulo.style.marginTop = "60px";
    menuPlaceHolder.appendChild(titulo);

    var puntuacion = document.createElement("h1");
    puntuacion.textContent = score;
    puntuacion.style.fontSize = "5rem";
    puntuacion.style.color = "white";
    puntuacion.style.position = "absolute";
    puntuacion.style.marginLeft = "680px";
    puntuacion.style.marginTop = "300px";
    menuPlaceHolder.appendChild(puntuacion);

    var tituloPuntuacion = document.createElement("h1");
    tituloPuntuacion.textContent = "Puntuación :";
    tituloPuntuacion.style.fontSize = "5rem";
    tituloPuntuacion.style.color = "white";
    tituloPuntuacion.style.position = "absolute";
    tituloPuntuacion.style.marginLeft = "280px";
    tituloPuntuacion.style.marginTop = "300px";
    menuPlaceHolder.appendChild(tituloPuntuacion);

    if(level ==1 ){
        var nextLevelButton = document.createElement("button");
        nextLevelButton.textContent = "Siguiente nivel";
        nextLevelButton.style.position = "absolute";
        nextLevelButton.style.marginLeft = "350px";
        nextLevelButton.style.marginTop = "200px";
        nextLevelButton.style.borderRadius = "10px";
        nextLevelButton.style.width = "300px";
    
        nextLevelButton.style.fontFamily = "'Jersey 20', sans-serif";
        nextLevelButton.style.fontSize = "2rem";
        // On hover css
        nextLevelButton.classList.add("menuButton"); // Añadir clase CSS para el efecto de hover
    
        nextLevelButton.onclick = levelTwo;
        
        menuPlaceHolder.appendChild(nextLevelButton);
    }
    else if (level == 2){
        var finText = document.createElement("h1");
        finText.textContent = "¡Gracias por jugar!";
        finText.style.fontSize = "5rem";
        finText.style.color = "white";
        finText.style.position = "absolute";
        finText.style.marginLeft = "240px";
        finText.style.marginTop = "180px";
        menuPlaceHolder.appendChild(finText);
    }

}
