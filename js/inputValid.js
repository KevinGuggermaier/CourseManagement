function checkNumber(value) {
    if (!value.match(/^[\d]*$/)) {
        value = value.slice(0, value.length-1);
        if(getNumberOfInvalidChar(value) >= 1){
            value = null;
            return null;
        }else
            return value;
    }
    return value;
}

function getNumberOfInvalidChar(value){
    let t = value.match(/(\D)/)
    if(t != null)
        return t.length;
    else
        return 0;
}

function checkLength(value, max) {
    if(value.length > max){
        return value.slice(0, max);
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
}

/*
function roomType() {
    let value = document.getElementById("RoomType").value;
    
}

function location() {
    let value = document.getElementById("Location").value;
}

function locationStreet() {
    let value = document.getElementById("LocationStreet").value;
}

function locationPlz() {
    let value = document.getElementById("LocationPlz").value;
}

function maDesc() {
    let value = document.getElementById("MA_Desc").value;
}


function maDate(){
    let value = document.getElementById("MA_Date").value;
}

function maRemark(){
    let value = document.getElementById("MA_Remark").value;
}


document.getElementById("ShortCut").addEventListener("keyup", shortCut);
document.getElementById("RoomType").addEventListener("keyup", roomType);*/
document.getElementById("RoomNumber").addEventListener("keyup", roomNumber);
document.getElementById("Floor").addEventListener("keyup", floor);
/*document.getElementById("Location").addEventListener("keyup", location);
document.getElementById("LocationStreet").addEventListener("keyup", locationStreet);
document.getElementById("LocationPlz").addEventListener("keyup", locationPlz);
document.getElementById("MA_Desc").addEventListener("keyup", maDesc);
document.getElementById("MA_Date").addEventListener("keyup", maDate);
document.getElementById("MA_Remark").addEventListener("keyup", maRemark);*/