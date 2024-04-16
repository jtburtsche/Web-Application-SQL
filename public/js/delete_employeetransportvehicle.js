/*
  Citation for the following function:
  Date: 03/06/2024
  The following code was adapted from the nodejs starter app code  from : https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

  This code was largely copied to allow the employeetransportvehicle page to have a delete function. The only edits that were made to the code were renaming the function, renaming the variable, and renaming the data to make it more sutiable for the employeetransportvehicle entity
*/

function deleteemployeetransportvehicle(employeetransportvehicleID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: employeetransportvehicleID
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-employeetransportvehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
  
            // Add the new data to the table
            deleteRow(employeetransportvehicleID);
  
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
  
  function deleteRow(employeetransportvehicleID){
  
    let table = document.getElementById("employeetransportvehicle-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employeetransportvehicleID) {
            table.deleteRow(i);
            break;
       }
    }
  }
/*
  end of citation
*/