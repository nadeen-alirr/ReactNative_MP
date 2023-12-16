const express = require("express");
const cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3010;
const mongoose = require("mongoose");
const DB = process.env.MDB;
const CourseRoutes = require('./Routes/Courseroute.js');
const crypto = require('crypto');

app.use(express.json());
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
    origin: 'http://10.7.1.227:3010', // Update with your React Native app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

console.log('CORS configuration:', corsOptions);


app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
    next();
});

app.use("/api", CourseRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});