// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var multer = require("multer");
var randtoken = require('rand-token');

// Routes
// =============================================================
module.exports = function(app) {

      app.get("/", function(req, res) {
        db.Profile.findAll({
          where: {
            token: window.localStorage.getItem("token")            
          }
        }).then(function(dbRes){
          res.json(dbRes);
        });
      });


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

    app.post("/api/users/", function(req, res) {

      var token = randtoken.generate(16);

      db.Profile.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          city: req.body.city,
          state: req.body.state,
          zip: req.body.zip,
          username: req.body.username,
          pw: req.body.pw,
          token: token
        })
        .then(function(dbUser) {
          res.json(dbUser);
        });
    });


    app.put("/api/users/:id", function(req, res) {
     var uploadsDir = "../public/assets/images";
      var dirLength;
      fs.readdir(uploadsDir, function(err, files){
        dirLength = files.length;
      });

     var Storage = multer.diskStorage({
           destination: function(req, file, callback) {
               callback(null, "../public/assets/images");
           },
           filename: function(req, file, callback) {
             dirLength ++;
               callback(null, dirLength + ".png");
           }
       });

     var upload = multer({
            storage: Storage
        }).array("imgUploader", 3); //Field name and max count

   db.Post.update({
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
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
