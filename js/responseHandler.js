const fs = require("fs");
const path = require('path');

function send(res, statusCode, header, body) {
    res.writeHead(statusCode, header);
    res.end(body);
}

function sendFile(res, req, encoding = "") {
    const filePath = path.resolve(__dirname, "../" + req.url);
    fs.readFile(filePath, encoding, function (err, data) {
       if(err) {
           res.statusCode = 404;
           res.end();
       }  else {
           res.statusCode = 200;
           res.end(data);
       }
    });
}

function redirect(res, header, to) {
    res.writeHead(302, { location: to, header });
    res.end('Umleitung');
}

module.exports = {
    send,
    sendFile,
    redirect
};