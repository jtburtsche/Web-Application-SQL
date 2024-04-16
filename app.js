/*Code based on https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data--}}
Changes were made to meet the specifications of our entities
*/

/*
    SETUP for a simple web app
*/
/*
    Citation for the following function:
    Date: 02/20/2024
    The following code was copied from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

    This code was copy and pasted to setup the website and to setup using JSON and Form data. The only thing that was changed was the PORT number.
*/
// Express
var express = require('express');   // We are using the express library for the web server
const path = require('path')
var app     = express();            // We need to instantiate an express object to interact with the server in our code


// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 51275;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')

/*
    End of citation 
*/


// Handlebars Setup
/*
    Citation for the following function:
    Date: 02/25/2024
    The following code was copied from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)

    This code was copy and pasted to setup using handlebars
*/
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
/*
    End of citation 
*/


/*
    ROUTES
*/
/*
    Citation for the following function:
    Date: 02/25/2024
    The following code was copied from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)

    This code was copy and pasted to setup the website. The only thing that was changed was rendering home instead of returning a string saying that the server is running.
*/
app.get('/', function(req, res)
    {
        res.render('home');

    });
/*
    end of citation
*/


/*
    Customers
*/
/*
    Citation for the following function:
    Date: 02/25/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data, and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box

    This code was adapted from the two sources to display the customers in a table and allow someone to display a search of the customers.
*/
app.get('/customers', function(req, res)
    {
        // Declare Query 1
        let query1;
    
        // If there is no query string, we just perform a basic SELECT
        if (req.query.customername === undefined || req.query.customername === "")
        {
            query1 = "SELECT * FROM Customers;";
        }

        // If there is a query string, we assume this is a search, and return desired results
        else
        {
            query1 = `SELECT * FROM Customers WHERE customer_name LIKE '${req.query.customername}'`
        
        }
    
        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){
            
        //Display the customers page with the data
        return res.render('customers', {data: rows});

        })
    });

/*
    end of citation
*/

//Adding a customer 
/*
    Citation for the following function:
    Date: 02/25/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

    This code was adapted to use the customers entity to insert data into the entity
*/
app.post('/add-customer-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers(customer_name, phone_number, email) VALUES ('${data.customername}', '${data.phonenumber}', '${data.email}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                    res.render('customers', {data:rows});
                }


            })
        }
    })
});
/*
    end of citation
*/


//Deleting a Customer

/*
    Citation for the following function:
  Date: 02/25/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was largely copied to allow the Customers page to have a delete function that would interact with the database. The major changes were the route and the SQL. 
*/
app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customer_id = parseInt(data.id);
    let deletecustomer = `DELETE FROM Customers WHERE customer_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deletecustomer, [customer_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and // presents it on the screen
            else{
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/


//Updating a customer 
/*
    Citation for the following function:
  Date: 02/25/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

  This code was largely copied to allow the Customers page to have an edit function that would interact with the database. The major changes were the route and the SQL. 
*/
app.put('/update-customer-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let customer = parseInt(data.customerID);
    let email = data.email;

    
    let queryUpdateCustomer = `UPDATE Customers SET email = ? WHERE Customers.customer_id = ?`;
    let selectemail = `SELECT * FROM Customers WHERE customer_id = ?`;


    db.pool.query(queryUpdateCustomer, [email, customer], function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            db.pool.query(selectemail, [customer], function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/

  
/*
    Deliveries
*/

/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data, and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box

    This code was adapted from the two sources to display the deliveries in a table and allow someone to display a search of the deliveries.
*/
app.get('/deliveries', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.address === undefined||req.query.address === "")
    {
        query1 = "SELECT * FROM Deliveries;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Deliveries WHERE address_line1 LIKE '${req.query.address}'`
    
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Customers;";
    let query3 = "SELECT * FROM Employees;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the purchases
        let deliveries = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the customers
            let customers = rows;

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let customermap = {}
            customers.map(customer => {
                let id = parseInt(customer.customer_id, 10);

                customermap[id] = customer["customer_name"];
            })

           
            //Run the 3rd query
            db.pool.query(query3, (error, rows, fields) => {
            
                // Save the employees
                let employees = rows;
                 // Overwrite the customer and employee ID's with the names
                 let employeemap = {}
            employees.map(employee => {
                let id = parseInt(employee.employee_id, 10);

                employeemap[id] = employee["employee_name"];
            })

            deliveries = deliveries.map(delivery => {
                return Object.assign(delivery, {customer_id: customermap[delivery.customer_id]}, {employee_id: employeemap[delivery.employee_id]})
            })
                return res.render('deliveries', {data: deliveries, customers: customers, employees:employees});
            })

        })
    })
});
/*
    end of citation
*/


