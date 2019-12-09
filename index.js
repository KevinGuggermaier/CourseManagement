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

const server = http.createServer((request, response) => {
    const URLparams = request.url.split("/");

    const db = dbModule.open_db();

    console.log(request.url)
    if(URLparams.includes("delete")) {

    } else if(URLparams.includes("edit") && !isNaN(URLparams[2])) {
        let values = null;
        let maintenancy = null;
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

    /*}else if(URLparams.includes("location")){
        console.log("edit :");
        console.log(URLparams)
        if (URLparams.length == 3 && !isNaN(URLparams[2])) {
            console.log("TEST")
            dbModule.getOverviewById(db, URLparams[2]).then(
                data => {
                    send(response, 200, {'content-type': 'text/html'}, getFormForEdit(data));
                },
                error => send(response, 404, {"content-type": "text/plain"}, error),
            );
        }*/

    } else if(URLparams.includes("insertNewRoom")) {
        send(response,200,{ 'content-type' : 'text/html'}, getNewForm());
        /*selectionForNewRoom(db).then(
            data => {
                //console.log("Data for selection.", data, "\nData1", data[0], "\nData2", data[1], "\nData3", data[2]);
                send(response, 200, {'content-type': 'text/html'}, getNewForm(data[1], data[0], data[2]));
            },
            error => {
                send(response, 200, {'content-type': 'text/html'}, getNewForm(null, null, null));
            });*/

    } /*else if(URLparams.includes("location")){
        let id = URLparams.slice(URLparams.length-1, URLparams.length);
        id = parseInt(id[0])
        dbModule.getElementFromLocationWithId(db,id).then(
            data => {
                //console.log("send back")
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(data)); // You Can Call Response.write Infinite Times BEFORE response.end
                response.end();
            },
            error => console.log(error),
        )
    }*/
    /*else if(URLparams.includes("getJsonForSearch")){
        console.log("get Json for search")
        dbModule.getOverview(db).then(
            data => {
                //console.log("send back")
                response.writeHead(200, {"Content-Type": "application/json"});
                response.write(JSON.stringify(data)); // You Can Call Response.write Infinite Times BEFORE response.end
                response.end();
            },
            error => console.log(error),
        )
    }*/
    else if(URLparams.includes("save") && request.method === "POST") {
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
        /*dbModule.getOverview(db).then(
            data => {
                send(response, 200,{ 'content-type': 'text/html' }, getForm());
            },
            error => send(response, 404,{"content-type": "text/plain"},error),
        );*/

    }

    dbModule.close_db(db);

});


server.listen(8080, () =>
    console.log("Server is listening to https://localhost:8080"),
);