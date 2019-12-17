let callAlert = false;

function checkNumber(value) {
    if (!value.match(/^[\d]*$/)) {
        value = value.slice(0, value.length-1);
        callAlert = true;
        if(getNumberOfInvalidChar(value) >= 1){
            alert("Zu viele Invalide Zeichen\nEingabe wird zurückgesetzt");
            value = null;
            return null;
        }else {
            alert("Unerlaubtes Zeichen\nNur Zíffern erlaubt");
            return value;
        }
    }
    return value;
}

function getNumberOfInvalidChar(value){
    console.log("value" , value);
    let t = value.match(/(\D)/);
    if(t != null)
        return t.length;
    else
        return 0;
}

function checkLength(value, max) {
    if(value === null)
        return value;

    if(value.length > max){
        return value.slice(0, max);
    }
    return value;
}

function checkString(value) {
    if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ]+$/)){
        value = value.slice(0, value.length-1);
        if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ]+$/)){
            return  null;
        }
    }
    return value;
}

function roomNumber() {
    let value = document.getElementById("RoomNumber").value;
    value = checkNumber(value);
    value = checkLength(value, 3);
    document.getElementById("RoomNumber").value = value;
}


function floor() {
    let value = document.getElementById("Floor").value;
    value = checkNumber(value);
    value = checkLength(value, 1);
    document.getElementById("Floor").value = value;
}


function shortCut() {
    let value = document.getElementById("ShortCut").value;

    value = value.replace(/[.]/g, "");

    switch(value.length){
        case 1:
            if(!value.match(/[a-z,A-Z]/)){
                value = null;
            }
            console.log("1", value);
            break;
        case 2:
        case 3:
        case 4:
            if(!value.match(/([a-z,A-Z]{1}[0-9]+)$/)){
                value = value.substr(0, value.length-1)
            }
            value = value.replace(/(([a-z,A-Z]){1})/, "$1.");
            console.log("4", value);
            break;
        default:
            if(!value.match(/([a-z,A-Z]{1}[0-9]+)$/)){
                value = value.slice(0, value.length-1)
            }
            value = value.slice(0,5);
            if(!value.match(/([a-z,A-Z]{1})([0-9]{3})([0-9]{1})/)){
                value = null;
            }else{
                value = value.replace(/([a-z,A-Z]{1})([0-9]{3})([0-9]{1})/, "$1.$2.$3");

            }
             console.log("default");
            break;
    }

    document.getElementById("ShortCut").value = value;
    // [a-z,A-Z].[0-9]*.[0-9]$
}


function roomType() {
    console.log("Raum type")
    let value = document.getElementById("RoomType").value;
    console.log("value", value)
    if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ]+$/)){
        value = value.slice(0, value.length-1);
        if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ]+$/)){
            value = null;
        }
    }
    document.getElementById("RoomType").value = value;
}

function locationPlz() {
    let value = document.getElementById("LocationPlz").value;
    if (value.length === 1 && value[0] === "0") {
        value = null;
    }else{
        value = checkNumber(value);
        value = checkLength(value, 4);
    }
    document.getElementById("LocationPlz").value = value;
}

function maDate(){
    let value = document.getElementById("MA_Date").value;

    value = value.replace(/[-]/g, "");

    value = checkNumber(value);

    if(value === null){
        document.getElementById("MA_Date").value = value;
        return;
    }
    switch (value.length) {
        case 5:
        case 6:
            value = value.replace(/^(\d{4})/, "$1-");
            if(value.match(/^(\d{4}-)[2-9]/)){
                value = value.replace(/^(\d{4}-)[2-9]/, "$1");
            }
            if(value.match(/^(\d{4}-)1[3-9]/)){
                value = value.replace(/^(\d{4}-)1[3-9]/, "$1");
            }
            break;
        case 7:
        case 8:
            value = value.replace(/^(\d{4})(\d{2})/, "$1-$2-");
            if(value.match(/^(\d{4}-)(\d{2}-)[4-9]/)){
                value = value.replace(/^(\d{4}-)(\d{2}-)[4-9]/, "$1$2");
            }
            if(value.match(/^(\d{4}-)(\d{2}-)3[2-9]/)){
                value = value.replace(/^(\d{4}-)(\d{2}-)3[2-9]/, "$1$2");
            }
            break;
        default:
            value = value.substr(0, 8);
            value = value.replace(/^(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
            break;
    }

    document.getElementById("MA_Date").value = value;
}

function locationValid() {
    let value = document.getElementById("Location").value;
    document.getElementById("Location").value = checkString(value);
}

function maDesc() {
    let value = document.getElementById("MA_Desc").value;
    document.getElementById("MA_Desc").value = checkString(value);
}

function maRemark(){
    let value = document.getElementById("MA_Remark").value;
    if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ,0-9]+$/)){
        value = value.slice(0, value.length-1);
        if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ,0-9]+$/)){
            value = null;
        }
    }

}

