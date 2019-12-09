window.addEventListener("load", function () {
    console.log("LOAD")
});

function save(){

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
    //let VmaTime = document.getElementById("MA_Time").value;
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
    //jsonString += '"MainTime":"' + VmaTime + '",';
    jsonString += '"MainRemark":"' + VmaRemark + '"}';

    console.log(jsonString);
    let jsonObjectString = JSON.stringify(jsonString);
    let id = document.getElementById("Id").innerHTML;

    const url='http://localhost:8080/update/' + id;
    Http.open("POST", url, true);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.parse(jsonObjectString));

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }

  /*  const url2='http://localhost:8080';
    Http.open("GET", url2);
    Http.send()*/
}


document.getElementById("btnSave").addEventListener("click", save)