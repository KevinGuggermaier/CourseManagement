const http = require("http");

const dbModule = require("./js/model");

const resHandler = require("./js/responseHandler");
const send = resHandler.send;
const sendFile = resHandler.sendFile;
const redirect = resHandler.redirect;

const formidable = require("formidable");

const getForm = require("./views/form");
const getNewForm = require("./views/new");


function getPage404() {
    const page404 = `<!DOCTYPE html>
    <html>
        <head>
            <title>Seite wurde nicht gefunden</title>
            <link href="css/main.css" rel="stylesheet" type="text/css"/>
            <meta charset="utf-8">
        </head>
        <body>
            <div id="page404">
                <h1>Auf der Seite ist ein Fehler aufgetreten</h1>
                <br>
                <a href="/"><button id="back" class="btn">Zurück zur Startseite</button></a><br> 
            </div>
        </body>
    </html>`;
    return page404;
}

function getPageDuplicat() {
    const pageDuplicat = `<!DOCTYPE html>
    <html>
        <head>
            <title>Duplikat</title>
            <link href="css/main.css" rel="stylesheet" type="text/css"/>
            <meta charset="utf-8">
        </head>
        <body>
            <div id="page404">
                <h1>Der Raum den du einfügen wolltest existiert bereits!</h1>
                <br>
                <a href="/"><button id="back" class="btn">Zurück zur Startseite</button></a><br> 
            </div>
        </body>
    </html>`;
    return pageDuplicat;
}


const server = http.createServer((request, response) => {
    const URLparams = request.url.split("/");

    const db = dbModule.open_db();

    console.log(request.url)
    if(URLparams.includes("testPage")) {
        send(response,200,{'content-type':'text/html'}, getPageDuplicat())
    } else if(URLparams.includes("edit") && !isNaN(URLparams[2])) {
        console.log("edit :)");
        console.log(URLparams[2])
        if (URLparams.length == 3 && !isNaN(URLparams[2])) {
            console.log("TEST" , URLparams)
            dbModule.getOverviewRoomById(db, URLparams[2]).then(
                data => {
                    send(response, 200, {'content-type': 'text/html'}, getNewForm(data))
                },
                error => send(response, 404, {'content-type': 'text/html'}, getPage404())
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
                error => send(response, 404, {'content-type':'text/html'}, getPageDuplicat())
            );

            dbModule.close_db(t);
        });
    } else if(URLparams.includes("images")) {
        sendFile(response, request)

    }else if(request.url === "/edit/css/main.css" || request.url === "/edit/css/table.css" || request.url === "/edit/js/main.js" || request.url === "/edit/js/inputValid.js") {
        request.url = request.url.toString().slice(5, request.url.toString().length);
        sendFile(response, request, 'utf8');
    }
    else if(request.url === "/css/main.css" || request.url === "/css/table.css" || request.url === "/js/main.js" || request.url === "/js/inputValid.js") {
        sendFile(response, request, 'utf8');

    }else if(URLparams.includes("getJsonRoom") && request.method === "GET") {
        dbModule.getOverviewRoom(db).then(
            data => {
                console.log(data)
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(data)); // You Can Call Response.write Infinite Times BEFORE response.end
                response.end();
            },
            error => send(response, 404, {'content-type': 'text/html'}, getPage404()),
        )
    }
    else {
        send(response, 200, {'content-type': 'text/html'}, getForm());
    }

    dbModule.close_db(db);

});


server.listen(8080, () =>
    console.log("Server is listening to http://localhost:8080"),
);