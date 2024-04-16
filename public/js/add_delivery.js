/*
  Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data and https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was adapted from the source to use the data from the deliveries entity to add a new row dynamically to the table without having to refresh the page. The major changes to the code were changing the varibles to use delivery variables.
*/

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-delivery-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmployeeName = document.getElementById("input-employee_id");
    let inputCustomerID = document.getElementById("input-customer_id");
    let inputDeliveryComplete = document.getElementById("input-delivery_complete");
    let inputDateToBeDelivered = document.getElementById("input-date_to_be_delivered");
    let inputDeliveryDistance = document.getElementById("input-delivery_distance");
    let inputAddressLine1 = document.getElementById("input-address_line1");
    let inputAddressLine2 = document.getElementById("input-address_line2");
    let inputState = document.getElementById("input-state");
    let inputZipCode = document.getElementById("input-zip_code");
    let inputItemsToBeDelivered = document.getElementById("input-items_to_be_delivered");

    // Get the values from the form fields
    let employeeNameValue = inputEmployeeName.value;
    let CustomerIDValue = inputCustomerID.value;
    let DeliveryCompleteValue = inputDeliveryComplete.value;
    let DateToBeDeliveredValue = inputDateToBeDelivered.value;
    let DeliveryDistanceValue = inputDeliveryDistance.value;
    let AddressLine1Value = inputAddressLine1.value;
    let AddressLine2Value = inputAddressLine2.value;
    let StateValue = inputState.value;
    let ZipCodeValue = inputZipCode.value;
    let ItemsToBeDeliveredValue = inputItemsToBeDelivered.value;

    // Put our data we want to send in a javascript object
    let data = {
        employeeName: employeeNameValue,
        CustomerID: CustomerIDValue,
        DeliveryComplete: DeliveryCompleteValue,
        DateToBeDelivered: DateToBeDeliveredValue,
        DeliveryDistance: DeliveryDistanceValue,
        AddressLine1: AddressLine1Value,
        AddressLine2: AddressLine2Value,
        State: StateValue,
        ZipCode: ZipCodeValue,
        ItemsToBeDelivered: ItemsToBeDeliveredValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-delivery-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmployeeName.value = '';
            inputCustomerID.value = '';
            inputDeliveryComplete.value = '';
            inputDateToBeDelivered.value = '';
            inputDeliveryDistance.value = '';
            inputAddressLine1.value = '';
            inputAddressLine2.value = '';
            inputState.value = '';
            inputZipCode.value = '';
            inputItemsToBeDelivered.value = '';
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
    let currentTable = document.getElementById("delivery-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 10 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let employeeNameCell = document.createElement("TD");
    let CustomerIDCell = document.createElement("TD");
    let DeliveryCompleteCell = document.createElement("TD");
    let DateToBeDeliveredCell = document.createElement("TD");
    let DeliveryDistanceCell = document.createElement("TD");
    let AddressLine1Cell = document.createElement("TD");
    let AddressLine2Cell = document.createElement("TD");
    let StateCell = document.createElement("TD");
    let ZipCodeCell = document.createElement("TD");
    let ItemsToBeDeliveredCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.delivery_id;
    employeeNameCell.innerText = newRow.employee_id;
    CustomerIDCell.innerText = newRow.customer_id;
    DeliveryCompleteCell.innerText = newRow.delivery_complete;
    DateToBeDeliveredCell.innerText = newRow.date_to_be_delivered;
    DeliveryDistanceCell.innerText = newRow.delivery_distance;
    AddressLine1Cell.innerText = newRow.address_line1;
    AddressLine2Cell.innerText = newRow.address_line2;
    StateCell.innerText = newRow.state;
    ZipCodeCell.innerText = newRow.zip_code;
    ItemsToBeDeliveredCell.innerText = newRow.items_to_be_delivered;


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDelivery(newRow.delivery_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(employeeNameCell);
    row.appendChild(CustomerIDCell);
    row.appendChild(DeliveryCompleteCell);
    row.appendChild(DateToBeDeliveredCell);
    row.appendChild(DeliveryDistanceCell);
    row.appendChild(AddressLine1Cell);
    row.appendChild(AddressLine2Cell);
    row.appendChild(StateCell);
    row.appendChild(ZipCodeCell);
    row.appendChild(ItemsToBeDeliveredCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.delivery_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}

/*
  end of citation
*/