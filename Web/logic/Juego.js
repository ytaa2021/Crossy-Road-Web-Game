// LOGICA DEL JUGADOR

//importes de audio

var deathSoundEffect = new Audio('../media/audio/Glass.wav');
var coinSoundEffect = new Audio('../media/audio/CoinAudio.wav');
var moveSoundEffect = new Audio('../media/audio/MoveAudio.wav');
var Victory = new Audio('../media/audio/Victory.wav');
moveSoundEffect.volume = .5;
deathSoundEffect.volume = .5;
Victory.volume = .3;

//funcion de ayudar con audio playback

function playSoundEffect(sound) {
    if (sound.paused) {
        sound.play();
    } else {
        sound.currentTime = 0;
    }
}

player = {
    x: 10, //10
    y: 225,
    width: 62.5,
    height: 25,
}
player.img = new Image();
player.img.src = "./../media/img/pato.png";

function playerHit() {
    deathSoundEffect.play();
    player.x = 10;
    player.y = 225;
    coins = []
    spawnCoins(5);
    score = 0;
    refreshScoreBoard();
}

function playerMovement() {

    keycode = window.event.keyCode;
    switch (keycode) {
        case 40: //abajo
            if (player.y < (board.height - player.height)) {
                player.y += 20;
            }
            playSoundEffect(moveSoundEffect)

            break;
        case 39: //derecha
            if (player.x < (board.width - player.width)) {
                player.x += 20;
            }
            playSoundEffect(moveSoundEffect)
            break;
        case 38: //arriba
            if (player.y > 0) player.y -= 20;
            playSoundEffect(moveSoundEffect)
            break;
        case 37: //izquierda
            if (player.x > 0) player.x -= 20;
            playSoundEffect(moveSoundEffect)
            break;
        default:
            break;
    }
}

function drawPlayer() {
    contexto = cargaContextoCanvas("juego");
    if (contexto) {
        contexto.drawImage(player.img, player.x, player.y, player.width, player.height);
    }
}



// LOGICA DE LOS COCHES
var coche = function (speed, type, x, y) {
    this.speed = speed;
    this.type = type;
    switch (type) {
        case 0:
            this.height = 70;
            this.width = 35;
            this.imgSrc = "./../media/img/coche.png";
            this.x = x;
            this.y = y;
            break;
        case 1:
            this.height = 100;
            this.width = 38;
            this.imgSrc = "./../media/img/camion.png";
            this.x = x;
            this.y = y;
            break;
    }
    this.img = new Image();
    this.img.src = this.imgSrc;
}
coche.prototype.moveAndDraw = function (contexto, orientation) {
    if (contexto) {
        // Guarda el estado actual del contexto antes de realizar rotaciones
        contexto.save();
        if (this.type == 0) {
            var centerX = this.x + 70 / 2;
            var centerY = this.y + 35 / 2;
        }
        if (this.type == 1) {
            var centerX = this.x + 100 / 2;
            var centerY = this.y + 38 / 2;
        }
        contexto.translate(centerX, centerY);
        //Depende de la orientación que queramos
        // Hacia abajo
        if (orientation == "down") {
            contexto.rotate(3 * Math.PI / 2);
        }

        // Hacia arriba
        if (orientation == "up") {
            contexto.rotate(Math.PI / 2);

        }
        contexto.translate(-centerX, -centerY);

        // Hacia abajo
        if (orientation == "down") {
            this.y += this.speed;
            if (this.y - this.width > board.height) {
                this.y = -this.width;
            }
        }

        // Hacia arriba
        if (orientation == "up") {
            this.y -= this.speed;
            if (this.y + this.width < 0) {
                this.y = this.width + board.height;
            }
        }
        // HEMOS TENIDO QUE ARREGLAR MANUALMENTE UN POCO LAS DIMENSIONES DE LOS COCHES AL NO COINCIDIR CON LAS HITBOXES
        if (this.type == 0) {
            contexto.drawImage(this.img, this.x, this.y, 70, 35);
        }
        else if (this.type == 1) {
            contexto.drawImage(this.img, this.x, this.y, 100, 38);
        }

        contexto.restore();
    }
}

function drawCar(orientation, coche) {
    contexto = cargaContextoCanvas("juego");
    coche.moveAndDraw(contexto, orientation);
}

var coches = [];
function spawnCars() {
    if (level == 1) {
        coches.push(new coche(3, 0, 110, -50));
        coches.push(new coche(3, 0, 110, 150));
        coches.push(new coche(1, 0, 175, 0));
        coches.push(new coche(1, 0, 175, 300));
        coches.push(new coche(2, 1, 280, -50));
        coches.push(new coche(2, 1, 340, -50));
    }
    else if (level == 2) {
        coches.push(new coche(3, 0, 110, -50));
        coches.push(new coche(3, 0, 110, 150));
        coches.push(new coche(1, 0, 175, 0));
        coches.push(new coche(1, 0, 175, 300));
        coches.push(new coche(2, 1, 458, -50));
        coches.push(new coche(3.5, 1, 520, -50));
        coches.push(new coche(1, 0, 660, -50));
        coches.push(new coche(1.2, 0, 590, 20));
        return;
    }
}




