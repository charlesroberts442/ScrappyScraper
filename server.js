/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

/**
 * @file Contains the setup of the webserver
 * @author Charles Roberts
 * @copyright Charles Roberts 2018
 */

"use strict";
/***********************************************************************
 * VERY, VERY much of what follows was copied from activity 20         *
 * from the class files.                                               *
 *                                                                     *
 * Do the same requires as activity 20 but use let and const instead   *
 * of var 'cause I'm cool like that.  (⌐■_■)                           * 
 *                                                                     *
 ***********************************************************************/
const express    = require("express");
const bodyParser = require("body-parser");
const logger     = require("morgan"); // Hmmm, will I use this?
const mongoose   = require("mongoose");
//* const routes     = require('./routes/apiRoutes'); // Pull in our router file
const exphbs     = require('express-handlebars'); // Use handlebars 

// The scraping tools from activity 20
const axios   = require("axios");
const cheerio = require("cheerio");

// Require all models
//* const db = require("./models");

// I like port 17001
const PORT = 17001;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a 
// static directory
app.use(express.static("public"));

//Tell the express app to use the routes in ./routes/apiRoutes
//* app.use('/', routes);

// Set up Handlebars as our view engine
app.engine('handlebars', exphbs(
	{ 
		defaultLayout: 'main',
		partialsPath: "./views/partials"
	}));
app.set('view engine', 'handlebars');

// By default mongoose uses callbacks for async queries, 
// we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/week18Populater");

// Tell the express object where front end files are
app.use(express.static(process.cwd() + '/public'));

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });