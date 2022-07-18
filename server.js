const express = require('express')
const connectDB = require("./config/connectDB");
const Person = require("./models/person");
const app = express()
connectDB();
app.use(express.json());
app.use("/people", require("./routes/personroutes"));


const port = 5000
app.listen(port, (error) =>
error?console.log(error): console.log(`server listening on port ${port} !`))