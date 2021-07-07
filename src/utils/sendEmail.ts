import * as nodemailer from "nodemailer";
// async..await is not allowed in global scope, must use a wrapper
export const  SendEmail= async (userEmail: String, name: String) => {
    
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "apikey", // generated ethereal user
        pass: process.env.SEND_GRID_API, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'admin@smartmikey.com', // sender address
      to: "sanmiakindipe@gmail.com", // list of receivers
      subject: "You got an order ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<h2>${userEmail} just placed an order</h2><p>Ordername ${name}</p>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    
  }
  
