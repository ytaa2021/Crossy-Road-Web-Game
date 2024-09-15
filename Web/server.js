var express = require('express')
var http = require('http')
var net = require('net');
var child = require('child_process');

var app = express();
var httpServer = http.createServer(app);


app.use(express.static('../Web'));


// El servidor nos maneja a la petición de la raíz, y desde ahí nos podrá devolver el resto de páginas. 

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


// En esta ruta estaremos enviando el flujo multimedia. Esta ruta será llamada cuando entremos en la página de Multimedia
app.get('/stream', function(req,res){
    console.log('Stream solicitado');
    var date = new Date();

    res.writeHead(200, {
        'Date': date.toUTCString(),
        'Connection': 'close',
        'Cache-Control': 'private',
        'Content-Type': 'video/webm',
        'Server': 'CustomStreamer/0.0.1',
    });

    var tcpServer = net.createServer(function (socket) {
        socket.on('data', function (data) {
            res.write(data);
        });
        socket.on('close', function (had_error) {
            res.end();
        });
    });

    tcpServer.maxConnections = 1;

    tcpServer.listen(function () {
        var cmd = 'gst-launch-1.0';
        var args = [
            'filesrc', 'location=media/video/asdf.ogg',
            '!', 'oggdemux',
            '!', 'theoradec',
            '!', 'videoconvert',
            '!', 'textoverlay', 'text="Patrocinado por big buck bunny!"', 'valignment=bottom', 'halignment=left', 'font-desc="Sans, 15"', 
            '!', 'videobalance', 'brightness=0.1', 'saturation=0.9', 'hue=0.1', 'contrast=1.1', 
            '!', 'clockoverlay', 'font-desc="Sans, 10"', 'time-format="%H:%M:%S"', 'valignment=top', 'halignment=right', 
            '!', 'queue',
            '!', 'theoraenc',
            '!', 'queue',
            '!', 'm.', 'oggmux', 'name=m',
            '!', 'queue',
            '!', 'tcpclientsink', 'host=localhost',
            'port=' + tcpServer.address().port
        ];

        var gstMuxer = child.spawn(cmd, args);

        gstMuxer.stderr.on('data', onSpawnError);
        gstMuxer.on('exit', onSpawnExit);

        res.connection.on('close', function () {
            gstMuxer.kill();
        });
    });
});


// Iniciamos el servidor en el puerto 8080. Este será el servidor HTTP de la Web.
httpServer.listen(8080, function () {
    console.log('Servidor HTTP en ejecución en el puerto 8080. Servidor Web.');
});


function onSpawnError(data) {
    console.log(data.toString());
}

function onSpawnExit(code) {
    if (code != null) {
        console.log('GStreamer error, exit code ' + code);
    }
}

process.on('uncaughtException', function (err) {
    console.log(err);
});