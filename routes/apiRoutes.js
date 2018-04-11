/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/
"use strict";
const fsNu         = require("fs");
const bodyParserNu = require("body-parser");
const mongooseNu   = require("mongoose");

const express = require("express");
const axios   = require("axios");
const cheerio = require("cheerio");


// Require all models
const db = require("../models");

var scrapeRouter = express.Router();

scrapeRouter.get("/", function(req,res)
{
    // Grab every document in the Articles collection
    console.log("I'm in the get(articles route");
    db.Article.find({})
        .then(function(dbArticle) {
            //console.log(dbArticle);
            console.log("That's all the articles.");
            // If we were able to successfully find Articles, send them back 
            // to the client
            res.render("index",{dbArticle, title: "Think Progress Articles"}); 
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});



scrapeRouter.get("/scrape", function(req,res)
{
    /***************** Code lifted from Activity 5 **************/
    axios.get("https://thinkprogress.org/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a 
    // shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function() {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties 
            // of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            result.saved = false;

            console.log(result);

            // Create a new Article using the `result` object built from 
            // scraping
            db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });

            console.log("I'm done with saving the article.");

        });

        console.log("I'm done.");
    
        console.log("I'm done with saving the articles.");

        res.render("index",{}); 	
    });
});

/************* End of Code lifted from Activity 5 ***********/


// Route for getting all Articles from the db
scrapeRouter.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    console.log("I'm in the get(articles route");
    db.Article.find({})
        .then(function(dbArticle) {
            //console.log(dbArticle);
            console.log("That's all the articles.");
            // If we were able to successfully find Articles, send them back 
            // to the client
            res.render("index",{dbArticle, title: "Think Progress Articles"}); 
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, and toggle its 
// saved value
scrapeRouter.get("/toggle_saved", function(req, res) {
    console.log("The query is ");
    console.log(req.query.newValue);

    if(req.query.newValue === "true")
    {

        console.log("In the /toggle_saved if route, calling findOneAndUpdate");

        console.log("req.query.newValue is " + req.query.newValue);
        db.Article.findOneAndUpdate(
            { _id: req.query.article_id },
            { saved: true}   
        ).

            then(function() {
                console.log("The find one and update seems to have worked");
                res.redirect("/articles");

      
    
            }).
    
            catch(function(err) {
                // If an error occurred, send it to the client
                console.log("THERE WAS AN ERROR");
                res.json(err);
            });

    }

    else
    {
        console.log("In the /toggle_saved else route, calling findOneAndUpdate");
        console.log("req.query.newValue is " + req.query.newValue);
        db.Article.findOneAndUpdate(
            { _id: req.query.article_id }, 
            { saved: false } 
        ).

            then(function() {
                res.redirect("/articles");
                console.log("The find one and update seems to have worked");
      
            }).

            catch(function(err) {
                // If an error occurred, send it to the client
                console.log("THERE WAS AN ERROR");
                res.json(err);
            });
    }

});


scrapeRouter.get("/deleteSaved", function(req, res) {
    console.log("I'm in the scraperScript.js deleteSaved route.");

     db.Note.remove({ }, function (err)
        {
            console.log("err");
        });
     db.Article.remove({ saved: true }, function(err)
    {
        console.log("err");
        });
 });
  


scrapeRouter.get("/scrapeAgain", function(req, res) {

    console.log("I'm in the scraperScript.js scrapeAgain route.");

    db.Article.remove({ saved: false }, function (err) {
  if (err) 
  {

  console.log(err);
}
else
{
    console.log("There was no error.");
}

}).
    then(function()
    {
        console.log("I'm in the then.");
        res.redirect("/scrape");
    });
    console.log("I'm in the scraperScript.js leavint the scrapeAgain route.");

});



// Route for grabbing a specific Article by id, populate it with it's note
scrapeRouter.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that 
    // finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
        .populate("note")
        .then(function(dbArticle) {
            // If we were able to successfully find an Article with the 
            // given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
scrapeRouter.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body).

        then(function(dbNote) {
            // If a Note was created successfully, find one Article with 
            // an `_id` equal to `req.params.id`. Update the Article to 
            // be associated with the new Note  { new: true } tells the 
            // query that we want it to return the updated User -- it 
            // returns the original by default  Since our mongoose query 
            // returns a promise, we can chain another `.then` which 
            // receives the result of the query
            return db.Article.findOneAndUpdate(
                { _id: req.params.id }, 
                { note: dbNote._id }, { new: true });
        }).

        then(function(dbArticle) {
            // If we were able to successfully update an Article, send it 
            // back to the client
            res.json(dbArticle);
        }).

        catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});




module.exports = scrapeRouter;
