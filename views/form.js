let maintenanceActivity = "";

//function getForm(data, rooomtype, location, mainDesc, maintenancy){
function getForm(data, maintenancy){
    //console.log(rooomtype);
    maintenanceActivity = maintenancy;
    const form =` <!DOCTYPE html> 
        <html> 
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
                    <a href="/insertNewRoom"><button id="btnInsertData" class="btn">Neue Daten hinzufügen</button></a><br> ` + /*
                    <button id="btnShowFieldInsertData" class="btn" onclick='expand()'>Neue Daten hinzufügen</button><br> 
                    <div id="insertData"> 
                    <form action="/save" method="POST">
                        <br class="inputHeader"><input class="inputField" type="text" id="ShortCut" placeholder="Kurzbezeichnung" required> 
                        
                    
                        ${insertSelection(rooomtype)}
                        
                        <!--<input class="inputField" type="text" id="RoomType" placeholder="Raumtyp" required> -->
                        <input class="inputField" type="text" id="RoomNumber" placeholder="Raumnummer" required> 
                        <input class="inputField" type="text" id="Floor" placeholder="Stockwerk" required> 

                        <p class="inputHeader">Adresse</p> 
                         ${insertSelectionLocation(location)}
                       <!-- <input class="inputField" type="text" name="input" id="Location" placeholder="Ort" required> -->
                        <input class="inputField" type="text" id="LocationStreet" placeholder="Straße" readonly> 
                        <input class="inputField" type="text" id="LocationPlz" placeholder="Plz" readonly> 

                        <p class="inputHeader">Instandhaltung</p> 
                        ${insertSelectionMainDesc(mainDesc)}
                        <!--<input class="inputField" type="text" id="MA_Desc" placeholder="Bezeichnung"> -->
                        <input class="inputField" type="text" id="MA_Date" placeholder="Datum [yyyy-mm-dd]"> 
                        <input class="inputField" type="text" id="MA_Time" placeholder="Uhrzeit [hh:mm]"> 
                        <input class="inputField" type="text" id="MA_Remark" placeholder="Anmerkung"> 

                        <p class="inputHeader">* Rote Felder sind Pflichtfelder</p> 
                        <button id="btnInsertData" class="btn">Daten hinzufügen</button><br> 
                    </form>
                    </div> */
                    `<br> 
                    <table id="RoomOverviewTable"> 
                        <tr id="headers"> 
                            <th>Kurzbezeichnung</th>
                            <th>Raumtyp</th>
                            <th>Raumnummer</th>
                            <th>Stockwerk</th>
                            <th>Adresse</th>
                            <th>Instandhaltung</th>
                            <th>Aktion</th>
                        </tr> 
                        
                        ${data.map(insertRow).join('')}
                    </table> 
                    <br> 
                    <div id="else_text"></div> 
                </div> 
                <script src="js/main.js" type="text/javascript"></script> 
            </body>
        </html>`;

    return form;
}

function insertRow(row) {
    let shortcut = row.Id;
    let rowToInsert = `<tr class="row">
        <td class="cells, firstCellInRow"><b class="lineHeaders">Kurzbezeichnung</b>${row.Shortcut}</td>
        <td class="cells"><b class="lineHeaders">Raumtyp</b>${row.Roomtype}</td>
        <td class="cells"><b class="lineHeaders">Raumnummer</b>${row.Room_Number}</td>
        <td class="cells"><b class="lineHeaders">Stockwerk</b>${row.Floor_Number}</td>
        <td class="cells"><b class="lineHeaders">Addresse</b>${row.Address}<br>${row.Name}<br>${row.Postcode}</td>
        <td class="cells"><b class="lineHeaders">Instandhaltung</b>${insertMaintenancActivities(shortcut)}</td>
        <td class="cells"><a href="/edit/${row.Id}" id="editLink"><img src="../images/edit.png" alt="edit note" title="edit note" width="25"/></a></td>
    </tr>`;
    return rowToInsert;
}

function insertMaintenancActivities(shortcut) {
    let val = ``;
    if (maintenanceActivity != null) {
        for (let i = 0; i < maintenanceActivity.length; i++) {

                if (maintenanceActivity[i].Room_Shortcut == shortcut) {

                    if (val.length !== 0) {
                        val += `<br><hr>`;
                    }
                    val += `${maintenanceActivity[i].Description}<br>${maintenanceActivity[i].Remark}<br>${maintenanceActivity[i].Date}`;
                }

        }
        console.log(val);
        return val;
    }
}

function insertSelection(item){
    let val = `<select id="roomType">`;
    if(item != null) {
        val += `<option value="0">Raumtyp</option>`;
        for (let i = 0; i < item.length; i++) {
            val += `<option value="${item[i].Roomtype_Id}">${item[i].Roomtype}</option>`;
        }
    }
    val += `</select>`;
    return val
}

function insertSelectionLocation(item){
    let val = `<select id="location">`;
    if(item != null) {
        val += `<option value="0">Ort</option>`;
        for (let i = 0; i < item.length; i++) {
            val += `<option value="${item[i].Location_Id}">${item[i].Name}</option>`;
        }
    }
    val += `</select>`;

    return val
}

function insertSelectionMainDesc(item){
    let val = `<select id="mainDesc">`;
    if(item != null) {
        val += `<option value="0">Bezeichnung</option>`;
        for (let i = 0; i < item.length; i++) {
            val += `<option value="${item[i].Maintenance_Description_Id}">${item[i].Description}</option>`;
        }
    }
    val += `</select>`;

    return val
}

module.exports = getForm;