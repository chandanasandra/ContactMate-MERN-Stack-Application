// Here we create a basic express server
const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const dbConnection = require('./configs/dbConnection');
const path = require('path');

const __dirName = path.resolve();
// Connects to database
dbConnection();

// Start server
const app = express();

// Use this middleware for parsing request body
app.use(express.json());

// this is a middleware
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Use this as middleware for error handling
app.use(errorHandler);

const port = process.env.PORT || 2000;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirName, "frontend/dist")));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirName, "frontend", "dist", "index.html"));
    })
}
// server listens to this port
app.listen(port, ()=>{
    console.log(`Server started at Port: ${port}`);
});