// Declare variables

let local_json_path = './resources/Test_data.json';
let headers = ["Kurzbezeichnung","Raumtyp","Adresse","Raumnummer","Stockwerk","Instandhaltung"];

/*
let model = require('./model');

const http = require('http');
//#######################################################

let db = model.open_db();
//model.initialize_database(db);

const server = http.createServer((request, response) => {
    const parts = request.url.split('/');

    if (parts.includes("select_all_from_table")) {
        /!* // Test insert
        let room_data = ['G.9999.1', 9999, 1, 1, 1];
        model.insert_new_room(db, room_data);
        *!/
        model.select_all_from_table(db, 'Room');
        /!* // Test delete
        model.delete_room(db, 'K.210.2')
        *!/
        /!* // Test update
        let room_data = [999, 3, 1, 1, 'G.100.2'];
        model.select_all_from_table(db, 'Room');
        model.update_room(db, room_data);
        model.select_all_from_table(db, 'Room');
        *!/
        /!*model.getAll(db).then(
            rooms => {
                send(response, rooms);
            },
            error => console.log(error),
        ); *!/
    } else if (parts.includes('close_db')) {
        model.close_db(db);
    }
});

// server is now listening to specific port
server.listen(8080, () =>
    console.log('Server and Notes Application is listening to http://localhost:8080'),
);
*/


// Event listener
window.addEventListener("load", function () {
   document.getElementById("else_text").style.display = "none";
   //do_json_web_request(local_json_path);
   document.getElementById("btnPrint").addEventListener("click", print_window);
});

function print_window() {
   window.print();
}

/*// Json read-methods
function do_json_web_request(url){
    let httpRequest = create_http_Request(url);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == "200") {           
			json_object = JSON.parse(httpRequest.responseText);
			let str = "";
			if(json_object.length === 0) {
			    str = "Die Datei fürs Einlesen enthält keine Daten :(";
            }
			//console.log(json_object);
			fill_table(json_object,str);
        }
    };
    httpRequest.send(null);
}*/

/*function create_http_Request(url) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.overrideMimeType("application/json");
    httpRequest.open("GET", url, true);
    return httpRequest;
}*/


/*// Fill table with data
function fill_table(json_object,else_str) {
	document.getElementById("RoomOverviewTable").innerHTML = "";
    let table = document.getElementById("RoomOverviewTable");
    let row = table.rows;
    let i = 0;

    if(json_object.length === 0) {
        document.getElementById("else_text").innerHTML = else_str;
        document.getElementById("else_text").style.display = "inline";
    } else {
        document.getElementById("else_text").style.display = "none";
        for (i = 0; i < json_object.length; i++) {
            let currentRoom = json_object[i];
            row = table.insertRow(i);

            let columnCnt = 0;
            for (let key of Object.keys(currentRoom)) {
                let cell = row.insertCell(columnCnt);
                cell.setAttribute("class", "cells");
                if (columnCnt === 0) {
                    cell.setAttribute("class", "cells, firstCellInRow");
                }
                // can be changed if differently wanted
                if (columnCnt === 1) {
                    cell.setAttribute("class", "cells, secondCellInRow");
                }
                cell.innerHTML = "<span class='lineHeaders'>" + headers[columnCnt] + "</span>"; // current header for mobile
                columnCnt++;
                if (currentRoom[key] instanceof Array) {
                    for (let j = 0; j < currentRoom[key].length; j++) {
                        cell.innerHTML += iterate_through_sub_object(currentRoom[key][j]) + "<br>";
                    }
                } else if (currentRoom[key] instanceof Object) {
                    cell.innerHTML += iterate_through_sub_object(currentRoom[key]);
                } else {
                    cell.innerHTML += currentRoom[key];
                }
            }
        }
    }
    // header
    row = table.insertRow(0);
    create_table_header(row);
    table.rows[0].setAttribute('id',"headers");

    // add "row"-class for responsive design
    while (i > 0) {
        table.rows[i].setAttribute('class',"row");
        i--;
    }
}*/

/*// Create header
function create_table_header(row) {
    let columnCnt = 0;
    for(let header in headers) {
        let cell = row.insertCell(columnCnt++);
        cell.innerHTML = "<b class='headerTitles'>" + headers[header] + "</b>";
    }
}*/

