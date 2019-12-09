function getFormForEdit(note1, location, roomtype, mainDesc, id) {
    const note = note1[0]
    console.log("Data in edit",note)
    // build form within javascriptå

    const test = `<!DOCTYPE html>
            <html>
                <head>
                    <title>Edit</title>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                    <link href="css/main.css" rel="stylesheet" type="text/css"/> 
                    <link href="css/table.css" rel="stylesheet" type="text/css"/> 
                    
                </head>
                <body>
                <div>
                    <p id="Id" style="display:none">${id}</p>
                    <p>Eintrag Bearbeiten</p>
                    <div class="insertData">
                        <p class="inputField">Kurzbezeichnung</p>
                        <input type="text" id="ShortCut" value="${note.Shortcut}" />
                         
                        <p class="inputField">Raumnummer</p>
                        <input class="inputField" type="text" id="RoomNumber" value="${note.Room_Number}" required /> 
                             
                        <p class="inputField">Raumtyp</p>
                        ${insertSelection(roomtype, note)}
                        
                        <p class="inputField">Stockwerk</p>
                        <input class="inputField" type="text" id="Floor" value="${note.Floor_Number}" required /> 

                        <p class="inputField">Adresse</p>
                        ${insertSelectionLocation(location, note)}
                        
                        <p class="inputHeader">Instandhaltung</p> 
                        <p class="inputField">Bezeichnung</p>
                        ${insertSelectionMainDesc(mainDesc, note)}
                        
                        <p class="inputField">Datum</p>
                        <input class="inputField" type="text" id="MA_Date" value="${note.Date}" /> 
                        <p class="inputField">Anmerkung</p>
                        <input class="inputField" type="text" id="MA_Remark" value="${note.Remark}" /> 
                        
                        <br>`+
                        //<button id="btnSave">save</button>
                        `<button id="submit">save</button>
                    </div>
                    <a href="/">Zurück</a>
                </div>
                <script src="js/editHandler.js" type="text/javascript"></script>  
                </body>
            </html>`;
    return test;
}

function insertSelection(item, selItem){
    let val = `<select id="roomType">`;
    if(item != null) {
        val += `<option value="${selItem.Roomtype_Id}">${selItem.Roomtype}</option>`;
        for (let i = 0; i < item.length; i++) {
            if(selItem.Roomtype_Id !== item[i].Roomtype_Id) {
                val += `<option value="${item[i].Roomtype_Id}">${item[i].Roomtype}</option>`;
            }
        }
    }
    val += `</select>`;
    return val
}

function insertSelectionLocation(item, selItem){
    //console.log(item)
    let val = `<select id="location">`;
    if(item != null) {
        val += `<option value="${selItem.Location_Id}">${selItem.Name}</option>`;
        for (let i = 0; i < item.length; i++) {
            if(selItem.Location_Id !== item[i].Location_Id) {
                val += `<option value="${item[i].Location_Id}">${item[i].Name}</option>`;
            }
        }
    }
    val += `</select>`;

    return val
}

function insertSelectionMainDesc(item, selItem){
    let val = `<select id="mainDesc">`;
    if(item != null) {
        val += `<option value="${selItem.Maintenance_Description_Id}">${selItem.Description}</option>`;
        for (let i = 0; i < item.length; i++) {
            if(selItem.Maintenance_Description_Id !== item[i].Maintenance_Description_Id) {
                val += `<option value="${item[i].Maintenance_Description_Id}">${item[i].Description}</option>`;
            }
        }
    }
    val += `</select>`;

    return val
}

module.exports = getFormForEdit;
