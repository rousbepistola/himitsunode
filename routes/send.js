
var express = require('express');
var router = express.Router();
var ssn;
let nodemailer = require('nodemailer');



/* GET home page. */
// new code
router.post('/', function(req, res, next){
    ssn = req.session;
    var name = req.body.contactname;
    var email = req.body.contactemail;
    var message = req.body.contactmessage;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        service: 'gmail',
        auth: {
            user: 'test.audreysedgeley@gmail.com',
            pass: '3te5hrlns2gy'
        }
    });
    let mailOptions = {
        from: 'test.audreysedgeley@gmail.com',
        to: req.body.contactemail,
        subject: 'We received your message below: ',
        text: `${message}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error){
            console.log("some fields missing")
            ssn.success = "please populate all fields";
            res.redirect('contact');
            
          } else{
            console.log("message sent")
            ssn.success = "We got your message... and We'll keep it a secret";
            res.render('contact',{success:ssn.success});
          }
    });
});

// end
// end
module.exports = router;
