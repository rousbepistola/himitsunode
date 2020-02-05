var express = require('express');
var router = express.Router();
var ssn;


/* GET home page. */
router.get('/', function(req, res, next) {
  ssn = req.session;
  if(ssn.loginfirst){
    res.render('index',{error:ssn.loginfirst});
  } else res.render('index');

    

  

});

module.exports = router;
