/*
  Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

  This code was adapted from the source to use the data from the employees entity to edit a new row dynamically to the table without having to refresh the page. The major changes to the code were changing the varibles to use the employee pay
*/

// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-employee-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from

    let inputEmployeeID = document.getElementById("input-employee_id_update");
    let inputPay = document.getElementById("input-pay-update");

    // Get the values from the form fields
    let employeeIDValue= inputEmployeeID.value;
    let payValue = inputPay.value;


    // Put our data we want to send in a javascript object
    let data = {
        employeeID: employeeIDValue,
        pay: payValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, employeeIDValue, payValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


updateRow = (data, employeeID) => {

    let parsedData = JSON.parse(data);

    console.log(parsedData);
    
    let table = document.getElementById("employee-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employeeID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of pay value
            let td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign pay to our value we updated to
            td.innerHTML = parsedData[0].pay; 
       }
    }
}
/*
  end of citation
*/