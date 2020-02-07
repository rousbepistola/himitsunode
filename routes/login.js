var express = require('express');
var router = express.Router();
var ssn;
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://rousbepistola:3te5hrlns2gy@cluster0-1lsui.azure.mongodb.net/test?retryWrites=true&w=majority";

/* GET home page. */



router.get('/', function(req, res, next) {
  ssn=req.session;
  res.render('/', { error: ssn.error });
});


// new code
router.post('/', function(req, res, next){
console.log("enters post method on login.js??")
  
  ssn=req.session;
  
  var emailin = req.body.email;
  var passin = req.body.password;


  MongoClient.connect(url, function (err, db) {
    if(err) throw err;

    let dbo = db.db("first1");
    let myinfo = {email:emailin, password:passin};

    dbo.collection("users1").findOne(myinfo, function(err, data){
        if (data == null){
          ssn.error = "Email or Pass is incorrect";
          console.log(data);
          console.log("1");
          res.redirect("/");
          
        } else{
          console.log("found data" + data);
          ssn.username = data.username;
          ssn.email = data.email;
          console.log("2");
          console.log(data);
          res.redirect("/release");
        }

        db.close();
    }); 
});
});

// end
// end
module.exports = router;
