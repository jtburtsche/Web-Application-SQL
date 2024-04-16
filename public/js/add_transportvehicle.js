/*
  Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was adapted from the source to use the data from the transportvehicle entity to add a new row dynamically to the table without having to refresh the page. The major changes to the code were changing the varibles to use transportvehicle variables.
*/

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-transportvehicle-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVehicleStatus = document.getElementById("input-vehicle_status");
    let inputLastServiceDate = document.getElementById("input-last_service_date");
    let inputMileage = document.getElementById("input-mileage");
    let inputTerrain = document.getElementById("input-terrain_type");


    // Get the values from the form fields
    let statusValue = inputVehicleStatus.value;
    let dateValue = inputLastServiceDate.value;
    let mileageValue = inputMileage.value;
    let terrainValue = inputTerrain.value;
  

    // Put our data we want to send in a javascript object
    let data = {
        vehicle_status: statusValue,
        last_service_date: dateValue,
        mileage: mileageValue,
        terrain_type: terrainValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-transportvehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputVehicleStatus.value = '';
            inputLastServiceDate.value = '';
            inputMileage.value = '';
            inputTerrain.value = '';
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
    let currentTable = document.getElementById("transportvehicles-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let vehicle_statusCell = document.createElement("TD");
    let last_serviceCell = document.createElement("TD");
    let mileageCell = document.createElement("TD");
    let terrainCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.vehicle_id;
    vehicle_statusCell.innerText = newRow.vehicle_status;
    last_serviceCell.innerText = newRow.last_service_date;
    mileageCell.innerText = newRow.mileage;
    terrainCell.innerText = newRow.terrain_type;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteVehicle(newRow.vehicle_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(vehicle_statusCell);
    row.appendChild(last_serviceCell);
    row.appendChild(mileageCell);
    row.appendChild(terrainCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.vehicle_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
/*
  end of citation
*/