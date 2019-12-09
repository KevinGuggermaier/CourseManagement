DROP TABLE IF EXISTS Room;
DROP TABLE IF EXISTS Maintenance_Activity;


CREATE TABLE IF NOT EXISTS Maintenance_Activity (
	MA_Id			INTEGER PRIMARY KEY AUTOINCREMENT,
	Date							DateTime		NOT NULL,
	Remark							VARCHAR(150)	NOT NULL,
       Description							VARCHAR(20)	 NOT NULL,
	R_Id				INTEGER,

	FOREIGN KEY (R_Id) REFERENCES Room(R_Id)
);


CREATE TABLE IF NOT EXISTS Room (
        R_Id            INTEGER PRIMARY KEY AUTOINCREMENT,
	Shortcut		VARCHAR(10) NOT NULL,
	Number 	INT				NOT NULL,
	Floor	INT				NOT NULL,
	Roomtype				VARCHAR(20)		NOT NULL,
	City				VARCHAR(20)		 NOT NULL,
	Address				VARCHAR(50)		NOT NULL,
	Postcode			NUMERIC(4)		NOT NULL
);


INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) VALUES('G.100.2', 100, 2, 'EDV Labor', 'Graz', 'Alte Poststraße 147', 8010);
INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) VALUES('G.101.1', 101, 1, 'Seminarraum', 'Graz', 'Alte Poststraße 147', 8010);
INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) VALUES('K.210.2', 210, 2, 'Seminarraum', 'Kapfenberg', 'Wark-VI-Straße 5', 8605);
INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) VALUES('K.211.1', 212, 1, 'EDV Labor', 'Kapfenberg', 'Wark-VI-Straße 5', 8605);
INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) VALUES('G.108.2', 108, 2, 'Hörsaal', 'Graz', 'Alte Poststraße 147', 8010);
INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) VALUES('G.191.1', 191, 1, 'Hörsaal', 'Graz', 'Alte Poststraße 147', 8010);
INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) VALUES('K.219.2', 219, 2, 'Seminarraum', 'Kapfenberg', 'Wark-VI-Straße 5', 8605);
INSERT INTO Room (Shortcut, Number, Floor, Roomtype, City, Address, Postcode) VALUES('K.291.1', 291, 1, 'Hörsaal', 'Kapfenberg', 'Wark-VI-Straße 5', 8605);

INSERT INTO Maintenance_Activity (Date, Remark, Description, R_Id) VALUES (DATE('now'), 'Reinigung', 'Jährliche Fensterreinigung', 1);
INSERT INTO Maintenance_Activity (Date, Remark, Description, R_Id) VALUES (DATE('now'), 'Wartung', 'Beamer Einstellungen', 1);
INSERT INTO Maintenance_Activity (Date, Remark, Description, R_Id) VALUES (DATE('now'), 'Reinigung', 'Jährliche Fensterreinigung', 3);
INSERT INTO Maintenance_Activity (Date, Remark, Description, R_Id) VALUES (DATE('now'), 'Reinigung', 'Jährliche Fensterreinigung', 5);
INSERT INTO Maintenance_Activity (Date, Remark, Description, R_Id) VALUES (DATE('now'), 'Wartung', 'Beamer Einstellungen', 7);
INSERT INTO Maintenance_Activity (Date, Remark, Description, R_Id) VALUES (DATE('now'), 'Reparatur', '', 8);
INSERT INTO Maintenance_Activity (Date, Remark, Description, R_Id) VALUES (DATE('now'), 'Wartung', 'Beamer Einstellungen', 8);

