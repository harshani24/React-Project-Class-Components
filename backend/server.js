const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


//1.create the server
const app = express();
const port = process.env.PORT || 5000;


//2.Middleware
app.use(cors());
app.use(express.json());



//3.db connection and listen to server
const uri = process.env.ATLAS_URI;

const options ={
    useNewUrlParser :  true,
    useUnifiedTopology: true
}; 

mongoose
.connect(uri, options)
.then(() => {
  app.listen(port);
  console.log(`Server is running on port: ${port}`);
})
.catch((error) => {
  console.log(error);
});

// mongoose.connect(uri , options);

const connection = mongoose.connection;
connection.once('open' , () => {
    console.log("DB conection is established");
});


// app.listen(port , () => {
//  console.log(`server is running on port: ${port}`)
// });