//Adding a delivery 
/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

    This code was adapted to use the deliveries entity to insert data into the entity
*/
app.post('/add-delivery-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Deliveries(employee_id, customer_id, delivery_complete, date_to_be_delivered, delivery_distance, address_line1, address_line2, state, zip_code, items_to_be_delivered) VALUES ('${data.employeeName}', '${data.CustomerID}', '${data.DeliveryComplete}', '${data.DateToBeDelivered}', '${data.DeliveryDistance}', '${data.AddressLine1}', '${data.AddressLine2}', '${data.State}', '${data.ZipCode}', '${data.ItemsToBeDelivered}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM Deliveries;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/

//Deleting a Delivery
/*
    Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was largely copied to allow the Deliveries page to have a delete function that would interact with the database. The major changes were the route and the SQL. 
*/
app.delete('/delete-delivery-ajax', function(req,res,next){
    let data = req.body;
    let delivery_id = parseInt(data.id);
    let deletedelivery = `DELETE FROM Deliveries WHERE delivery_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deletedelivery, [delivery_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM Deliveries;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
//Updating a delivery
/*
    Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

  This code was largely copied to allow the Deliveries page to have an edit function that would interact with the database. The major changes were the route and the SQL. 
*/
app.put('/update-delivery-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let delivery = parseInt(data.deliveryID);
    let deliveryComplete = data.deliveryComplete;

    
    let queryUpdateDelivery = `UPDATE Deliveries SET delivery_complete = ? WHERE Deliveries.delivery_id = ?`;
    let selectdeliveryComplete = `SELECT * FROM Deliveries WHERE delivery_id = ?`;


    db.pool.query(queryUpdateDelivery, [deliveryComplete, delivery], function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            db.pool.query(selectdeliveryComplete, [delivery], function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});


/*
    Employees
*/

/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data, and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box

    This code was adapted from the two sources to display the employees in a table and allow someone to display a search of the employees.
*/
app.get('/employees', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name === undefined ||req.query.name === "")
    {
        query1 = "SELECT * FROM Employees;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Employees WHERE employee_name LIKE '${req.query.name}'`
    
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Employees;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            return res.render('employees', {data: people, planets: planets});
        })
    })
});
/*
    end of citation
*/

    
//Adding a Employee
/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

    This code was adapted to use the employees entity to insert data into the entity
