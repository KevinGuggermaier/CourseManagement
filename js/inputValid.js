function not_a_Number(value) {
    if (!value.match(/^[\d]*$/)) {
        
        return true;
    } else {
        return false;
    }
}

function getNumberOfInvalidChar(value){
    let t = value.match(/(\D)/)
    if(t != null)
        return t.length;
    else
        return 0;
}
/*function shortCut() {
}

function roomType() {
    
}*/

function roomNumber() {
    let value = document.getElementById("RoomNumber").value;
    if(not_a_Number(value)){
        console.log("not a number");
        value = value.slice(0, value.length-1);
        if(getNumberOfInvalidChar(value) >= 1){
            value = null;
        }
        document.getElementById("RoomNumber").value = value;
    }
}

/*
function floor() {
    
}

function location() {
    
}

function locationStreet() {
    
}

function locationPlz() {
    
}

function maDesc() {
    
}


function maDate(){
    
}

function maRemark(){
}*/

/*document.getElementById("ShortCut").addEventListener("keyup", shortCut);
document.getElementById("RoomType").addEventListener("keyup", roomType);*/
document.getElementById("RoomNumber").addEventListener("keyup", roomNumber);
/*document.getElementById("Floor").addEventListener("keyup", floor);
document.getElementById("Location").addEventListener("keyup", location);
document.getElementById("LocationStreet").addEventListener("keyup", locationStreet);
document.getElementById("LocationPlz").addEventListener("keyup", locationPlz);
document.getElementById("MA_Desc").addEventListener("keyup", maDesc);
document.getElementById("MA_Date").addEventListener("keyup", maDate);
document.getElementById("MA_Remark").addEventListener("keyup", maRemark);*/