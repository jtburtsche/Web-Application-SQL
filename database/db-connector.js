/*
    Citation for the following function:
    Date: 02/20/2024
    The following code was copied from the nodejs starter app code  from :https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

    This code was copy and pasted to setup the website. The only thing that was changed was the connection pool to access one of our databases.
*/


// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : '',
    password        : '',
    database        : ''
})

// Export it for use in our application
module.exports.pool = pool;