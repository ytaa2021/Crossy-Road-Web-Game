
var trailerMusic = new Audio('../media/audio/bunny.wav');

function playVideo() {
    const dStream = document.getElementById('vidStream');
    if(dStream.paused) {
        trailerMusic.play();
        dStream.play();
    }
}
function pauseVideo() {
    const dStream = document.getElementById('vidStream');
    if(!dStream.paused) {
        console.log("pausando");
        dStream.pause();
    }

    trailerMusic.pause();
    
}
