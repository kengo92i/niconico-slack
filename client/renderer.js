const electron = require('electron');
const { screen } = electron;
const NicommentJS = require('./lib/nicommentJS.js');
const config = require('config')

let size = screen.getPrimaryDisplay().size;

var nico = new NicommentJS({
    app: document.getElementById('app'),
    width: size.width,
    height: size.height,
    fontSize: 60,
});

// コメント待機
nico.listen();

const socketio = io('https://' + config.config.hostname);

socketio.on('message', function (msg) {
    console.log('message receive: ' + msg);

    if (!msg) { return; } // msgがnullの時があるので
    msg = msg.replace(/<@.*>/, '');

    nico.send(msg);
});