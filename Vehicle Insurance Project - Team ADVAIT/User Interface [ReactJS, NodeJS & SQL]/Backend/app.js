/* LIBRARIES */

const express = require('express');
// const mysql = require('mysql');
const db = require("./config/dbconnect");
const cors = require("cors");

/* INSTANCE */

const app = express();

/* MIDDLEWARE */
app.use(cors()); // for giving access to frontend
app.use(express.json()); // convert in json
app.use(express.urlencoded({ extended: false })); // encode the data coming from frontend


/* VARIABLES */
const PORT = process.env.PORT|| 5000;

/* METHODS */

// for requesting the server to run the inputed query
app.post('/query_to_run', (req,res) =>{
    // console.log(req.body);
    try {
        const {query} = req.body;
        // let query = ``;
        db.query(query,(err,result) =>{
            if(err) {
                console.log(err);
                res.json("error")
            };
            console.log(result);
            res.json(result);
        });
    } catch (error) {
        res.json("error")
        console.log(error);
    }
});

// home route 
app.get('/', (req,res) =>{
    res.send("Hello from the backend")
});


/* LISTNERS */
app.listen(PORT, () =>{
    console.log();
    console.log("========================================");
    console.log(`Server is running at ${PORT}`);
    console.log();
});