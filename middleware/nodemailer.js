const nodemailer = require('nodemailer');

const mandarMail = (email) => {

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.MAIL_USER, 
          pass: process.env.PASS_USER, 
        },
      });

      let message = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Mundo disney",
        text: "Gracias por unirte a la familia disney, espero que disfrutes nuestra app",
      };
    
      // send mail with defined transport object
      transporter.sendMail(message,(err, res) => {
          console.log(err);
          res.status(500)
      });
      
}

module.exports ={
    mandarMail
}