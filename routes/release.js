var express = require('express');
var router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://rousbepistola:3te5hrlns2gy@cluster0-1lsui.azure.mongodb.net/test?retryWrites=true&w=majority";
let secretstitle = [];
let secretspost = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  ssn=req.session;
  ssn.loginfirst;

  if(ssn.email){
    ssn.loginfirst = "";

    MongoClient.connect(url, function(err, db){
      if(err) throw err;
      let dbo = db.db("first1");

        dbo.collection("users1").findOne({secretdocument:"rousbepistola"} ,function(err, data){
        if (err) throw err;
        ssn.secretpost = data.secretpost;
        ssn.secrettitle = data.title;
        // console.log(data.secretpost);
        // console.log(data.title)
        // console.log(ssn.secretpost[0]);
        // console.log(data.title[0])
        
        secretspost = [];
        for(let i = 0; i < (data.secretpost).length; i++) {
          secretspost.push(data.secretpost[i])
        }

        secretstitle = [];
        for(let i = 0; i < (data.title).length; i++) {
          secretstitle.push(data.title[i])
        }


        // console.log(secretspost);
        console.log('Yay!')
        
        db.close();

    });
    });
    if(ssn.refreshing == 1){
      ssn.refreshing = 2;
      console.log(ssn.refreshing)
      setTimeout(function(){
        res.redirect('release');
      },500)
    } else {
      setTimeout(function(){
        res.render('release',{username:ssn.username, himitsutitle:secretstitle, himitsupost:secretspost});
      },600)
     
    }
    


  } else {
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
        
    });
    
});
res.redirect('release');
});





module.exports = router;
