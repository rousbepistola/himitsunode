var express = require('express');
var router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://rousbepistola:3te5hrlns2gy@cluster0-1lsui.azure.mongodb.net/test?retryWrites=true&w=majority";


/* GET home page. */
router.get('/', function(req, res, next) {
  ssn=req.session;
  ssn.loginfirst;

  if(ssn.email){
    res.render('release',{username:ssn.username});
  } else{
    ssn.loginfirst = "please login first";
    console.log("login first");
    res.redirect('/');
   
   
  }

});


router.post('/', function(req, res, next){
  ssn=req.session;
  ssn.username = req.body.username;
  ssn.email = req.body.email;
  ssn.password = req.body.password;


  MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    let dbo = db.db("first1");

    let myinfo = {username:ssn.username, email:ssn.email, password:ssn.password};
    dbo.collection("users1").insertOne(myinfo, function(err, data){
        if (err) throw err;
        console.log("Collection created");
        db.close();
        res.render('release',{username:ssn.username});
    });
    
});
});





module.exports = router;
