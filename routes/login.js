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
console.log("enters post method??")
  ssn=req.session;
  
  var email = req.body.email;
  var pass = req.body.password;

  MongoClient.connect(url, function (err, db) {
    if(err) throw err;

    let dbo = db.db("first1");
    let myinfo = {email: email, pass: pass};

    dbo.collection("users1").findOne(myinfo, function(err, docs){
        if (docs == null){
          ssn.error = "Email or Pass is incorrect";
          console.log(docs);
          console.log("1");
          res.redirect("/");
          
        } else{
          console.log("found data" + docs);
          ssn.username = docs.username ;
          ssn.email = docs.email;
          console.log("2");
          res.redirect("release");
        }

        db.close();
    }); 
});
});

// end
// end
module.exports = router;
