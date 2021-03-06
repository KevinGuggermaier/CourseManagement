// Declare variables

let local_json_path = './resources/Test_data.json';
let headers = ["Kurzbezeichnung", "Raumtyp", "Adresse", "Raumnummer", "Stockwerk", "Instandhaltung", "Aktion"];

let json_object = null;

// Event listener
window.addEventListener("load", function () {
    document.getElementById("else_text").style.display = "none";
    //do_json_web_request(local_json_path);
    let jsonObj = "";
    json_object = null;
    const Http = new XMLHttpRequest();
    const url = 'http://localhost:8080/getJsonRoom';

    Http.open("GET", url);
    Http.onprogress = function () {
        //console.log("PROGRESS:", Http.responseText);
        jsonObj = Http.responseText;
        let str = "";
        json_object = JSON.parse(jsonObj);
        if (json_object.length === 0) {
            str = "Die Datei fürs Einlesen enthält keine Daten :(";
        }
        fill_table(json_object, str);
    };
    Http.send();

    document.getElementById("btnPrint").addEventListener("click", print_window);
});

function print_window() {
    window.print();
}

/*// Fill table with data */
function fill_table(json_object, else_str) {
    document.getElementById("RoomOverviewTable").innerHTML = "";
    let table = document.getElementById("RoomOverviewTable");
    let row = table.rows;
    let i = 0;

    if (json_object.length === 0) {
        document.getElementById("else_text").innerHTML = else_str;
        document.getElementById("else_text").style.display = "inline";
    } else {
        document.getElementById("else_text").style.display = "none";
        for (i = 0; i < json_object.length; i++) {
            let currentRoom = json_object[i];
            row = table.insertRow(i);
            let columnCnt = 0;
            for (let key of Object.keys(currentRoom)) {
                let cell = null;
                if (columnCnt < 7) {
                    cell = row.insertCell(columnCnt);
                    //console.log(key)
                    cell.setAttribute("class", "cells");
                    if (columnCnt === 0) {
                        cell.setAttribute("class", "cells, firstCellInRow");
                    }
                    // can be changed if differently wanted
                    if (columnCnt === 1) {
                        cell.setAttribute("class", "cells, secondCellInRow");
                    }
                    if (columnCnt < 7) {
                        cell.innerHTML = "<span class='lineHeaders'>" + headers[columnCnt] + "</span>"; // current header for mobile
                    }
                }

                columnCnt++;
                switch (columnCnt) {
                    case 1:
                        cell.innerHTML += currentRoom.Shortcut;
                        break;
                    case 2:
                        cell.innerHTML += currentRoom.Roomtype;
                        break;
                    case 3:
                        cell.innerHTML += currentRoom.Postcode + "<br>" + currentRoom.City + "<br>" + currentRoom.Address;
                        break;
                    case 4:
                        cell.innerHTML += currentRoom.Number;
                        break;
                    case 5:
                        cell.innerHTML += currentRoom.Floor;
                        break;
                    case 6:
                        if (currentRoom.MA_Id !== null) {
                            cell.innerHTML += currentRoom.Remark + "<br>" + currentRoom.Date + "<br>" + currentRoom.Description;
                        }
                        break;
                    case 7:
                        let hrefString = "/edit/" + currentRoom.R_Id;
                        cell.innerHTML += `<a href=${hrefString}><button id="InsertNewRoom" class="btn">Bearbeiten</button></a><br>`
                        let removeHrefString = "/remove/" + currentRoom.Shortcut + "/" + currentRoom.R_Id;
                        cell.innerHTML += `<a href=${removeHrefString} onclick="return confirm('Möchten Sie den Eintrag wirklich löschen?');"><button id="RemoveRoom" class="btn">Löschen</button><a/><br>`
                        break;
                }
            }
        }
    }
    // header
    row = table.insertRow(0);
    create_table_header(row);
    table.rows[0].setAttribute('id', "headers");

    // add "row"-class for responsive design
    while (i > 0) {
        table.rows[i].setAttribute('class', "row");
        i--;
    }
}

/*// Create header */
function create_table_header(row) {
    let columnCnt = 0;
    for (let header in headers) {
        let cell = row.insertCell(columnCnt++);
        cell.innerHTML = "<b class='headerTitles'>" + headers[header] + "</b>";
    }
}

async function on_search() {

    if (this.timer) {
        window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(async function () {
        let inputString = document.getElementById("SearchInput").value;
        let newStr = inputString.replace(/  +/g, ' ');
        let split = newStr.split(" ");

        if (split[split.length - 1] === "") {
            split.pop();
        }

        if (inputString.length !== 0) {
            await fill_table(await search_data(split, json_object), "Es wurden keine Räume gefunden :(<br>Probier es mal mit einer anderen Suche!");
        } else {
            fill_table(json_object, "");
        }

    }, 500);
}

function search_data(search_string, jsonObject) {

    if (search_string.length === 0) {
        return jsonObject;
    }

    let tableData = "[";
    let jsonString = "";
    for (let i = 0; i < jsonObject.length; i++) {

        Object.keys(jsonObject[i]).forEach(function (key) {
            jsonString += String(jsonObject[i][key]);
            jsonString += " ";
        });
        jsonString = String(jsonString).toLowerCase();
        if (jsonString.includes(String(search_string[search_string.length - 1]).toLowerCase())) {
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

document.getElementById("SearchInput").addEventListener("keyup", on_search);

function JSONToCSVConvertor() {
    let index;
    let arrData = typeof json_object != 'object' ? JSON.parse(json_object) : json_object;
    let CSV = '';

    // label
    let row = "";
    for (index in arrData[0]) {
        row += index + ',';
    }
    row = row.slice(0, -1);
    CSV += row + '\r\n';

    // data
    for (let i = 0; i < arrData.length; i++) {
        row = "";

        for (index in arrData[i]) {
            row += arrData[i][index] + ',';
        }

        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }

    let fileName = "Kurse";
    let uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    let link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
/*function JSONToPDFConvertor() {

    const pdf = new jsPDF('p', 'pt', 'letter');
    source = document.getElementById("RoomOverviewTable");
    specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };

    pdf.fromHTML(
        source,
        margins.left,
        margins.top, {
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            pdf.save('Kurse.pdf');
        }
        , margins);
}*/

function generatePDF() {
    let doc = new jsPDF("landscape");

    doc.text(20, 20, 'Kurse Management System - Räume');

    let table = document.getElementById("RoomOverviewTable");
    let newTbl = document.createElement("TABLE");
    newTbl.hidden = true;

    let rows = table.rows;
    for(let row in rows) {
        let newRow = newTbl.insertRow(row);
        for(let col in rows[row].cells) {
            let cell = null;
            if(col < 6) {
                cell = newRow.insertCell(col);
                cell.innerText = rows[row].cells[col].innerText;
            }
        }
    }
    doc.autoTable({
        showHead: 'everyPage',
        html: newTbl,
        didParseCell: function (data) {
            if (data.row.index === 0) {
                data.cell.styles.fillColor = [51, 51, 51];
                data.cell.styles.fontSize = 12;
                data.cell.styles.textColor = 255;
            }
        }
    });
    doc.save("KursManagementSystem-Räume.pdf");

    newTbl.remove();

}


document.getElementById("exportPDfRoom").addEventListener("click", generatePDF);


document.getElementById("exportExcelRoom").addEventListener("click", JSONToCSVConvertor);
