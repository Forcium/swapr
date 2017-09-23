// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var randtoken = require('rand-token');
var fs = require("fs");
var multer = require("multer");



// Routes
// =============================================================
module.exports = function(app) {

  //avatar img upload
  var uploadsDir = "./public/assets/userUpload";
  var filenameImg;

  var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./public/assets/userUpload");
    },
    filename: function(req, file, callback) {
      filenameImg = randtoken.generate(12);
      callback(null, filenameImg + ".png");
    }
  });

  var upload = multer({
    storage: Storage
  }).array("imgUploader", 3); //Field name and max count

  var item1 = multer({
    storage: Storage
  }).array("img1", 3); //Field name and max count

  var itemUpdater = multer({
    storage: Storage
  }).array("itemUpdate", 3); //Field name and max count


  app.post("/api/addItem", function(req, res) {

//item 1 ~~~~~~~~~~~~~~~~~~
    item1(req, res, function(err) {
      if (err) {
        return res.redirect("/profile");
      }
      //
      // console.log(req.body);
      if (req.files[0]) {
        req.body.itemImage1 = "/assets/userUpload/" + req.files[0].filename;
      }
      if (req.files[1]) {
        req.body.itemImage2 = "/assets/userUpload/" + req.files[1].filename;
      }
      if (req.files[2]) {
        req.body.itemImage3 = "/assets/userUpload/" + req.files[2].filename;
      };

    db.Item.create(
      {
      item_name: req.body.itemName,
      category: req.body.itemCategory,
      item_description: req.body.itemDescription,
      item_img1: req.body.itemImage1,
      item_img2: req.body.itemImage2,
      item_img3: req.body.itemImage3,
      ProfileId: req.body.hdnId
    },
    {
    include: [{
      model: db.Profile,
      as: "TransactionsSellerItem"
    }]
    }).then(function(data){


      db.Transaction.create(
        {
          SellerItemId: data.id,
          SellerProfileId: data.ProfileId
      }).then(function(data2) {
          res.redirect("/listing/" + data2.SellerItemId);
        });

    })

  });

});

