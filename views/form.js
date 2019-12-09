let maintenanceActivity = "";

//function getForm(data, rooomtype, location, mainDesc, maintenancy){
function getForm(){
    //console.log(rooomtype);

    const form = `<!DOCTYPE html>
    <html lang="de">
        <head>
        <title>Course Management System</title>
    <meta charset="UTF-8">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/main.css" rel="stylesheet" type="text/css"/>
        <link href="css/table.css" rel="stylesheet" type="text/css"/>
        <link href="js/main.js" rel="stylesheet" type="text/javascript"/>

        </head>
        <body>
        <div id="courseManagement">
        <h1>Kurse Management System</h1>
    <button id="btnPrint" class="btn">Seite drucken</button>
    <div id="SearchInputDiv">
        <label for="SearchInput"></label><input type="text" id="SearchInput" placeholder="Suche ...">
        </div>
        <button id="btnShowFieldInsertData" class="btn" onclick="expand()">Neue Daten hinzufügen</button><br>
    <div id="insertData">
        <br class="inputHeader"><input class="inputField" type="text" id="ShortCut" placeholder="Kurzbezeichnung" required>
    <input class="inputField" type="text" id="RoomType" placeholder="Raumtyp" required>
    <input class="inputField" type="text" id="RoomNumber" placeholder="Raumnummer" required>
    <input class="inputField" type="text" id="Floor" placeholder="Stockwerk" required>

    <p class="inputHeader">Adresse</p>
        <input class="inputField" type="text" name="input" id="Location" placeholder="Ort" required>
    <input class="inputField" type="text" id="LocationStreet" placeholder="Straße" required>
    <input class="inputField" type="text" id="LocationPlz" placeholder="Plz" required>

    <p class="inputHeader">Instandhaltung</p>
        <input class="inputField" type="text" id="MA_Desc" placeholder="Bezeichnung">
        <input class="inputField" type="text" id="MA_Date" placeholder="Datum [yyyy-mm-dd]">
        <input class="inputField" type="text" id="MA_Time" placeholder="Uhrzeit [hh:mm]">
        <input class="inputField" type="text" id="MA_Remark" placeholder="Anmerkung">
        <p class="inputHeader">* Rote Felder sind Pflichtfelder</p>
    <button id="btnInsertData" class="btn">Daten hinzufügen</button><br>
    </div>
    <br>
    <table id="RoomOverviewTable"></table>
        <br>
        <div id="else_text"></div>
        </div>
        <script src="js/main.js" type="text/javascript"></script>
        </body>
        </html>`

    return form;
}



module.exports = getForm;