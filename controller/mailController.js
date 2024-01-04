// const nodeMailer = require('nodemailer');
// const asyncHandler = require('express-async-handler');


// const sendEmail = asyncHandler(async(req,res)=>{
    
//     const transporter = nodeMailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//             user: process.env.MAILER_ID,
//             pass: process.env.MP
//         }
//     });
//     console.log(data);
//     const info = await transporter.sendMail({
//         from: '"Maddison Foo Koch 👻" <neil4@ethereal.email>', // sender address
//         to: data.to, // list of receivers
//         subject: data.subject, // Subject line
//         text: data.text, // plain text body
//         html: data.html, // html body
//       });
    
//       console.log("Message sent: %s", info.messageId);
//       res.send(info)
// })

// module.exports = sendEmail