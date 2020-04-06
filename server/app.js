//const express = require('express');
import express from 'express'; // we can use ES^ without a problem
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//DECLARE CONSTANT VARIABLES
const API_PREFIX = "/api/v1";
//PORT ENV VARIABLE
let PORT = process.env.PORT ? process.env.PORT : 8080;
PORT = process.env.NODE_ENV == 'test' ? 4000 : PORT;

//import routes
import index_routes from './routes/index.js';
import access_routes from './routes/access';
import user from './routes/user';
import listing_investments from './routes/list_investments';
import create_update_investment from './routes/create_update_investment';
import delete_investment from './routes/delete_investment';
import forex_api from './routes/forex_data';

//READ REQUEST Handlers
app.use(API_PREFIX, index_routes);
app.use(API_PREFIX, access_routes);
//users handler
app.use(API_PREFIX, user);
//app.use(`${API_PREFIX}users/:email/email`,user);
app.use(`${API_PREFIX}investments`, listing_investments);
app.use(`${API_PREFIX}investments/:id`, listing_investments);
//CREATE request handlers
app.use(`${API_PREFIX}investments`, create_update_investment);
//UPDATE request handler
app.use(`${API_PREFIX}investments`, create_update_investment);
//DELETE request handler
app.use(`${API_PREFIX}investments`, delete_investment);
//for forex data
app.use(`${API_PREFIX}forex`, forex_api);

if(process.env.NODE_ENV == 'test'){
    //if we are in the test
    console.log('APP IN THE TEST MODE');
    module.exports = app.listen(PORT, ()=>{});
}else{
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    });
}