const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 4000;
const app = express();

// TODO: middleware - CORS
app.use(cors());

// middleware - JSON parsing
// app.use(express.urlencoded({extended: false}))
app.use(express.json());

// middleware - API routes
app.use('/api/v1/dresses', routes.dresses);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/accounts', routes.accounts);

// listen
app.listen(port, () => console.log(`Server is running on port ${port}`));
