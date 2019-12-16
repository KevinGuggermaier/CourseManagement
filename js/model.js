const db_file_path = '../db/rooms.db';

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

function remove(db, data){
    console.log("[Delete]");
    let deletionRoom = removeRoom(db,data);
    let deletionMaintenance = removeMaintenance(db,data);
    return Promise.all([deletionRoom,deletionMaintenance]);
}

function removeRoom(db, data){
    console.log("remove room data entry %s", data)
}

function removeMaintenance(db, data){
    console.log("remove maintenance data entry %s", data)
}

function insert(db, data) {
    console.log("[Insert]");
    let insertionRoom = insertRoom(db,data);
    let insertionMaintenance = insertMaintenance(db,data);
    return Promise.all([insertionRoom,insertionMaintenance]);
}

function insertRoom(db, data) {
    console.log("insert new room.");
    data.Shortcut = data.Shortcut.toString().toUpperCase();
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

function insertMaintenance(db, data) {
    console.log("insert new maintenance activity.");
    data.Shortcut = data.Shortcut.toString().toUpperCase();
    const query1 = "Select * from Maintenance_Activity Where Shortcut = " + '"' + data.Shortcut + '"';
    let request = null;
    db.all(query1, (err, res) => {
        if (err) {
            console.log(err.message);
        }
        request = res;
        if(res.length === 0){
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
    });
}

function update(db, data) {
    console.log("[Update]");
    let updateRoom1 = updateRoom(db,data);
    let updateMaintenance1 = updateMaintenance(db,data);
    return Promise.all([updateRoom1,updateMaintenance1]);
}

function updateRoom(db, data) {
    console.log("update room.");
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Room SET Number = ?, Floor = ?, Roomtype = ?, City = ?, Address = ?, Postcode = ? WHERE R_Id = ' + data.R_Id;
        console.log(data);
        db.run(query, [data.Number, data.Floor, data.Roomtype, data.City, data.Address, data.Postcode], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

function updateMaintenance(db, data) {
    console.log("update maintenance activity.");

    const queryMain = "Select * from Maintenance_Activity where Shortcut = " + '"' + data.Shortcut + '"';
    let request = null;

    db.all(queryMain, function(err, res) {
        if (err) {
            console.log(err.message);
        }
        request = res;
        if(res.length === 0){
            return new Promise((resolve, reject) => {
                db.all('INSERT INTO Maintenance_Activity (Date, Remark, Description, Shortcut) Values (?, ?, ?, ?)',
                    [data.Date, data.Remark, data.Description, data.Shortcut], function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res)
                        }

                    });
            });
        } else
        {
            return new Promise((resolve, reject) => {
                db.run('UPDATE Maintenance_Activity SET Date = ?, Remark = ?, Description = ?, Shortcut = ? WHERE Shortcut = ' + '"' + data.Shortcut + '"',
                    [data.Date, data.Remark, data.Description, data.Shortcut], function (err, res) {
                        if (err) {
                            reject(err);
                        }else
                        {
                            resolve(res);
                        }

                    });
            });
        }
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
