function getNewForm(data){
    console.log(data);

    let header;
    let flag;
    if(data == null) {
        data = {
            R_Id : '',
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
        header = "Neuen Raum einfügen";
        flag = "new";
    } else {
        data = data[0];
        header = "Raum " + data.Shortcut +" bearbeiten";
        flag = "edit"
    }



    const form =` <!DOCTYPE html> 
        <html> 
            <head> 
                <title>Kurs Management System | ${header}</title> 
                <meta charset="UTF-8"> 
                <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                <link href="css/main.css" rel="stylesheet" type="text/css"/> 
               
            </head>
            <body> 
                <div id="courseManagement"> 
                    <h1>${header}</h1> 
                     <div id="insertData"> 
                    <form action="/save" method="POST">
                        <br class="inputHeader">
                        <input type="hidden" id="R_Id" value="${data.R_Id}" name="R_Id"/>
                        <input type="hidden" id="flag" value="${flag}" name="flag"/>
                        <input class="inputField" type="text" id="ShortCut" placeholder="Kurzbezeichnung" name="Shortcut" value="${data.Shortcut}" required> 
                        
                        <input class="inputField" type="text" id="RoomType" placeholder="Raumtyp" name="Roomtype" value="${data.Roomtype}" required> 
                        <input class="inputField" type="text" id="RoomNumber" placeholder="Raumnummer" name="Number" value="${data.Number}" required> 
                        <input class="inputField" type="text" id="Floor" placeholder="Stockwerk" name="Floor" value="${data.Floor}" required> 

                        <p class="inputHeader">Adresse</p> 
                        <input class="inputField" type="text" id="Location" placeholder="Ort" name="City" value="${data.City}" required> 
                        <input class="inputField" type="text" id="LocationStreet" placeholder="Straße" name="Address" value="${data.Address}"> 
                        <input class="inputField" type="text" id="LocationPlz" placeholder="Plz" name="Postcode" value="${data.Postcode}"> 

                        <p class="inputHeader">Instandhaltung</p> 
                       
                        <input class="inputField" type="text" id="MA_Desc" placeholder="Bezeichnung" name="Description" value="${data.Description}"> 
                        <input class="inputField" type="text" id="MA_Date" placeholder="Datum [yyyy-mm-dd]" name="Date" value="${data.Date}"> 
                        <input class="inputField" type="text" id="MA_Remark" placeholder="Anmerkung" name="Remark" value="${data.Remark}"> 

                        <p class="inputHeader">* Rote Felder sind Pflichtfelder</p> 
                        <button id="submit" class="btn">Daten hinzufügen</button><br> 
                    </form>
                    <br>
                        <a href="/"><button id="back" class="btn">Zurück</button></a><br> 
                    </div> 
                    <br> 
                    
                    <br> 
                </div> 
               
            </body>
        </html>`;

    return form;
}

module.exports = getNewForm;