function locationStreet() {
    let value = document.getElementById("LocationStreet").value;
    if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ,0-9]+$/)){
        value = value.slice(0, value.length-1);
        if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ,0-9]+$/)){
            value = null;
        }
    }
    document.getElementById("LocationStreet").value = value;
}

function fOutShortCut(){
    let value = document.getElementById("ShortCut").value;
    if(value.match(/^([a-z,A-Z].[0-9]{3}.[0-9]{1})$/)|| value.length === 0 || callAlert === true){
        callAlert = false;
        return;
    }
    if (confirm("Geben Sie eine vollständige Kurzbezeichnung ein [zB.: G.100.1]\n Bei Abbrechen wird der Inhalt gelöscht")) {
        document.getElementById("ShortCut").focus();
    } else {
        document.getElementById("ShortCut").value = null;
    }
}

function fOutMaDate(){
    let value = document.getElementById("MA_Date").value;
    if (value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)|| value.length === 0 || callAlert === true){
        callAlert = false;
        return;
    }
    if (confirm("Geben Sie eine vollständiges Datum ein [zB.: 2019-11-11]\n Bei Abbrechen wird der Inhalt gelöscht")) {
        document.getElementById("MA_Date").focus();
    } else {
        document.getElementById("MA_Date").value = null;
    }
}

function fOutRoomNumber(){
    let value = document.getElementById("RoomNumber").value;
    if(value.match(/^[0-9]{3}$/) || value.length === 0 || callAlert === true){
        callAlert = false;
        return;
    }

    if (confirm("Geben Sie eine vollständige Raumnummer ein [zB.: 001 oder 100]\n Bei Abbrechen wird der Inhalt gelöscht")) {
        document.getElementById("RoomNumber").focus();
    } else {
        document.getElementById("RoomNumber").value = null;
    }
}

function fOutLocationPlz(){
    let value = document.getElementById("LocationPlz").value;
    if(value.match(/^[0-9]{4}$/) || value.length === 0 || callAlert === true){
        callAlert = false;
        return;
    }
    if (confirm("Geben Sie eine vollständige Postleitzahl ein [zB.: 8020]\n Bei Abbrechen wird der Inhalt gelöscht")) {
        document.getElementById("LocationPlz").focus();
    } else {
        document.getElementById("LocationPlz").value = null;
    }
}

document.getElementById("ShortCut").addEventListener("keyup", shortCut);
document.getElementById("RoomType").addEventListener("keyup", roomType);
document.getElementById("RoomNumber").addEventListener("keyup", roomNumber);
document.getElementById("Floor").addEventListener("keyup", floor);
document.getElementById("LocationPlz").addEventListener("keyup", locationPlz);
document.getElementById("MA_Date").addEventListener("keyup", maDate);
document.getElementById("Location").addEventListener("keyup", locationValid);
document.getElementById("MA_Desc").addEventListener("keyup", maDesc);
document.getElementById("MA_Remark").addEventListener("keyup", maRemark);
document.getElementById("LocationStreet").addEventListener("keyup", locationStreet);

document.getElementById("ShortCut").addEventListener("focusout", fOutShortCut);
document.getElementById("MA_Date").addEventListener("focusout", fOutMaDate);
document.getElementById("RoomNumber").addEventListener("focusout", fOutRoomNumber);
document.getElementById("LocationPlz").addEventListener("focusout", fOutLocationPlz);