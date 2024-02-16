require("dotenv").config();

const express = require('express')
const app = express();

const connectDB = require('./db/connect'); 
const router = require('./routes/user')

//middleware 
app.use(express.json())

app.use('/api/v1', router)




const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start(); 
//KbrgA5oAO8MG5NGI