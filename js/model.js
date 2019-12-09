const db_file_path = '../db/rooms.db';
const db_script_path = '../db/basic-db-script-01.sql';

function open_db() {
    let sqlite = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.resolve(__dirname, db_file_path);

    let db = new sqlite.Database(dbPath, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    });
    return db;
}

/*
async function initialize_database(db) {
    let fs = require('fs');
    await fs.readFile(db_script_path, 'utf8', async function(err, contents) {
        //console.log("Initializing database. " + contents);
        await db.run(contents, function (err, rows) {
            console.log("error " + err);
            console.log("results " + rows);
        });
    });
}*/

function getOverviewRoom(db){
    return new Promise((resolve, reject) => {
        const query = "Select * from Room";
        db.all(query, (error, result) => {
            if(error){
                reject(error);
            }else {
                resolve(result);
            }
        })
    })
}

async function getOverviewById(db, id) {
    console.log("Get View RoomOverviewById");
    console.log("ID from model.js", id)
    return await new Promise((resolve, reject) => {
        const query = "SELECT Room.Id, Room.Shortcut, Room.Room_Number, Room.Floor_Number, Roomtype.Roomtype , Location.Address, Location.Name, Location.Postcode FROM " +
            "Room INNER JOIN Location ON Room.Location_Id == Location.Location_Id " +
            "INNER JOIN Roomtype ON Room.Roomtype_Id == Roomtype.Roomtype_Id where Room.Id = " + id;

        const t = "SELECT * from Room INNER JOIN Location on Room.Location_Id == Location.Location_Id LEFT JOIN Maintenance_Activity on Room.Id == Maintenance_Activity.Room_Id" +
            " INNER JOIN Roomtype ON Room.Roomtype_Id == Roomtype.Roomtype_Id LEFT JOIN Maintenance_Description on Maintenance_Description.Maintenance_Description_Id == Maintenance_Activity.Maintenance_Description_Id " +
            "where Room.Id = " + id;

        console.log(t);

        db.all(t, (error, results) => {
            if(error) {
                reject(error);
            } else {
                console.log("result", results);
                resolve(results);
            }
        });

    });

}

function getMaintenanceOverview(db) {
    console.log("Get Maintenance Activity Overview")

    return new Promise((resolve, reject) => {
       const query = "SELECT Maintenance_Activity.Room_Id, Maintenance_Activity.Room_Shortcut, Maintenance_Activity.Remark, Maintenance_Activity.Date, Maintenance_Description.Description " +
           "FROM Maintenance_Activity JOIN Maintenance_Description ON Maintenance_Activity.Maintenance_Description_Id = Maintenance_Description.Maintenance_Description_Id";

       db.all(query, (error, result) => {
           if(error) {
               //console.log(error);
               reject(error);
           } else {
               //console.log(result);
               resolve(result);
           }
       });
    });
}

async function insert(db, data) {
    console.log("[Insert]");
    let insertionRoom = insertRoom(db,data);
    let insertionMaintenance = insertMaintenace(db,data);
    return await Promise.all([insertionRoom,insertionMaintenance]);
}

function insertRoom(db, data) {
    console.log("insert new room.");
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) Values (?, ?, ?, ?, ?, ?, ?)';
        console.log(data);
        db.run(query, [data.Shortcut, data.Number, data.Floor, data.Roomtype, data.City, data.Address, data.Postcode], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

function insertMaintenace(db, data) {
    console.log("insert new maintenance activity.");
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Maintenance_Activity (Date, Remark, Description, Shortcut) Values (?, ?, ?, ?)';
        console.log(data);
        db.run(query, [data.Date, data.Remark, data.Description, data.Shortcut],(error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

function getIdFromInsertRoom(db, data){
    console.log("get id insert new room.");
    return new Promise((resolve, reject) => {
        const query = 'SELECT Id from Room order by Id desc';

       //console.log(data)
        db.all(query,(error, results) => {
            if (error) {
               // console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

}


function updateMainDesc(db, room_data, id) {

    console.log("update Main desc")

    const query = 'Select * from Maintenance_Activity where Room_Id = ' + id;
    let request = null;
    db.all(query, function(err, res) {
        if (err) {
            console.log(err.message);
        }
        request = res;
        if(res.length === 0){
            db.all('INSERT INTO Maintenance_Activity (Room_Shortcut, Date, Remark, Room_Id, Maintenance_Description_Id) Values (?, ?, ?, ?, ?)',
                [room_data.ShortCut, room_data.MainDate, room_data.MainRemark, id, room_data.MainDescription], function(err, res) {
                    if (err) {
                        console.log(err.message);
                    }
                    console.log(res);
            });
        }else
        {
            db.run("UPDATE Maintenance_Activity SET Date = ?, Remark = ?, " +
                "Room_Shortcut = ?, Maintenance_Description_Id = ? " +
                "WHERE Room_Id = " + id, [room_data.MainDate, room_data.MainRemark, room_data.ShortCut, room_data.MainDescription], function(err, res) {
                if (err) {
                    console.log(err.message);
                }
                console.log(res);
            });
        }

    });

/*    db.all('INSERT INTO Maintenance_Activity (Room_Shortcut, Date, Remark, Room_Id, Maintenance_Description_Id) Values (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Room_Id = ' + id,
        [room_data.ShortCut, room_data.MainDate, room_data.MainRemark, id, room_data.MainDescription], function(err, res) {
        if (err) {
            console.log(err.message);
        }
        console.log(res);
    });

    db.run("UPDATE Maintenance_Activity SET Date = ?, Remark = ?, " +
        "Room_Shortcut = ?, Maintenance_Description_Id = ? " +
        "WHERE Room_Id = " + id, [room_data.MainDate, room_data.MainRemark, room_data.ShortCut, room_data.MainDescription], function(err, res) {
        if (err) {
            console.log(err.message);
        }
        console.log(res);
    });*/
}


function update_room(db, room_data, id) {
    console.log("update room.");
    //const query = "UPDATE Room SET Shortcut = ?, Room_Number = ?, Floor_Number = ?, Roomtype_Id = ?, Location_Id = ? WHERE Id = " + id;
    //db.all(query, [room_data.ShortCut, room_data.RoomNumber, room_data.Floor, room_data.RoomType, room_data.Location], (error, re))
    db.run("UPDATE Room SET Shortcut = ?, Room_Number = ?, " +
            "Floor_Number = ?, Roomtype_Id = ?, Location_Id = ?  " +
        "WHERE Id = " + id, [room_data.ShortCut, room_data.RoomNumber, room_data.Floor, room_data.RoomType, room_data.Location], function(err, res) {
        if (err) {
            console.log(err.message);
        }
        console.log(res);
    });
}

function delete_room(db, shortcut) {
    console.log("delete room.");
    db.run("DELETE FROM Room WHERE Shortcut = ?", shortcut, function(err, res) {
        if (err) {
            console.log(err.message);
        }
        console.log(res);
    });
}

function close_db(db) {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = {
    /*initialize_database,*/
    open_db,
    close_db,
    getOverviewRoom,
    insert
}
