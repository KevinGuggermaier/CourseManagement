function getNewForm(data){
    if(data == null) {
        data = {
            R_id : '',
            Shortcut : '',
            Roomtype : '',
            Number : '',
            Floor : '',
            City : '',
            Address : '',
            Postcode : '',
            Description : '',
            Date : '',
            Remark : ''
        };
    }

    let header = "Neuen Raum einfügen";

    if(data.R_id) {
        header = "Raum " + data.Shortcut +" bearbeiten";
    }

    const form =` <!DOCTYPE html> 
        <html> 
            <head> 
                <title>Kurs Management System | ${header}</title> 
                <meta charset="UTF-8"> 
                <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                <link href="css/main.css" rel="stylesheet" type="text/css"/> 
                <link href="js/main.js" rel="stylesheet" type="text/javascript"/> 
            </head>
            <body> 
                <div id="courseManagement"> 
                    <h1>${header}</h1> 
                     <div id="insertData"> 
                    <form action="/save" method="POST">
                        <br class="inputHeader">
                        <input type="hidden" id="R_Id" value="{data.R_id}"/>
                        <input class="inputField" type="text" id="ShortCut" placeholder="Kurzbezeichnung" name="Shortcut" required> 
                        
                        <input class="inputField" type="text" id="RoomType" placeholder="Raumtyp" name="Roomtype" required> 
                        <input class="inputField" type="text" id="RoomNumber" placeholder="Raumnummer" name="Number" required> 
                        <input class="inputField" type="text" id="Floor" placeholder="Stockwerk" name="Floor" required> 

                        <p class="inputHeader">Adresse</p> 
                        <input class="inputField" type="text" name="input" id="Location" placeholder="Ort" name="City" required> 
                        <input class="inputField" type="text" id="LocationStreet" placeholder="Straße" name="Address"> 
                        <input class="inputField" type="text" id="LocationPlz" placeholder="Plz" name="Postcode"> 

                        <p class="inputHeader">Instandhaltung</p> 
                       
                        <input class="inputField" type="text" id="MA_Desc" placeholder="Bezeichnung" name="Description"> 
                        <input class="inputField" type="text" id="MA_Date" placeholder="Datum [yyyy-mm-dd]" name="Date"> 
                        <input class="inputField" type="text" id="MA_Remark" placeholder="Anmerkung" name="Remark"> 

                        <p class="inputHeader">* Rote Felder sind Pflichtfelder</p> 
                        <button id="submit" class="btn">Daten hinzufügen</button><br> 
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
/*
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
*/

module.exports = getNewForm;