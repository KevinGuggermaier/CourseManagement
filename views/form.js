let maintenanceActivity = "";

//function getForm(data, rooomtype, location, mainDesc, maintenancy){
function getForm(){
    //console.log(rooomtype);

    const form = `<!DOCTYPE html>
    <html lang="de">
        <head>
        <title>Kurs Management System | Home</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      
    <meta charset="UTF-8">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/main.css" rel="stylesheet" type="text/css"/>
        <link href="css/table.css" rel="stylesheet" type="text/css"/>
        <link href="js/main.js" rel="script" type="text/javascript"/>

        </head>
        <body>
        <div id="courseManagement">
        <h1>Kurse Management System</h1>
    <button id="btnPrint" class="btn">Seite drucken</button>
    <div id="SearchInputDiv">
        <label for="SearchInput"></label><input type="text" id="SearchInput" placeholder="Suche ...">
        </div>
        <a href="/insertNewRoom"><button id="InsertNewRoom" class="btn">Neue Daten hinzufügen</button></a>
                <button id="exportPDfRoom" class="btn">Als PDF exportieren</button>
                <button id="exportExcelRoom" class="btn">Als Excel exportieren</button>
          
        <form action="fileupload" method="post" enctype="multipart/form-data">
            <input type="file" name="filetoupload">
            <input type="submit" value="Importieren" class="btn">
        </form>
        <br>    
    <br>
    <table id="RoomOverviewTable"></table>
        <br>
        <div id="else_text"></div>
        </div>
        <script src="js/main.js" type="text/javascript"></script>
        <script src="lib/jspdf.plugin.autotable.js" type="text/javascript"></script>
        </body>
        </html>`

    return form;
}



module.exports = getForm;