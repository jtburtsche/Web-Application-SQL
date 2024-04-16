/*
    Names: John Burtsche, Luke Guyre
    Assignment: Project Step 3: Data Manipulation Queries
    Description: back-end CRUD queries
*/

/*
Code Citation
Date: 02/12/2034
Adapted from: Project Step 3 Draft Version: Design HTML Interface + DML SQL Assignment canvas assignment page
Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456216?module_item_id=23809330

*/

/* Block for Purchases */
--Show all purchases
SELECT * FROM 'Purchases';

--Query to add a new Purchase to the purchase table with the colon : character denoting the variables that will have data from the backend programming language
INSERT INTO Purchases(customer_id, date_placed, total_price)
VALUES(:customer_id_input, :date_placed_input, :total_price_input);

--Query to delete a Purchase with the colon : character denoting the variable that will have data from the backend programming language
DELETE FROM Purchases WHERE purchase_id = :purchase_id_from_browse_purchases_page;

--Query to update a purchase with the colon : character denoting the variables that will have data from the backend programming language
UPDATE Purchases SET customer_id = :customer_id_from_update_form, :date_placed_from_update_form, total_price = :total_price_from_update_form



/* Block for Deliveries */
--Show all of the Deliveries
SELECT * FROM 'Deliveries';

--Query to add a new Delivery to the delivery table with the colon : character denoting the variables that will have data from the backend programming language
INSERT INTO Deliveries(employee_id, customer_id, delivery_complete, date_to_be_delivered, delivery_distance, address_line1, address_line2, state, zip_code, item_to_be_deilvered)
VALUES(:employee_id_input, :customer_id_input, :delivery_complete_input, :date_to_be_delivered_input, :delivery_distance_input, :address_line1_unput, :address_line2_input, :state_input, :zip_code_input, :item_to_be_deilvered_input);

--Query to delete a Delivery with the colon : character denoting the variable that will have data from the backend programming language
DELETE FROM Deliveries WHERE delivery_id = :delivery_id_from_browse_deliveries_page

--Query to update a Delivery with the colon : character denoting the variables that will have data from the backend programming language
UPDATE Deliveries SET employee_id = :employee_id_from_update_form, customer_id = :customer_id_from_update_form, delivery_complete = :delivery_complete_from_update_form, date_to_be_delivered = :date_to_be_delivered_from_update_form, delivery_distance = :delivery_distance_from_update_form, address_line1 = :address_line1_from_update_form, address_line2 = :address_line2_from_update_form, state = :state_from_update_form, zip_code = :zip_code_from_update_form, item_to_be_deilvered = :item_to_be_deilvered_from_update_form;




/* Block for the TransportVehicles */
--Show all the TransportVehicles
SELECT * FROM 'TransportVehicles';

--Query to add a new TransportVehicle to the transportVehicle table with the colon : character denoting the variables that will have data from the backend programming language
INSERT INTO TransportVehicles(vehicle_status, last_service_date, mileage, terrain_type)
VALUES(:vehicle_status_input, last_service_date_input, mileage_input, terrain_type_input);

--Query to delete a TransportVehicle with the colon : character denoting the variable that will have data from the backend programming language
DELETE FROM TransportVehicles WHERE vehicle_id = :vehicle_id_from_browse_transportvehicles_page

--Query to update a TransportVehicle with the colon : character denoting the variables that will have data from the backend programming language
UPDATE TransportVehicles SET vehicle_status = :vehicle_status_from_update_form, last_service_date = :last_service_date_from_update_form, mileage = :mileage_from_update_form, terrain_type = :terrain_type_from_update_form;




/* Block for the Employees */
--Show all of the Employees
SELECT * FROM 'Employees';

--Query to add a new Employee to the employees table with the colon : character denoting the variables that will have data from the backend programming language
INSERT INTO Employees(pay, employee_name)
VALUES(:pay_input, :employee_name_input);


--Query to delete an Employee with the colon : character denoting the variable that will have data from the backend programming language
DELETE FROM Employees WHERE employee_id = employee_id_from_browse_employees_page;

--Query to update an employee with the colon : character denoting the variables that will have data from the backend programming language
UPDATE Employees SET pay = :pay_from_update_form, employee_name = :employee_name_from_update_form;



/* Block for the Customers */
--Show all of the Customers
SELECT * FROM 'Customers';

--Query to add a new Customer to the customers table with the colon : character denoting the variables that will have data from the backend programming language
INSERT INTO Customers(customer_name, phone_number, email)
Values(:customer_name_input, :phone_number_input, :email_input)

--Query to delete a customer with the colon : character denoting the variable that will have data from the backend programming language
DELETE FROM Customers WHERE customer_id = customer_id_from_browse_customers_page;

--Query to update a customer with the colon : character denoting the variables that will have data from the backend programming language
UPDATE Customers SET customer_name = :customer_name_from_update_form, phone_number = :phone_number_from_update_form, email = :email_from_update_form;



/* Block for M:M intersection table EmployeesTransportVehicles */
--Associate an Employee with a TransportVehicle with the colon : character denoting the variables that will have data from the backend programming language
INSERT INTO EmployeesTransportVehicles(employee_id, vehicle_id) 
VALUES(:employee_id_input, :vehicle_id_input)

--Dis-associate a transportvehicle from a person with the colon : character denoting the variables that will have data from the backend programming language
DELETE FROM EmployeesTransportVehicles WHERE employee_id = :employee_id_from_browse_employeestransportvehicles_page AND vehicle_id = vehicle_id_from_browse_employeetransportvehicles_page;