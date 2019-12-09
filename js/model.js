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
        const query = "select Room.*, Maintenance_Activity.MA_Id, Maintenance_Activity.Date, Maintenance_Activity.Remark, Maintenance_Activity.Description from Room left join Maintenance_Activity on Room.Shortcut = Maintenance_Activity.Shortcut";
        db.all(query, (error, result) => {
            if(error){
                reject(error);
            }else {
                resolve(result);
            }
        })
    })
}

function getOverviewRoomById(db, id){
    return new Promise((resolve, reject) => {
        const query = "select Room.*, Maintenance_Activity.MA_Id, Maintenance_Activity.Date, Maintenance_Activity.Remark, Maintenance_Activity.Description from Room left join Maintenance_Activity on Room.Shortcut = Maintenance_Activity.Shortcut " +
            "where Room.R_Id = " + id;
        db.all(query, (error, result) => {
            if(error){
                reject(error);
            }else {
                resolve(result);
            }
        })
    })
}

function selectAllFromRoom(db, Shortcut) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Room WHERE Shortcut = " + Shortcut;

        db.all(query, (error, results) => {
            if(error) {
                reject(error);
            } else {
                resolve(results);
            }
        });

    });

}



function insert(db, data) {
    console.log("[Insert]");
    let insertionRoom = insertRoom(db,data);
    let insertionMaintenance = insertMaintenace(db,data);
    return Promise.all([insertionRoom,insertionMaintenance]);
}

function insertRoom(db, data) {
    console.log("insert new room.");
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) Values (?, ?, ?, ?, ?, ?, ?)';
        console.log(data);
        db.all(query, [data.Shortcut, data.Number, data.Floor, data.Roomtype, data.City, data.Address, data.Postcode], (error, results) => {
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
        db.all(query, [data.Date, data.Remark, data.Description, data.Shortcut],(error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

function update(db, data) {
    console.log("[Update]");
    let updateRoom = updateRoom(db,data);
    let updateMaintenance = updateMaintenace(db,data);
    return Promise.all([updateRoom,updateMaintenance]);
}

function updateRoom(db, data) {
    console.log("update room.");
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Room SET Shortcut = ?, Number = ?, Floor = ?, Roomtype = ?, City = ?, Address = ?, Postcode = ? WHERE R_Id = ' + data.R_Id;
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

function updateMaintenace(db, data) {
    console.log("update maintenance activity.");
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Maintenance_Activity Date = ?, Remark = ?, Description = ?, Shortcut = ? WHERE Shortcut = ' + data.Shortcut;
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
    getOverviewRoomById,
    save(db,data) {
        if(!data.R_Id) {
            return insert(db,data)
        } else {
            return update(db,data)
        }
    },
    selectAllFromRoom
}