// LOGICA DE LAS MONEDAS
var Coin = function (x, y) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = "./../media/img/coin.png";
    this.width = 25;
    this.height = 30;
    this.collected = 0;
}
Coin.prototype.stateAndDraw = function (contexto) {
    if (contexto) {
        contexto.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    coins = coins.filter(function (coin) {
        return coin.collected === 0; // Devuelve true para mantener la moneda si collected es igual a 0
    });
}
function spawnCoins(number) {
    var x = 0;
    var y = 0;
    for (var i = 0; i < number; i++) {
        x = Math.floor(Math.random() * (board.width - 40 + 1)) + 40;
        y = Math.floor(Math.random() * (board.height - 10 + 1)) + 10;
        coins.push(new Coin(x, y));
    }
}
var coins = []


// LOGICA DE LOS TRENES
var Train = function (speed, x, y) {
    this.speed = speed;
    this.height = 2733;
    this.width = 38;
    this.img = new Image();
    this.img.src = "./../media/img/trenUp.png";
    this.x = x;
    this.y = y;
}
Train.prototype.moveAndDraw = function (contexto, orientation) {
    if (contexto) {
        contexto.drawImage(this.img, this.x, this.y, 38, 2733);
        this.y -= this.speed;
    }
    trenes = trenes.filter(function (tren) {
        return tren.y >= -2800; // Eliminamos los trenes si salen del canvas (no queremos infinitos trenes)
    });
}

function spawnTrain() {
    //Creamos una instancia del tren
    var nuevoTren = new Train(6, 510, board.height);
    var nuevoTren2 = new Train(6, 610, board.height);

    trenes.push(nuevoTren);
    trenes.push(nuevoTren2)
}
var trenes = [];

// LOGICA DEL TRONCO: Solo vamos a tener uno que vaya de arriba a abajo
function TreeLog(x, y, speed) {
    this.x = x;
    this.y = y;
    this.height = 250;
    this.width = 210;
    this.img = new Image();
    this.src = "../media/img/tronco.png";
    this.speed = speed;
    this.img.src = this.src;
    this.MoveAndDraw = function (context) {
        if (context) {
            context.drawImage(this.img, this.x, this.y, this.width, this.height);
            this.y += this.speed;
            if (this.y - this.width > board.height) {
                this.y = -this.height;
            }
        }
    };
}
var treeLogs = [];
function spawnLogs() {
    switch (level) {
        case 1:
            treeLogs.push(new TreeLog(730, 0, 3));
            break;
        case 2:
            treeLogs.push(new TreeLog(730, 0, 3));
            treeLogs.push(new TreeLog(240, 0, 2));
            break;

    }
}

// Vamos a hacer una colisión especifica para el tronco y el agua.
function checkCollisionLog() {
    // LIMITES DEL JUGADOR
    var playerLeft = player.x + 10;
    var playerRight = player.x + player.width - 10;
    var playerTop = player.y + 10;
    var playerBottom = player.y + player.height - 10;

    for (var i = 0; i < treeLogs.length; i++) {

        // LIMITES DEL TRONCO
        var logLeft = treeLogs[i].x + 45;
        var logRight = treeLogs[i].x + treeLogs[i].width - 30;
        var logTop = treeLogs[i].y;
        var logBottom = treeLogs[i].y + treeLogs[i].height;

        // Logica: si esta por encima o por debajo de los límites del tronco, el pato muere. Si está en los límites del tronco verticales, el pato vive. para ello se debe cumplir que el pato se encuentre dentro del ancho del tronco .
        if (playerLeft < logRight && playerRight > logLeft && playerTop < logBottom && playerBottom > logTop) {
            player.y += treeLogs[i].speed;
        }
        else if (playerLeft < logRight && playerRight > logLeft) {
            if (playerTop > logBottom || playerBottom < logBottom) {
                playerHit();
            }
        }

        // Comprobar que el jugador no se salga (movimiento del tronco y bug fixing)
        if (playerBottom < 0 || playerTop > board.height + 10) {
            playerHit();
        }

    }

}





// LOGICA DEL CANVAS
board = {
    height: 500,
    width: 1000

}
board.img = new Image();
board.img.src = "./../media/img/lvl1hd.png";
board.img2 = new Image();
board.img2.src = "./../media/img/lvl2.png";


function draw() {
    switch (level) {
        // Contenido para el nivel uno
        case 0:
            break;
        case 1:
            borra_todo();
            drawBoard();
            checkCollisionLog();
            for (var i = 0; i < treeLogs.length; i++) {
                contexto = cargaContextoCanvas("juego");
                treeLogs[i].MoveAndDraw(contexto);
            }
            drawPlayer();
            if (checkCollision()) {
                playerHit();
            }

            for (var i = 0; i < coins.length; i++) {
                contexto = cargaContextoCanvas("juego");
                coins[i].stateAndDraw(contexto);
            }
            drawCar("up", coches[0]);
            drawCar("up", coches[1]);
            drawCar("down", coches[2]);
            drawCar("down", coches[3]);
            drawCar("down", coches[4]);
            drawCar("up", coches[5]);
            for (var i = 0; i < trenes.length; i++) {
                contexto = cargaContextoCanvas("juego");
                trenes[i].moveAndDraw(contexto, "up");
            }

            checkCollisionCheckpoint(score);
            break;
        case 2:
            //CONTENIDO NIVEL 2
            borra_todo();
            drawBoard();
            checkCollisionLog();
            for (var i = 0; i < treeLogs.length; i++) {
                contexto = cargaContextoCanvas("juego");
                treeLogs[i].MoveAndDraw(contexto);
            }
            drawPlayer();
            if (checkCollision()) {
                playerHit();
            }
            for (var i = 0; i < coins.length; i++) {
                contexto = cargaContextoCanvas("juego");
                coins[i].stateAndDraw(contexto);
            }
            drawCar("up", coches[0]);
            drawCar("up", coches[1]);
            drawCar("down", coches[2]);
            drawCar("down", coches[3]);
            drawCar("down", coches[4]);
            drawCar("up", coches[5]);
            drawCar("down", coches[6]);
            drawCar("up", coches[7]);
            console.log(coches.length);
            checkCollisionCheckpoint(score);

            break;

            break;

    }

}

function drawBoard() {
    contexto = cargaContextoCanvas("juego");
    if (contexto) {
        if (level == 1) {
            contexto.drawImage(board.img, 0, 0, board.width, board.height);
        }
        if (level == 2) {
            contexto.drawImage(board.img2, 0, 0, board.width, board.height);
        }

    }
}





// LOGICA DE COLISIONES

//Descripción: queremos tener un tratamiento distinto para cada tipo de objeto. Los coches tienen un patrón determinado pero los trenes se repiten en el tiempo. En cambio las monedas son aleatorias y necesitamos contar la puntuación.

function checkCollision() {

    // Calcular los límites del jugador. Retocado para ajustar las hitboxes.
    var playerLeft = player.x + 10;
    var playerRight = player.x + player.width - 20;
    var playerTop = player.y + 10;
    var playerBottom = player.y + player.height - 10;


    // Colisión con coches
    for (var i = 0; i < coches.length; i++) {
        var coche = coches[i];
        // Calcular los límites de los coches. Nota: retocado para ajustar las hitboxes.
        var cocheLeft = coche.x + 20;
        var cocheRight = coche.x + coche.width + 20;
        var cocheTop = coche.y - 15;
        var cocheBottom = coche.y + coche.height - 20;
        // Verificar si hay colisión entre el jugador y el coche actual
        if (playerRight > cocheLeft &&
            playerLeft < cocheRight &&
            playerBottom > cocheTop &&
            playerTop < cocheBottom) {
            return true;
        }
    }

    // Colisión con trenes
    for (var i = 0; i < trenes.length; i++) {
        var tren = trenes[i];
        // Calcular los límites de los coches. Nota: retocado para hacerlo más sencillo.
        var trenLeft = tren.x;
        var trenRight = tren.x + tren.width;
        var trenTop = tren.y;
        var trenBottom = tren.y + tren.height;

        // Verificar si hay colisión entre el jugador y el coche actual
        if (playerRight > trenLeft &&
            playerLeft < trenRight &&
            playerBottom > trenTop &&
            playerTop < trenBottom) {
            return true;
        }
    }

    // Colisión con monedas
    for (var i = 0; i < coins.length; i++) {
        var moneda = coins[i];
        // Calculamos los limites de la moneda
        var coinLeft = moneda.x;
        var coinRight = moneda.x + moneda.width;
        var coinTop = moneda.y;
        var coinBottom = moneda.y + moneda.height;
        if (playerRight > coinLeft &&
            playerLeft < coinRight &&
            playerBottom > coinTop &&
            playerTop < coinBottom) {
            coins[i].collected = 1;
            score++;
            playSoundEffect(coinSoundEffect);
            refreshScoreBoard();

        }
    }
    // No hay colisión con coches
    return false;
}

// LOGICA DE LA BANDERA
const checkPoint = {
    x: board.width - 50,
    y: board.height / 2 - 30,
    height: 30,
    width: 50,

};
function checkCollisionCheckpoint() {
    // LIMITES DEL JUGADOR
    var playerLeft = player.x + 10;
    var playerRight = player.x + player.width - 10;
    var playerTop = player.y + 10;
    var playerBottom = player.y + player.height - 10;

    // LIMITES DEL checkpoint
    var CLeft = checkPoint.x;
    var CRight = checkPoint.x + checkPoint.width;
    var CTop = checkPoint.y;
    var CBottom = checkPoint.y + checkPoint.height;

    if (playerRight > CLeft &&
        playerLeft < CRight &&
        playerBottom > CTop &&
        playerTop < CBottom) {
        totalScore += score;
        endMenu(totalScore);
        Victory.play();
        player.x = 10;
        player.y = 225;
        return true;

    }
}