/*function iterate_through_sub_object(obj) {
    let objString = "";
    if (obj instanceof Object) {
        for (let property in obj) {
            if (obj.hasOwnProperty(property)) {
                objString += obj[property] + "<br>";
                iterate_through_sub_object(obj[property]);
            }
        }
    }
    return objString;
}*/

async function on_search(){

    let jsonObj = "";

    const Http = new XMLHttpRequest();
    const url='http://localhost:8080/getJsonForSearch';
    Http.open("GET", url);
    Http.onprogress = function () {
        console.log("PROGRESS:", Http.responseText)
        jsonObj = Http.responseText.replace("[", "");
        jsonObj = jsonObj.replace("]", "");
        jsonObj = JSON.parse(jsonObj)
        console.log(jsonObj)
    }
    Http.send();


    if (this.timer) {
        window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(async function() {
       let inputString = document.getElementById("SearchInput").value;
       let newStr = inputString.replace(/  +/g, ' ');
       let split = newStr.split(" ");

       if(split[split.length-1] === ""){
           split.pop();
       }

       if(inputString.length !== 0){
           await fill_table(await search_data(split, json_object),"Es wurden keine Räume gefunden :(<br>Probier es mal mit einer anderen Suche!");
       }else{
           fill_table(json_object,"");
       }

    }, 500);

}

function iterate_through_sub_object_Search(obj) {
    let objString = "";
    if (obj instanceof Object) {
        for (let property in obj) {
            if (obj.hasOwnProperty(property)) {
                objString += obj[property] + " ";
                iterate_through_sub_object(obj[property]);
            }
        }
    }
    return objString;
}

function search_data(search_string, jsonObject){

    if(search_string.length === 0){
        return jsonObject;
    }

    let tableData = "[";
    let jsonString = "";
    for (let i = 0; i < jsonObject.length; i++) {

        Object.keys(jsonObject[i]).forEach(function(key) {
            if(jsonObject[i][key] instanceof Array){
                for (let j = 0; j < jsonObject[i][key].length; j++) {
                    jsonString += iterate_through_sub_object_Search(jsonObject[i][key][j]);
                }
            }
            else if(jsonObject[i][key] instanceof Object){
                jsonString += String(iterate_through_sub_object_Search(jsonObject[i][key]));
            }
            else {
                jsonString += String(jsonObject[i][key]);
            }
            jsonString += " ";
        });
        jsonString = String(jsonString).toLowerCase();
        if (jsonString.includes(String(search_string[search_string.length-1]).toLowerCase())){
            tableData += JSON.stringify(jsonObject[i]) + ",";
        }
        console.log(jsonString);
        jsonString = "";
    }

    let newStr = tableData.length > 1 ? tableData.substring(0, tableData.length - 1) : "[";
    newStr += "]";
    search_string.pop();
    return search_data(search_string, JSON.parse(newStr));
}

/*function expand(){
    document.getElementById("insertData").style.display = "inline";
    document.getElementById("btnShowFieldInsertData").setAttribute('onclick',"fold()");
}

function fold(){
    document.getElementById("insertData").style.display = "none";
    document.getElementById("btnShowFieldInsertData").setAttribute('onclick',"expand()");

    deleteInputFields(document.getElementsByClassName("inputField"));
}*/

function deleteInputFields(inputFields){
    for(let i in inputFields){
        inputFields[i].value = "";
    }
}


function insertData(){
    const Http = new XMLHttpRequest();

    let selectLocation = document.getElementById("location");
    let location = selectLocation.options[selectLocation.selectedIndex].value;

    let selectRoomtype = document.getElementById("roomType");
    let roomtype = selectRoomtype.options[selectRoomtype.selectedIndex].value;

    let selectMainDesc = document.getElementById("mainDesc");
    let mainDesc = selectMainDesc.options[selectMainDesc.selectedIndex].value;

    console.log("INSERT DATA")
    let VshortCut = document.getElementById("ShortCut").value;
    //let VroomType = document.getElementById("RoomType").value;
    let VroomNumber = document.getElementById("RoomNumber").value;
    let Vfloor = document.getElementById("Floor").value;
    //let Vlocation = document.getElementById("Location").value;
    //let VlocationStreet = document.getElementById("LocationStreet").value;
   // let VlocationPlz = document.getElementById("LocationPlz").value;
    //let VmaDesc = document.getElementById("MA_Desc").value;
    let VmaDate = document.getElementById("MA_Date").value;
    let VmaTime = document.getElementById("MA_Time").value;
    let VmaRemark = document.getElementById("MA_Remark").value;

    if(VshortCut.length === 0 ||  VroomNumber.length === 0
        || Vfloor.length === 0 ){
        alert("Befüllen Sie alle Pflichtfelder (rot umrandet)");
        return null;
    }

    let jsonString = "" //json_object.length === 0 ? "" : ",";


    jsonString += '{"ShortCut":"' + VshortCut + '",';
    jsonString += '"RoomType":"' + roomtype + '",';
    jsonString += '"Location":"' + location + '",';
    jsonString += '"RoomNumber":"' + VroomNumber +'",';
    jsonString += '"Floor":"' + Vfloor +'",';
    jsonString += '"MainDescription":"' + mainDesc + '",';
    jsonString += '"MainDate":"' + VmaDate + '",';
    jsonString += '"MainTime":"' + VmaTime + '",';
    jsonString += '"MainRemark":"' + VmaRemark + '"}';

    let json_object = "";

    let jsonObjectString = JSON.stringify(jsonString)
   // jsonObjectString = jsonObjectString.substring(0, jsonObjectString.length-1);
    //jsonObjectString += jsonString + "]";

    json_object = JSON.parse(jsonObjectString);
    //fill_table(json_object,"");

    const url='http://localhost:8080/new';
    Http.open("POST", url, true);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.parse(jsonObjectString));

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
    //const url = "http://example.com";
    /*fetch(url, {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        //body: new FormData(VshortCut),

        body : JSON.stringify(jsonString)
    }).then(
        response => response.json() // .json(), etc.
        // same as function(response) {return response.text();}
    ).then(
        html => console.log(html)
    );
*/
    /*Http.open("POST", url)
    Http.open("GET", url);
    Http.send();
    console.log("SEND MESSAGE")
    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }*/


    deleteInputFields(document.getElementsByClassName("inputField"));

    document.getElementById("insertData").style.display = "none";
    document.getElementById("btnShowFieldInsertData").setAttribute('onclick',"expand()");
}

