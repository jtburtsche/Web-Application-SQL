/*
  Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was adapted from the source to use the data from the employeestransportvehicle entity to add a new row dynamically to the table without having to refresh the page. The major changes to the code were changing the varibles to use employeestransportvehicle variables.
*/

// Get the objects we need to modify
let addEmployeeTransportVehicleForm = document.getElementById('add-employeestransportvehicle-form-ajax');

// Modify the objects we need
addEmployeeTransportVehicleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeID = document.getElementById("input-employee_id");
    let inputvehicleID = document.getElementById("input-vehicle_id");

    // Get the values from the form fields
    let employeeIDValue = inputEmployeeID.value;
    let vehicleIDValue = inputvehicleID.value;

    // Put our data we want to send in a javascript object
    let data = {
        employeeID: employeeIDValue,
        vehicleID: vehicleIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employeestransportvehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerName.value = '';
            inputPhoneNumber.value = '';
            inputEmail.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("employeetransportvehicle-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let employeeIDCell = document.createElement("TD");
    let vehicleIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.employees_transportvehicles_id;
    employeeIDCell.innerText = newRow.employee_id;
    vehicleIDCell.innerText = newRow.vehicle_id;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletecustomer(newRow.customer_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(employeeIDCell);
    row.appendChild(vehicleIDCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', employees_transportvehicles_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}

/*
  end of citation
*/