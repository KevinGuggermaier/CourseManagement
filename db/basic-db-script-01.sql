DROP TABLE IF EXISTS Room;
DROP TABLE IF EXISTS Maintenance_Activity;
DROP TABLE IF EXISTS Roomtype;
DROP TABLE IF EXISTS Location;
DROP TABLE IF EXISTS Maintenance_Description;

CREATE TABLE IF NOT EXISTS Roomtype (
	Roomtype_Id				INT				IDENTITY(1,1),
	Roomtype				VARCHAR(20)		UNIQUE NOT NULL,
	PRIMARY KEY(Roomtype_Id)
);

CREATE TABLE IF NOT EXISTS Location (
	Location_Id			INT				IDENTITY(1,1),
	Name				VARCHAR(20)		UNIQUE NOT NULL,
	Address				VARCHAR(30)		NOT NULL,
	Postcode			NUMERIC(4)		NOT NULL,
	PRIMARY KEY(Location_Id)
);

CREATE TABLE IF NOT EXISTS Maintenance_Description (
	Maintenance_Description_Id			INT				IDENTITY(1,1),
	Description							VARCHAR(20)		UNIQUE NOT NULL,
	PRIMARY KEY(Maintenance_Description_Id)
);

CREATE TABLE IF NOT EXISTS Room (
	Shortcut		VARCHAR(10) 	PRIMARY KEY NOT NULL,
	Room_Number 	INT				NOT NULL,
	Floor_Number	INT				NOT NULL,
	Roomtype_Id		INT				NOT NULL,
	Location_Id		INT				NOT NULL,
	FOREIGN KEY (Roomtype_Id) REFERENCES Roomtype(Roomtype_Id),
	FOREIGN KEY (Location_Id) REFERENCES Location(Location_Id)
);

CREATE TABLE IF NOT EXISTS Maintenance_Activity (
	Maintenance_Activity_Id			INTEGER PRIMARY KEY AUTOINCREMENT,
	Date							DateTime		NOT NULL,
	Remark							VARCHAR(150)	NOT NULL,

	Room_Shortcut					VARCHAR(10)		NOT NULL,
	Maintenance_Description_Id		INT				NOT NULL,

	FOREIGN KEY (Maintenance_Description_Id) 
	REFERENCES Maintenance_Description(Maintenance_Description_Id),
	FOREIGN KEY (Room_Shortcut) 
	REFERENCES Room(Shortcut)
);


INSERT INTO Roomtype VALUES(1, 'EDV Labor');
INSERT INTO Roomtype VALUES(2, 'Seminarraum');
INSERT INTO Roomtype VALUES(3, 'Netzwerk Labor');
INSERT INTO Roomtype VALUES(4, 'Sonstiges');

INSERT INTO Location VALUES(1, 'Kapfenberg', 'Werk-VI-Strasse 46', 8605);
INSERT INTO Location VALUES(2, 'Graz', 'Alte Poststrasse 149', 8020);
INSERT INTO Location VALUES(3, 'Gleichenberg', 'Kaiser-Franz-Josef Str. 24', 8344);

INSERT INTO Maintenance_Description VALUES(1, 'Reinigung');
INSERT INTO Maintenance_Description VALUES(2, 'Reparatur');
INSERT INTO Maintenance_Description VALUES(3, 'Technischer Support');
INSERT INTO Maintenance_Description VALUES(4, 'Sonstiges');

INSERT INTO Room VALUES('G.100.2', 100, 2, 1, 2);
INSERT INTO Room VALUES('G.101.1', 101, 1, 2, 2);
INSERT INTO Room VALUES('K.210.2', 210, 2, 1, 1);
INSERT INTO Room VALUES('K.211.1', 212, 1, 3, 1);

INSERT INTO Maintenance_Activity (Date, Remark, Room_Shortcut, Maintenance_Description_Id) 
VALUES (DATE('now'), 'Jährliche Fensterreinigung', 'G.100.2', 1);
INSERT INTO Maintenance_Activity (Date, Remark, Room_Shortcut, Maintenance_Description_Id) 
VALUES (DATE('now'), 'Beamer Einstellungen', 'G.100.2', 2);
INSERT INTO Maintenance_Activity (Date, Remark, Room_Shortcut, Maintenance_Description_Id) 
VALUES (DATE('now'), 'Jährliche Fensterreinigung', 'K.210.2', 1);
INSERT INTO Maintenance_Activity (Date, Remark, Room_Shortcut, Maintenance_Description_Id) 
VALUES (DATE('now'), 'Jährliche Fensterreinigung', 'K.210.2', 1);
INSERT INTO Maintenance_Activity (Date, Remark, Room_Shortcut, Maintenance_Description_Id) 
VALUES (DATE('now'),'Jährliche Fensterreinigung', 'K.211.1', 1);




