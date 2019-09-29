const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());

io.on('connection', function (socket) {
    socket.on('message', function (msg) {
        io.emit('message', msg);
    });
});

app.post('/slack', function (req, res) {

    console.log(req.body);

    const { type, event } = req.body;

    if (type === 'challenge') {
        // 認証用リクエストなので、特に何もしない
    } else if (type === 'event_callback') {
        console.log(event.text);
        io.emit('message', event.text);
    }

    res.status(200).json(req.body);

});

http.listen(PORT, function () {
    console.log('server listening. Port:' + PORT);
});
