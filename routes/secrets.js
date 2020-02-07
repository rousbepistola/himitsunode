var express = require('express');
var router = express.Router();
var ssn;
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://rousbepistola:3te5hrlns2gy@cluster0-1lsui.azure.mongodb.net/test?retryWrites=true&w=majority";


// new code
router.post('/', function(req, res, next){
console.log("enters post method for secrets.js")
  ssn=req.session;
  var title = req.body.title;
  var secretpost = req.body.secretpost;

  MongoClient.connect(url, function (err, db) {
    if(err) throw err;

    let dbo = db.db("first1");
    let myquery = {secretdocument:"rousbepistola"};
    let newvalues = {$push: {title: title, secretpost: secretpost}};
    
        dbo.collection("users1").updateOne(myquery, newvalues, function(err, res){
            if (err) throw err;
            console.log("document updated");
            console.log("document updated");
            
            db.close();
    }); 
    setTimeout(function(){
      res.redirect('release');
    },1000)
    
});
});

// end
// end
module.exports = router;
