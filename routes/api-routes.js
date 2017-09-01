// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the posts
    app.post("/results", function(req, res) {
      db.item.findAll({})
        .then(function(dbPost) {
          res.json(dbPost[0].content);
        });
    });


    app.get("/api/users", function(req, res) {
      db.Profile.findAll({})
        .then(function(dbPost) {
          res.json(dbPost);
        });
    });

    app.post("/api/users", function(req, res) {
      db.Profile.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          username: req.body.username,
          pw: req.body.pw
        })
        .then(function(dbPost) {
          res.json(dbPost);
        });
    });
  // Get route for returning posts of a specific category
  // app.post("/results?searchFor=*", function(req, res) {
  //   console.log(req.body);
  // }).then(function(data){
  //   res.end();
  //
  // });
    // db.Post.findAll({
    //   where: {
    //     category: req.params.category
    //   }
    // })
    // .then(function(dbPost) {
    //   res.json(dbPost);
    // });
  // });

  // Get rotue for retrieving a single post

  //
  // // POST route for saving a new post
  // app.post("/api/posts", function(req, res) {
  //   console.log(req.body);
  //   db.Post.create({
  //     title: req.body.title,
  //     body: req.body.body,
  //     category: req.body.category
  //   })
  //   .then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });
  //
  // // DELETE route for deleting posts
  // app.delete("/api/posts/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //   .then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });
  //
  // // PUT route for updating posts
  // app.put("/api/posts", function(req, res) {
  //   db.Post.update(req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //   .then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });
};