*/
app.post('/add-employee-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Employees(pay, employee_name) VALUES ('${data.pay}', '${data.employeename}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/
//Deleting a Employee
/*
    Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was largely copied to allow the employee page to have a delete function that would interact with the database. The major changes were the route and the SQL. 
*/
app.delete('/delete-employee-ajax', function(req,res,next){
    let data = req.body;
    let employee_id = parseInt(data.id);
    let deleteemployee = `DELETE FROM Employees WHERE employee_id = ?`;

          // Run the 1st query
          db.pool.query(deleteemployee, [employee_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/

//Update an Employee
/*
    Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

  This code was largely copied to allow the employee page to have an edit function that would interact with the database. The major changes were the route and the SQL. 
*/
app.put('/update-employee-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let employee = parseInt(data.employeeID);
    let pay = data.pay;

    
    let queryUpdateEmployee = `UPDATE Employees SET pay = ? WHERE Employees.employee_id = ?`;
    let selectpay = `SELECT * FROM Employees WHERE employee_id = ?`;


    db.pool.query(queryUpdateEmployee, [pay, employee], function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            db.pool.query(selectpay, [employee], function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/
/*
    Purchases
*/

/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data, and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box

    This code was adapted from the two sources to display the purchases in a table and allow someone to display a search of the purchases.
*/
app.get('/purchases', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name === undefined)
    {
        query1 = "SELECT * FROM Purchases;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Purchases WHERE customer_id LIKE '${req.query.name}'`
    
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Customers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the purchases
        let purchases = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the customers
            let customers = rows;

            // Construct an object for reference in the table
            // Array.map is awesome for doing something with each
            // element of an array.
            let customermap = {}
            customers.map(customer => {
                let id = parseInt(customer.customer_id, 10);

                customermap[id] = customer["customer_name"];
            })

            // Overwrite the customer ID with the name of the customer
            purchases = purchases.map(purchase => {
                return Object.assign(purchase, {customer_id: customermap[purchase.customer_id]})
            })

            return res.render('purchases', {data: purchases, customers: customers});
        })
    })
});
/*
    end of citation
*/

    
//Adding a Purchase
/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

    This code was adapted to use the purchase entity to insert data into the entity
*/

app.post('/add-purchase-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Purchases(customer_id, date_placed, total_price) VALUES ('${data.customerID}', '${data.datePlaced}', '${data.totalPrice}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Purchases and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM Purchases;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/
//Deleting a Purchase
/*
    Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was largely copied to allow the purchase page to have a delete function that would interact with the database. The major changes were the route and the SQL. 
*/
app.delete('/delete-purchase-ajax', function(req,res,next){
    let data = req.body;
    let purchase_id = parseInt(data.id);
    let deletepurchase = `DELETE FROM Purchases WHERE purchase_id = ?`;


          // Run the 1st query
          db.pool.query(deletepurchase, [purchase_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM Purchases;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/

//Update a Purchase

/*
    Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

  This code was largely copied to allow the purchase page to have an edit function that would interact with the database. The major changes were the route and the SQL. 
*/
app.put('/update-purchase-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let purchase = parseInt(data.purchaseID);
    let totalPrice = data.totalPrice;

    
    let queryUpdatePurchase = `UPDATE Purchases SET total_price = ?  WHERE Purchases.purchase_id = ?`;
    let selecttotalPrice = `SELECT * FROM Purchases WHERE purchase_id = ?`;


    db.pool.query(queryUpdatePurchase, [totalPrice, purchase], function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            db.pool.query(selecttotalPrice, [purchase], function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/


/*
    Transport vehicles
*/
/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data, and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box

    This code was adapted from the two sources to display the transportvehicles in a table and allow someone to display a search of the transportvehicles.
*/

app.get('/transportvehicles', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.name === undefined||req.query.name === "")
    {
        query1 = "SELECT * FROM TransportVehicles;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM TransportVehicles WHERE terrain_type LIKE '${req.query.name}'`
    
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM TransportVehicles;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the transportvehicles
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the transportvehicles
            let planets = rows;

            return res.render('transportvehicles', {data: people, planets: planets});
        })
    })
});
/*
    end of citation
*/

//Deleting a TransportVehicle
/*
    Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was largely copied to allow the TransportVehicle page to have a delete function that would interact with the database. The major changes were the route and the SQL. 
*/
app.delete('/delete-vehicle-ajax', function(req,res,next){
    let data = req.body;
    let vehicle_id = parseInt(data.id);
    let deletevehicle = `DELETE FROM TransportVehicles WHERE vehicle_id = ?`;

  
  
          // Run the 1st query
          db.pool.query(deletevehicle, [vehicle_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM TransportVehicles;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/

//Adding a Transport Vehicle
/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

    This code was adapted to use the transportvehicle entity to insert data into the entity
*/
app.post('/add-transportvehicle-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO TransportVehicles(vehicle_status, last_service_date, mileage, terrain_type) VALUES ('${data.vehicle_status}', '${data.last_service_date0}', '${data.mileage}', '${data.terrain_type}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM TransportVehicles;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/

//Update a Transport Vehicle
/*
    Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

  This code was largely copied to allow the transportvehicles page to have an edit function that would interact with the database. The major changes were the route and the SQL. 
*/
app.put('/update-transportvehicles-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let vehicle = parseInt(data.vehicleID);
    let mileage = data.mileage;

    
    let queryUpdateTransportVehicles = `UPDATE TransportVehicles SET mileage = ? WHERE TransportVehicles.vehicle_id = ?`;
    let selectmileage = `SELECT * FROM TransportVehicles WHERE vehicle_id = ?`;


    db.pool.query(queryUpdateTransportVehicles, [mileage, vehicle], function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            db.pool.query(selectmileage, [vehicle], function(error, rows, fields) {
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/

//EmployeeTransportvehicle intersectiontable

//Select for employee transportvehicle trable
/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data, and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box

    This code was adapted from the two sources to display the employeetransportvehicles in a table and allow one to display the employee names indstad of employee id's
*/
app.get('/employeetransportvehicles', function(req, res)
    {
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.address === undefined)
    {
        query1 = "SELECT * FROM EmployeesTransportVehicles;";
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Employees;";
    let query3 = "SELECT * FROM TransportVehicles;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the purchases
        let employeetransportvehicles = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the employees
            let employees = rows;

            let employeemap = {}
            employees.map(employee => {
                let id = parseInt(employee.employee_id, 10);

                employeemap[id] = employee["employee_name"];
            })
            //Run the 3rd query
            db.pool.query(query3, (error, rows, fields) => {
            
                // Save the employees
                let TransportVehicles = rows;


                employeetransportvehicles = employeetransportvehicles.map(employeetransportvehicle => {
                    return Object.assign(employeetransportvehicle,{employee_id: employeemap[employeetransportvehicle.employee_id]})
                })
                
                return res.render('employeetransportvehicles', {data: employeetransportvehicles, employees: employees, TransportVehicles:TransportVehicles});
            })

        })
    })
});

//adding an employeetransportvehicle
/*
    Citation for the following function:
    Date: 03/06/2024
    The following code was adapted from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

    This code was adapted to use the employeestransportvehicle entity to insert data into the entity
*/
app.post('/add-employeestransportvehicle-ajax', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO EmployeesTransportVehicles(employee_id, vehicle_id) VALUES ('${data.employeeID}', '${data.vehicleID}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM EmployeesTransportVehicles;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                    res.render('employeetransportvehicles', {data:rows});
                }


            })
        }
    })
});
/*
    end of citation
*/

//Deleting an employeeTransportVehicle
/*
    Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was largely copied to allow the employeetransportvehicle page to have a delete function that would interact with the database. The major changes were the route and the SQL. 
*/
app.delete('/delete-employeetransportvehicle-ajax', function(req,res,next){
    let data = req.body;
    let employees_transportvehicles_id = parseInt(data.id);
    let deleteemployeetransportvehicle = `DELETE FROM EmployeesTransportVehicles WHERE employees_transportvehicles_id = ?`;

  
  
          // Run the 1st query
          db.pool.query(deleteemployeetransportvehicle, [employees_transportvehicles_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            query2 = `SELECT * FROM EmployeesTransportVehicles;`;
            db.pool.query(query2, function(error, rows, fields){
                
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else{
                    res.send(rows);
                }


            })
        }
    })
});
/*
    end of citation
*/
/*
    LISTENER
*/
/*
    Citation for the following function:
    Date: 02/20/2024
    The following code was copied from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

    This code was copy and pasted to setup the website.
*/

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

/*
    End of Citation
*/