app.post("/addTransaction/:itemID", function(req, res) {



  });






  app.post("/api/editItem", function(req, res) {

//item 1 ~~~~~~~~~~~~~~~~~~
    itemUpdater(req, res, function(err) {


      if (err) {
        return res.redirect("/profile");
      }

      // console.log(req.body);
      if (req.files[0]) {
        req.body.itemImage1 = "/assets/userUpload/" + req.files[0].filename;
      }
      if (req.files[1]) {
        req.body.itemImage2 = "/assets/userUpload/" + req.files[1].filename;
      }
      if (req.files[2]) {
        req.body.itemImage3 = "/assets/userUpload/" + req.files[2].filename;
      }
    db.Item.update(
      {
      item_name: req.body.itemName,
      category: req.body.itemCategory,
      item_description: req.body.itemDescription,
      item_img1: req.body.itemImage1,
      item_img2: req.body.itemImage2,
      item_img3: req.body.itemImage3,
      ProfileId: req.body.hdnId
      }, {
        where: {
          id: req.body.hdnId
        }
    }).then(function(data) {
      // console.log(data);
        res.redirect("/listing/" + data[0]);
      });
    });
  });


  app.post("/api/makeOffer/:sellerItemId/:sellerID/:buyerItemId", function(req, res){


      var seller = req.params.sellerItemId;
      var sellerID = req.params.sellerID;
      var buyer = req.params.buyerItemId;

    db.Transaction.create({
      SellerItemId: seller,
      BuyerItemId: buyer,
      SellerProfileId: sellerID,
      BuyerProfileId: req.body.profileID,
      offerAccepted: 0
    },{
      include: [
        { model: db.Profile,
          as: "TransactionsSeller"
        },
        { model: db.Item,
          as: "TransactionsSellerItem"
        }]
    }).then(function(dbPost){
      res.json(dbPost);
    })
    .catch(function(err) {
    // print the error details
    console.log(err);
    });
  });

  app.get("/api/loginInfo", function(req, res) {
    db.Profile.findAll({
      where: {
        username: req.query.userName,
        pw: req.query.passWord
      }
    }).then(function(dbPost) {
      res.json(dbPost[0]);
    });
  });

  app.post("/api/allListings", function(req, res) {
    db.Item.findAll({
      where: {
        ProfileID: req.body.profileID
      },
      include: [{
        model: db.Profile,
        as: "TransactionsSellerItem"
      }],
      through: {
        model: db.Transaction,
        as: 'Transaction',
        where: {SellerProfileId: req.body.profileID}
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/listing/:listingID", function(req, res) {
    db.Item.findOne({
      where: {
        id: req.params.listingID
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/", function(req, res) {

    db.Profile.findOne({
      where: {
        token: req.body.token
      }
    }).then(function(dbRes) {

      res.json(dbRes);
    });
  });

  app.post("/api/login", function(req, res) {
    var token = randtoken.generate(16);
    db.Profile.update({
      token: token
    }, {
      where: {
        username: req.body.userName,
        pw: req.body.passWord
      }
    }).then(function(dbRes) {

      res.json(dbRes);

    });

  });


  app.get("/results", function(req, res) {
    db.Item.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/stuffUwant", function(req, res) {
    db.Item.findAll({
      include: [{
        model: db.Profile,
        as: 'TransactionsSellerItem',
        include: [{model: db.Item}],
        through: {
          model: db.Transaction,
          as: 'Transaction',
          where: {BuyerProfileId: req.query.ProfileId}
        }
      }]
    }).then(function(dbPost){
        res.json(dbPost);
    });
//     var paige;
//
//     db.Profile.findOne({
//       where: {
//         id: req.query.ProfileId
//       },
//       include: [{
//         model: db.Item
//         }]
//     }).then(function(dbPost) {
//         db.Transaction.findAll({
//           where: {
//             BuyerProfileId: dbPost.id
//           }
//         }).then(function(lvl1dbPost){
//
//                 var paigeVar = paigeFunk(lvl1dbPost, res);
//                 console.log("lvl1" + JSON.stringify(lvl1dbPost));
//               });
//               console.log("dbPost outside" + JSON.stringify(dbPost));
//       });
//
//     });
//
// function paigeFunk (paige, res) {
//   console.log("paige" + JSON.stringify(paige));
//     var paigeArr = [];
//     for (var i = 0; i < paige.length; i++) {
//
//         db.Item.findAll({
//           where: {
//             id: paige[i].SellerItemId
//           }
//         }).then(function(lvl2dbPost){
//           console.log("lvl2" + JSON.stringify(lvl2dbPost));
//           paigeArr.push(lvl2dbPost);
//           console.log(JSON.stringify(paigeArr));
//         });
//     }
  });


  app.get("/api/users", function(req, res) {
    db.Profile.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/isloggedin/", function(req, res) {

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




  app.post("/api/Upload", function(req, res) {

    upload(req, res, function(err) {
      if (err) {
        return res.redirect("/profile");
      }

      if (!req.body.password) {
        req.body.password = req.body.passwordHdn;
      }
      if (req.files[0]) {

        req.body.avatar = "/assets/userUpload/" + req.files[0].filename;

      }
      else {

        req.body.avatar = req.body.avatarHdn;
      }
      // console.log(req.body);
      db.Profile.update({
        username: req.body.username,
        pw: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        state: req.body.state,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar
      }, {
        where: {
          token: req.body.hdnTkn
        }
      }).then(function(data) {

        res.redirect("/profile");
      });

    });
  });


  app.get("/api/users", function(req, res) {
    db.Profile.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting acct
  app.post("/api/deleteAcct", function(req, res) {
    db.Profile.destroy({
      where: {
        id: req.body.profileID,
        token: req.body.token
      }
    })
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/api/deleteItem/:itemID", function(req, res) {
    db.Item.destroy({
      where: {
        id: req.params.itemID,
        ProfileId: req.body.profileID,
      }
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
