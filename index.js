const http = require("http");

const dbModule = require("./js/model");

const resHandler = require("./js/responseHandler");
const send = resHandler.send;
const sendFile = resHandler.sendFile;
const redirect = resHandler.redirect;

const formidable = require("formidable");

const getForm = require("./views/form");
const getFormForEdit = require("./views/edit");
const getNewForm = require("./views/new");


const page404 = `<!DOCTYPE html>
<html>
    <head>
        <title>Seite wurde nicht gefunden</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Seite nicht gefunden!</h1>
    </body>
</html>`;


const server = http.createServer((request, response) => {
    const URLparams = request.url.split("/");

    const db = dbModule.open_db();

    console.log(request.url)
    if(URLparams.includes("delete")) {

    } else if(URLparams.includes("edit") && !isNaN(URLparams[2])) {
        console.log("edit :)");
        console.log(URLparams[2])
        if (URLparams.length == 3 && !isNaN(URLparams[2])) {
            console.log("TEST" , URLparams)
            dbModule.getOverviewRoomById(db, URLparams[2]).then(
                data => {
                    send(response, 200, {'content-type': 'text/html'}, getNewForm(data))
                }
            )
        }

    } else if(URLparams.includes("insertNewRoom")) {
        send(response,200,{ 'content-type' : 'text/html'}, getNewForm());

    } else if(URLparams.includes("save") && request.method === "POST") {
        const form = new formidable.IncomingForm();
        form.parse(request, (err, data, files) => {
            console.log('data', data);
            const t  = dbModule.open_db();

            dbModule.save(t,data).then(
                data => { redirect(response,{'content-type':'text/plain'},"/");
            },
                error => send(response, 404, {'content-type':'text/plain'}, error.toString())
            );

            dbModule.close_db(t);
        });
    } else if(URLparams.includes("images")) {
        sendFile(response, request)

    }else if(request.url === "/edit/css/main.css" || request.url === "/edit/css/table.css" || request.url === "/edit/js/main.js") {
        request.url = request.url.toString().slice(5, request.url.toString().length);
        sendFile(response, request, 'utf8');
    }
    else if(request.url === "/css/main.css" || request.url === "/css/table.css" || request.url === "/js/main.js") {
        sendFile(response, request, 'utf8');

    }else if(URLparams.includes("getJsonRoom") && request.method === "GET") {
        dbModule.getOverviewRoom(db).then(
            data => {
                console.log(data)
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(data)); // You Can Call Response.write Infinite Times BEFORE response.end
                response.end();
            },
            error => console.log(error),
        )
    }
    else {
        send(response, 200, {'content-type': 'text/html'}, getForm());
    }

    dbModule.close_db(db);

});


server.listen(8080, () =>
    console.log("Server is listening to https://localhost:8080"),
);