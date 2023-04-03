var express = require("express");// We are creating an express server to render files so, we 
// require the express module..
var app = express( );

// we are using a template engine named "ejs" 
const ejs = require("ejs");

// we will be running our server on port 8000
const port = 8000;

app.set("view engine", "ejs");

app.use(express.static('./assets'));// As we will be requiring the static files , so we 
// need to use this function..

// creating a route for the views.

app.get("/home", (req, res)=>{

    res.render("home");

})


app.listen(port, function(err){

    if(err){
       console.log("Error in running the server!!!", err);
    }
    
    else{
    console.log(" Yup! my express server is running on port: ",  port );
    }

});