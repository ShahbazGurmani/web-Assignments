const express = require("express");
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const users = require("../models/users");
const fs = require('fs')

//upload image .........................................................................
var storage = multer.diskStorage({
  destination: function (req, file, cb)
  {
    cb(null,'./uploads')
  },
  filename: function (req, file, cb)
  {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

var upload = multer({
  storage: storage,
}).single("image");

//................................................................
router.post("/add-user", upload, (req, resp) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });

  user
    .save()
    .then(
      req.session.message = {
        type: 'success',
        message:"User Add Successully",
      }
      
    )
    .catch((err) => {
      req.session.message = {
        type: "danger",
        message: err.message,
      };
    });

  // console.log(req.session.message);
  resp.redirect("/" );
});



//get all users from db
router.get("/", async (req, resp) => {
  try {
    const users = await User.find().exec();
    resp.render("Home", { title: "home page", users: users });
  } catch (err) {
    resp.json({ message: err.message });
  }
});


router.get("/add-user", (req, resp) => {
  resp.render('add-user', { title: 'add user' });
});


//edit  user 
router.get('/edit/:id', (req, resp) => {
  let id = req.params.id;
  User.findById(id)
    .then((user) => {
      resp.render("edit-user", { title: "edit user", user });
    })
    .catch((err) => {
      console.log(err);
    });

  // Update user
  router.post("/update/:id", upload, (req, resp) => {
    let id = req.params.id;
    let new_image = "";

    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.params.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }

    User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: new_image,
    })
      .then(() => {
        req.session.message = {
          type: "success",
          message: "User Updated Successfully",
        };
        resp.redirect("/"); 
      })
      .catch((err) => {
        req.session.message = {
          type: "danger",
          message: err.message,
        };
        resp.redirect("/"); 
      });
  });
})

//delete user 
router.get("/delete/:id", (req, resp) => {
  let id = req.params.id;

  User.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (deletedUser && deletedUser.image) {
        // Delete associated file
        fs.unlinkSync("./uploads/" + deletedUser.image);
      }
      req.session.message = {
        type: "success",
        message: "User deleted successfully",
      };
      resp.redirect("/"); 
    })
    .catch((err) => {
      req.session.message = {
        type: "danger",
        message: err.message,
      };
      resp.redirect("/"); 
    });
});
module.exports = router;