function test(){

    let e = document.getElementById("location");
    let location  = e.options[e.selectedIndex].value;
    console.log(location)

    let jsonObj = "";

    const Http = new XMLHttpRequest();
    const url='http://localhost:8080/location/' + location;
    Http.open("GET", url);
    Http.onprogress = function () {
        console.log("PROGRESS:", Http.responseText)
        jsonObj = Http.responseText.replace("[", "");
        jsonObj = jsonObj.replace("]", "");
        jsonObj = JSON.parse(jsonObj)
        console.log(jsonObj.Name)
        document.getElementById("LocationStreet").value = jsonObj.Address;
        document.getElementById("LocationPlz").value = jsonObj.Postcode;
    }
    Http.send();

}

document.getElementById("SearchInput").addEventListener("keyup", on_search);
document.getElementById("btnInsertData").addEventListener("click", insertData);

//document.getElementById("location").addEventListener("change", test);

/*document.getElementById("RoomType").addEventListener("keyup", shortCut);
document.getElementById("RoomType").addEventListener("keyup", on_search);
document.getElementById("RoomNumber").addEventListener("keyup", on_search);
document.getElementById("Floor").addEventListener("keyup", on_search);
document.getElementById("Location").addEventListener("keyup", on_search);
document.getElementById("LocationStreet").addEventListener("keyup", on_search);
document.getElementById("LocationPlz").addEventListener("keyup", on_search);
document.getElementById("MA_Desc").addEventListener("keyup", on_search);
document.getElementById("MA_Date").addEventListener("keyup", on_search);
document.getElementById("MA_Time").addEventListener("keyup", on_search);
document.getElementById("MA_Remark").addEventListener("keyup", on_search);*/
