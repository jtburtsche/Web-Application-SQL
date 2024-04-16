/*
  Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

  This code was adapted from the source to use the data from the purchase entity to edit a new row dynamically to the table without having to refresh the page. The major changes to the code were changing the varibles to use the purchase ID
*/

// Get the objects we need to modify
let updatePurchaseForm = document.getElementById('update-purchase-form-ajax');

// Modify the objects we need
updatePurchaseForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from

    let inputPurchaseID = document.getElementById("input-purchase_id-update");
    let inputTotalPrice = document.getElementById("input-total_price-update");


    // Get the values from the form fields
    let purchaseIDValue= inputPurchaseID.value;
    let totalPriceValue = inputTotalPrice.value;


    // Put our data we want to send in a javascript object
    let data = {
        purchaseID: purchaseIDValue,
        totalPrice: totalPriceValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-purchase-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, purchaseIDValue, totalPrice);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


updateRow = (data, purchaseID) => {

    let parsedData = JSON.parse(data);

    console.log(parsedData);
    
    let table = document.getElementById("purchase-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == purchaseID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of dateplaced value
            let td2 = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign dateplaced to our value we updated to 
            td2.innerHTML = parsedData[1].total_price
       }
    }
}
/*
  end of citation
*/