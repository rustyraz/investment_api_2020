//const express = require('express');
import express from 'express'; // we can use ES^ without a problem
import Joi from 'joi';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//DECLARE CONSTANT VARIABLES
const API_PREFIX = "/api/";
//PORT ENV VARIABLE
const PORT = process.env.PORT ? process.env.PORT : 8080;

//import routes
import index_routes from './routes/index.js';
import listing_investments from './routes/list_investments';
import create_update_investment from './routes/create_update_investment';
import delete_investment from './routes/delete_investment';

//READ REQUEST Handlers
app.use(API_PREFIX, index_routes);
app.use(`${API_PREFIX}investments`, listing_investments);
app.use(`${API_PREFIX}investments/:id`, listing_investments);
//CREATE request handlers
app.use(`${API_PREFIX}investments`, create_update_investment);
//UPDATE request handler
app.use(`${API_PREFIX}investments`, create_update_investment);
//DELETE request handler
app.use(`${API_PREFIX}investments`, delete_investment);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});