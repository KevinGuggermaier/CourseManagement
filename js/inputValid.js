let callAlert = false;

function checkNumber(value, setCallAlert) {

    if (!value.match(/^[\d]*$/)) {
        value = value.slice(0, value.length-1);
        if(setCallAlert){
            callAlert = true;
        }
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
    let t = value.match(/(\D)/);
    if(t != null)
        return t.length;
    else
        return 0;
}

function checkLength(value, max, setCallAlert) {
    if(value === null)
        return value;

    if(value.length > max){

        alert("Maximale Eingabe erreicht \nMaximal " + max + " Zeichen erlaubt");
        if(setCallAlert){
            callAlert = true;
        }

        return value.slice(0, max);
    }
    return value;
}

function checkString(value) {
    if (value.length === 0) {
        return value;
    }

    if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ]+$/)){
        value = value.slice(0, value.length-1);
        if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ]+$/)){
            alert("Unerlaubte Eingabe \nNur Buchstaben erlaubt");
            return  null;
        }else {
            alert("Unerlaubtes Zeichen \nNur Buchstaben erlaubt");
        }
    }
    return value;
}

function roomNumber() {
    let value = document.getElementById("RoomNumber").value;
    value = checkNumber(value, true);
    value = checkLength(value, 3, true);
    document.getElementById("RoomNumber").value = value;
}


function floor() {
    let value = document.getElementById("Floor").value;
    value = checkNumber(value, false);
    value = checkLength(value, 1, false);
    document.getElementById("Floor").value = value;
}


function shortCut() {
    let value = document.getElementById("ShortCut").value;

    value = value.replace(/[.]/g, "");

    switch(value.length){
        case 1:
            if(!value.match(/[a-z,A-Z]/)){
                value = null;
                alert("Unerlaubtes Zeichen \nNur Buchstaben erlaubt");
                callAlert = true;
            }
            break;
        case 2:
        case 3:
        case 4:
            if(!value.match(/([a-z,A-Z]{1}[0-9]+)$/)){
                value = value.substr(0, value.length-1)
                alert("Unerlaubtes Zeichen \nNur Ziffern erlaubt");
                callAlert = true;
            }
            value = value.replace(/(([a-z,A-Z]){1})/, "$1.");
            break;
        default:
            if(!value.match(/([a-z,A-Z]{1}[0-9]+)$/)){
                value = value.slice(0, value.length-1)
                alert("Unerlaubtes Zeichen \nNur Ziffern erlaubt");
                callAlert = true;
            }
            if(value.length == 6){
                value = value.slice(0,5);
                alert("Maximum erreicht \nzB.: G.100.2");
                callAlert = true;
            }
            //
            if(!value.match(/([a-z,A-Z]{1})([0-9]{3})([0-9]{1})$/) && value.length > 5){
                value = null;
                alert("Unerlaubter Eingabe \n Bsp.: G.100.2");
                callAlert = true;
            }else{
                value = value.replace(/([a-z,A-Z]{1})([0-9]{3})([0-9]{1})/, "$1.$2.$3");
            }
            break;
    }

    document.getElementById("ShortCut").value = value;
    // [a-z,A-Z].[0-9]*.[0-9]$
}


function roomType() {
    let value = document.getElementById("RoomType").value;
    document.getElementById("RoomType").value = checkString(value);
}

function locationPlz() {
    let value = document.getElementById("LocationPlz").value;
    if (value.length === 1 && value[0] === "0") {
        value = null;
        alert("Postleitzahl kann nicht mit 0 beginnen");
        callAlert = true;
    }else{
        value = checkNumber(value, true);
        value = checkLength(value, 4, true);
    }
    document.getElementById("LocationPlz").value = value;
}

function maDate(){
    let value = document.getElementById("MA_Date").value;

    value = value.replace(/[-]/g, "");

    value = checkNumber(value, true);

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
                alert("Unerlaubte Zahl \nfür Monat ist nur ein Wert zwischen 01 und 12 gültig");
                callAlert = true;
            }
            if(value.match(/^(\d{4}-)1[3-9]/)){
                value = value.replace(/^(\d{4}-)1[3-9]/, "$1");
                alert("Unerlaubte Zahl \nfür Monat ist nur ein Wert zwischen 01 und 12 gültig");
                callAlert = true;
            }
            break;
        case 7:
        case 8:
            value = value.replace(/^(\d{4})(\d{2})/, "$1-$2-");
            if(value.match(/^(\d{4}-)(\d{2}-)[4-9]/)){
                value = value.replace(/^(\d{4}-)(\d{2}-)[4-9]/, "$1$2");
                alert("Unerlaubte Zahl \nfür Tag ist nur ein Wert zwischen 01 und 31 gültig");
                callAlert = true;
            }
            if(value.match(/^(\d{4}-)(\d{2}-)3[2-9]/)){
                value = value.replace(/^(\d{4}-)(\d{2}-)3[2-9]/, "$1$2");
                alert("Unerlaubte Zahl \nfür Tag ist nur ein Wert zwischen 01 und 31 gültig");
                callAlert = true;
            }
            break;
        default:
            if(value.length > 9){
                value = null;
                alert("Unerlaubte Eingabe \nErlaubte Eingabe z.B.: 2019-12-31");
                callAlert = true;
            }else{
                if(value.length === 9){
                    alert("Maximale Eingabe erreicht");
                    callAlert = true;
                }
                value = value.substr(0, 8);
                value = value.replace(/^(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
            }

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
    if(value.length === 0){
        return;
    }
    if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ,0-9]+$/)){
        value = value.slice(0, value.length-1);
        if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ,0-9]+$/)){
            value = null;
            alert("Unerlaubte Eingabe \nNur Buchstaben und Ziffern erlaubt");
        }else{
            alert("Unerlaubtes Zeichen \nNur Buchstaben und Ziffern erlaubt");
        }
    }
    document.getElementById("MA_Remark").value = value;
}

function locationStreet() {
    let value = document.getElementById("LocationStreet").value;
    if(value.length === 0){
        return;
    }
    if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ,0-9,ß]+$/)){
        value = value.slice(0, value.length-1);
        if(!value.match(/^[a-z,ö,ä,ü,A-Z,Ä,Ö,Ü, ,0-9,ß]+$/)){
            value = null;
            alert("Unerlaubte Eingabe \nNur Buchstaben und Ziffern erlaubt");
        }else{

            alert("Unerlaubtes Zeichen \nNur Buchstaben und Ziffern erlaubt");
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
        document.getElementById("ShortCut").removeEventListener("focusout", fOutShortCut);
        setTimeout(() => {
            document.getElementById("ShortCut").addEventListener("focusout", fOutShortCut);
        },50);
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
        document.getElementById("MA_Date").removeEventListener("focusout", fOutMaDate);
        setTimeout(() => {
            document.getElementById("MA_Date").addEventListener("focusout", fOutMaDate);
        },50);
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
        document.getElementById("RoomNumber").removeEventListener("focusout", fOutRoomNumber);
        setTimeout(() => {
            document.getElementById("RoomNumber").addEventListener("focusout", fOutRoomNumber);
        },50);
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
        document.getElementById("LocationPlz").removeEventListener("focusout", fOutLocationPlz);
        setTimeout(() => {
            document.getElementById("LocationPlz").addEventListener("focusout", fOutLocationPlz);
        },50);
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