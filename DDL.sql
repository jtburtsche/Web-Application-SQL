SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/* Creates all the tables for each one of our entities*/
CREATE Or REPLACE TABLE Purchases (
    purchase_id int NOT NULL AUTO_INCREMENT,
    customer_id int NOT NULL,
    date_placed date NOT NULL, 
    total_price int NOT NULL,
    PRIMARY KEY(purchase_id),
    UNIQUE(purchase_id)
);

CREATE Or REPLACE TABLE Deliveries (
    delivery_id int NOT NULL AUTO_INCREMENT,
    employee_id int NOT NULL,
    customer_id int NOT NULL,
    delivery_complete boolean NOT NULL DEFAULT 0,
    date_to_be_delivered date NOT NULL, 
    delivery_distance int NOT NULL,
    address_line1 varchar(50) NOT NULL,
    address_line2 varchar(50) DEFAULT NULL,
    state varchar(50) NOT NULL,
    zip_code varchar(15) NOT NULL,
    items_to_be_delivered varchar(200) NOT NULL,
    PRIMARY KEY(delivery_id),
    UNIQUE(delivery_id)
);

CREATE Or REPLACE TABLE EmployeesTransportVehicles (
    employees_transportvehicles_id int NOT NULL AUTO_INCREMENT,
    employee_id int NOT NULL,
    vehicle_id int NOT NULL,
    PRIMARY KEY(employees_transportvehicles_id),
    UNIQUE(employees_transportvehicles_id)
);

CREATE Or REPLACE TABLE TransportVehicles (
    vehicle_id int NOT NULL AUTO_INCREMENT,
    vehicle_status boolean NOT NULL DEFAULT 1,
    last_service_date date NOT NULL, 
    mileage int NOT NULL,
    terrain_type varchar(15) NOT NULL,
    PRIMARY KEY(vehicle_id),
    UNIQUE(vehicle_id)
);

CREATE Or REPLACE TABLE Employees (
    employee_id int NOT NULL AUTO_INCREMENT,
    pay int NOT NULL,
    employee_name varchar(50) NOT NULL,
    PRIMARY KEY(employee_id),
    UNIQUE(employee_id)
);

CREATE Or REPLACE TABLE Customers (
    customer_id int NOT NULL AUTO_INCREMENT,
    customer_name varchar(50) NOT NULL,
    phone_number varchar(10) NOT NULL,
    email varchar(100) NOT NULL,
    PRIMARY KEY(customer_id),
    UNIQUE(customer_id)
);


/*Adds the necessary foreign keys*/
ALTER TABLE Purchases
ADD FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)ON DELETE CASCADE;

ALTER TABLE Deliveries
ADD FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE,
ADD FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE;

ALTER TABLE EmployeesTransportVehicles
ADD FOREIGN KEY (vehicle_id) REFERENCES TransportVehicles(vehicle_id) ON DELETE CASCADE;

ALTER TABLE EmployeesTransportVehicles
ADD FOREIGN KEY (employee_id) REFERENCES  Employees(employee_id) ON DELETE CASCADE;

/*Inserts the appropriate data into each table*/
INSERT INTO Customers (customer_id, customer_name, phone_number, email)
VALUES (1, 'Linda', 6295851810, 'vafucmnxfwcxxvfaci@cazlv.com'),
(2, 'Philip', 8567279744, 'xez67376@omeie.com'),
(3, 'Steve', 5882897921, 'ivu15774@omeie.com'),
(4, 'Tina', 2239183340, 'toral32669@namewok.com');

INSERT INTO Purchases (customer_id, date_placed, total_price)
VALUES (1, '3000-01-24', 300),
(2, '3000-01-20', 10),
(3, '3000-01-04', 150),
(4, '3000-02-04', 600),
(2, '3000-02-01', 60);

Insert INTO Employees (employee_id, pay, employee_name)
VALUES (1, 60000, 'Bob'),
(2, 55000, 'Gretchen'),
(3, 45000, 'Tim'),
(4, 70000, 'Lee');

Insert INTO Deliveries (delivery_id, employee_id, customer_id, delivery_complete, date_to_be_delivered, delivery_distance, address_line1, address_line2, state, zip_code, items_to_be_delivered)
VALUES (1, 1, 1, 1,	'3000-02-06', 50, '902 Pine Drive', NULL, 'CO', 80920, 'Water, Toothpaste'),
(2,	1,	3,	1,	'3000-02-07', 100,	'846 Leaf Lane', NULL, 'OH',	43001,	'Vegetable seeds'),
(3,	2,	2,	0,	'3000-02-01', 60, '305 Brick Road',	NULL,	'NJ',	98223,	'Frying pan, batteries'),
(4,	3,	2,	1,	'3000-02-10', 60, '305 Brick Road',	NULL,	'NJ',	98223,	'Baby formula, phone case'),
(5,	4,	4,	0,	'3000-02-15', 8, '4 Duck Drive',	NULL,	'IL',	60007,	'emergency blankets');

Insert INTO TransportVehicles (vehicle_id, vehicle_status, last_service_date, mileage, terrain_type)
VALUES (1, 1, '2999-12-27', 70000, 'Land'),
(2, 1, '2999-12-28', 60000, 'Land'),
(3, 1, '2999-12-29', 100000, 'Land and Marsh');

INSERT INTO EmployeesTransportVehicles (employees_transportvehicles_id, employee_id, vehicle_id)
VALUES (1, 1, 3),
(2, 2, 2),
(3, 3, 1),
(4, 4, 1),
(5, 1, 2),
(6, 2, 1);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;