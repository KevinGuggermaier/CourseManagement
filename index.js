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
            selectionForNewRoom(db).then(
                data => {
                      values = data;
                    });
            dbModule.getMaintenanceOverview(db).then(
                data => {
                    maintenancy = data;
                });
            dbModule.getOverviewById(db, URLparams[2]).then(
                data => {
                    send(response, 200,{ 'content-type': 'text/html' }, getFormForEdit(data, values[1], values[0], values[2], URLparams[2]));
                },
                error => send(response, 404,{"content-type": "text/plain"},error),
            );

            /*dbModule.getOverviewById(db, URLparams[2]).then(
                note => {
                    console.log(note);
                    send(response, getFormForEdit(note));
                },
                error => send(response, error),
            );*/
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
        selectionForNewRoom(db).then(
            data => {
                //console.log("Data for selection.", data, "\nData1", data[0], "\nData2", data[1], "\nData3", data[2]);
                send(response, 200, {'content-type': 'text/html'}, getNewForm(data[1], data[0], data[2]));
            },
            error => {
                send(response, 200, {'content-type': 'text/html'}, getNewForm(null, null, null));
            });

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
    else if (URLparams.includes("update") && request.method === "POST"){
        console.log("UPDATE set")
        console.log(URLparams[2])
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            let jsonFile = JSON.parse(body.toString());
            const t = dbModule.open_db();

            dbModule.update_room(t, jsonFile, URLparams[2])
            dbModule.updateMainDesc(t, jsonFile, URLparams[2])
            dbModule.close_db(t)
            redirect(response, {'content-type': 'text/plain'}, "/");
        });

    }
    /*else if(URLparams.includes("new") && request.method === "POST") {
        console.log("new")
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {

            let jsonFile = JSON.parse(body.toString());
            const t = dbModule.open_db();
            dbModule.insert_new_room(t, jsonFile);
            dbModule.getIdFromInsertRoom(t, jsonFile).then(
                data => {
                    //console.log(data);
                    dbModule.insert_new_maintenance_activity(t, jsonFile, data[0])
                },
                error => console.log(error),
            );

            dbModule.close_db(t)
        });

    }*/
    else if(URLparams.includes("save") && request.method === "POST") {
        const form = new formidable.IncomingForm();
        //console.log("SAVE ;) ", form)
        form.parse(request, (err, data, files) => {
            console.log('data', data);

            /*model.save(note).then(
                notes => {
                    redirect(response, '/');
                },
                error => send(response, error),
            );*/
        });
        //console.log()
        /*form.parse(request, (err, data, files) => {
            console.log("data", data);

        });*/
    } else if(URLparams.includes("images")) {
        sendFile(response, request)

    }else if(request.url === "/edit/css/main.css" || request.url === "/edit/css/table.css" || request.url === "/edit/js/editHandler.js") {

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
        dbModule.getOverview(db).then(
            data => {
                send(response, 200,{ 'content-type': 'text/html' }, getForm());
            },
            error => send(response, 404,{"content-type": "text/plain"},error),
        );


    }

    dbModule.close_db(db);

});

async function selectionForNewRoom(db) {
    let p1 = dbModule.select_all_from_table(db, "Location");/*.then(
        data => {
            console.log(data);
            location = data;
        },
        error => console.log(error),
    );*/
    let p2 = dbModule.select_all_from_table(db, "Roomtype");/*.then(
        data => {
            console.log(data);
            roomtype = data;
        },
        error => console.log(error),
    );*/
    let p3 = dbModule.select_all_from_table(db, "Maintenance_Description");/*.then(
        data => {
            console.log(data);
            mainDesc = data;
        },
        error => console.log(error),
    );*/


    return await Promise.all([p1,p2,p3]);
}

server.listen(8080, () =>
    console.log("Server is listening to https://localhost:8080"),
);