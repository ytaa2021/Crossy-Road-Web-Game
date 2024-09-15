var level = 0;
var trainInterval;
var drawInterval = setInterval("draw()", 10);
var totalScore = 0;

window.onload = function () {
    contexto = cargaContextoCanvas('juego');
    if (contexto) {
        console.log("save");
        contexto.save();  // guarda el contexto limpio de efectos
    }
    startMenu();
}

function startTrailer(){
    var menu = document.getElementById("menu_placeholder");
    var videoStream = document.getElementById("vidStream");
    var trailerMusic = new Audio('../media/audio/bunny.wav');
    if (!videoStream) {
        videoStream = document.createElement("video");
        videoStream.id = "vidStream";
    }
    videoStream.style.position = "absolute";
    videoStream.style.width = "1000px";
    videoStream.style.height = "500px";
    videoStream.style.borderRadius = "10px";
    videoStream.style.backgroundColor = "black";
    var source = document.createElement("source");
    source.src = "/stream"; 
    source.type = "video/ogg"; 
    videoStream.appendChild(source);
    videoStream.play();
    trailerMusic.play();
    videoStream.addEventListener("ended", function() {
        levelOne();
    });

    var skipButton = document.createElement("button");
    skipButton.textContent = "Saltar";
    skipButton.style.position = "absolute";
    skipButton.style.marginLeft = "650px";
    skipButton.style.marginTop = "400px";
    skipButton.style.borderRadius = "10px";
    skipButton.style.fontFamily = "'Jersey 20', sans-serif";
    skipButton.style.fontSize = "2rem";
    skipButton.style.zIndex = "9999";
    skipButton.classList.add("menuButton");
    skipButton.addEventListener("click", function() {
        videoStream.pause();
        trailerMusic.pause();
        levelOne();
    });

    menu.appendChild(videoStream);
    menu.appendChild(skipButton);
} 

function levelOne() {
    var menu = document.getElementById("menu_placeholder");
    var trailer = document.getElementById("vidStream");
    trailer.parentNode.removeChild(trailer);
    menu.parentNode.removeChild(menu);
    // TODO ESTO IRÍA EN EL NIVEL UNO
    window.addEventListener('keydown', playerMovement, true);
    level = 1;
    refreshScoreBoard();
    spawnCoins(5);
    spawnTrain();
    spawnCars();
    spawnLogs();
    // Queremos que se cree un tren cada 8 segundos
    trainInterval = setInterval("spawnTrain()", 8000);
}

function levelTwo(){
    coches = [];
    coins = [];
    treeLogs = [];
    trenes = [];
    var menu = document.getElementById("menu_placeholder");
    menu.parentNode.removeChild(menu);
    window.addEventListener('keydown', playerMovement, true);

    level = 2;
    clearInterval(trainInterval);
    borra_todo();
    refreshScoreBoard();
    spawnCoins(5);
    spawnTrain();
    spawnCars();
    spawnLogs();
    trainInterval = setInterval("spawnTrain()", 8000);

}

function cargaContextoCanvas(idCanvas) {
    elemento = document.getElementById(idCanvas);
    if (elemento && elemento.getContext) {
        contexto = elemento.getContext('2d');
        if (contexto) {
            return contexto;
        }
    }
    return FALSE;
}

function borra_todo() {
    contexto = cargaContextoCanvas('juego');
    if (contexto) {
        contexto.restore();              // restaura el contexto sin efectos
        contexto.clearRect(0, 0, 1000, 500); // borra las figuras
        contexto.save();                 // guarda el contexto limpio de efectos
    }
}



// LOGICA DE PUNTUACIÓN + DOM DEL SCOREBOARD
var score = 0;
function refreshScoreBoard() {
    // Placeholder es un div que contiene el canvas
    var canvas = document.getElementById("juego_placeholder");
    // Verificar si los elementos ya existen
    var placeholder = document.getElementById("scoreboard_placeholder");
    var scoreboard = document.getElementById("scoreboard");
    var coinsCollected = document.getElementById("coins_collected");

    // Si los elementos no existen, crearlos y agregarlos al DOM
    if (!placeholder) {
        placeholder = document.createElement("div");
        placeholder.id = "scoreboard_placeholder";
        scoreboard = document.createElement("p");
        scoreboard.id = "scoreboard";
        coinsCollected = document.createElement("p");
        coinsCollected.id = "coins_collected";


        canvas.appendChild(placeholder);
        placeholder.appendChild(scoreboard);
        placeholder.appendChild(coinsCollected);

        placeholder.style.position = "absolute";
        placeholder.style.paddingLeft = "700px";
        placeholder.style.paddingBottom = "450px";
        placeholder.style.display = "flex";
    }

    // Actualizar el contenido de los elementos
    scoreboard.innerHTML = "SCORE:";
    scoreboard.style.fontFamily = "'Jersey 20', sans-serif";
    scoreboard.style.fontSize = "2rem";
    scoreboard.style.color = "white";

    coinsCollected.innerHTML = score;
    coinsCollected.style.fontFamily = "'Jersey 20', sans-serif";
    coinsCollected.style.fontSize = "2rem";
    coinsCollected.style.color = "white";
    coinsCollected.style.marginLeft = "10px";
}
