const express = require('express');
const { route } = require('./routes/recipe');
const { connectDB } = require('./config/connection');
const { userroute } = require('./routes/userdetails');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
 
const {Auth} = require('./auth/auth')
const dotenv = require('dotenv').config() 
const cors = require('cors')
const Port = process.env.Port || 4000 ;

const app = express();

app.use(cors('*'));
app.use(express.static("assets"));
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Food recipes api documentation',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};

const Specification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(Specification));

app.use('/user',userroute);
// app.use(Auth)
app.use('/',route);

app.listen(Port,async ()=>{
    await connectDB()
    console.log(`app is running at port ${Port}`)
})