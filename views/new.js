function getNewForm(rooomtype, location, mainDesc){
    const form =` <!DOCTYPE html> 
        <html> 
            <head> 
                <title>Kurs Management System | Neuer Raum</title> 
                <meta charset="UTF-8"> 
                <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                <link href="css/main.css" rel="stylesheet" type="text/css"/> 
                <link href="js/main.js" rel="stylesheet" type="text/javascript"/> 
            </head>
            <body> 
                <div id="courseManagement"> 
                    <h1>Neuer Raum</h1> 
                     <div id="insertData"> 
                    <form action="/save" method="POST">
                        <br class="inputHeader">
                        <input class="inputField" type="text" id="ShortCut" placeholder="Kurzbezeichnung" name="Shortcut" required> 
                        
                    
                        ${insertSelection(rooomtype)}
                        
                        <!--<input class="inputField" type="text" id="RoomType" placeholder="Raumtyp" required> -->
                        <input class="inputField" type="text" id="RoomNumber" placeholder="Raumnummer" name="Room_Number" required> 
                        <input class="inputField" type="text" id="Floor" placeholder="Stockwerk" name="Floor_Number" required> 

                        <p class="inputHeader">Adresse</p> 
                         ${insertSelectionLocation(location)}
                       <!-- <input class="inputField" type="text" name="input" id="Location" placeholder="Ort" required> -->
                        <input class="inputField" type="text" id="LocationStreet" placeholder="Straße" name="Address"> 
                        <input class="inputField" type="text" id="LocationPlz" placeholder="Plz" name="Postcode"> 

                        <p class="inputHeader">Instandhaltung</p> 
                        ${insertSelectionMainDesc(mainDesc)}
                        <!--<input class="inputField" type="text" id="MA_Desc" placeholder="Bezeichnung"> -->
                        <input class="inputField" type="text" id="MA_Date" placeholder="Datum [yyyy-mm-dd]" name="Date"> 
                        <input class="inputField" type="text" id="MA_Time" placeholder="Uhrzeit [hh:mm]"> 
                        <input class="inputField" type="text" id="MA_Remark" placeholder="Anmerkung" name="Remark"> 

                        <p class="inputHeader">* Rote Felder sind Pflichtfelder</p> 
                        <button id="btnInsertData" class="btn">Daten hinzufügen</button><br> 
                    </form>
                    </div> 
                    <br> 
                    
                    <br> 
                </div> 
                <script src="js/main.js" type="text/javascript"></script> 
            </body>
        </html>`;

    return form;
}

function insertSelection(item){
    let val = `<select id="roomType" name="Roomtype" required>`;
    val += `<option value="" disabled selected>Raumtyp</option>`;
    if(item != null) {
        for (let i = 0; i < item.length; i++) {
            val += `<option value="${item[i].Roomtype_Id}">${item[i].Roomtype}</option>`;
        }
    }
    val += `</select>`;
    return val
}

function insertSelectionLocation(item){
    console.log(item);
    let val = `<select id="location" name="Name" required>`;
    val += `<option value="" disabled selected>Ort</option>`;
    if(item != null) {
        for (let i = 0; i < item.length; i++) {
            val += `<option value="${item[i].Location_Id}">${item[i].Name}</option>`;
        }
    }
    val += `</select>`;

    return val
}

function insertSelectionMainDesc(item){
    let val = `<select id="mainDesc" name="Description" required>`;
    val += `<option value="" disabled selected>Bezeichnung</option>`;
    if(item != null) {
        for (let i = 0; i < item.length; i++) {
            val += `<option value="${item[i].Maintenance_Description_Id}">${item[i].Description}</option>`;
        }
    }
    val += `</select>`;

    return val
}

module.exports = getNewForm;