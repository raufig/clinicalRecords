const fs = require('fs')
const path = require('path')

require('dotenv').config()

const nodemailer = require('nodemailer');

async function sendConfirmationEmail(to, kindOfUser, id) {
  
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'raufig25@outlook.com', 
            pass: 'cFGtp9YdBzvK5DmU' 
        }
  });

  
  let info = await transporter.sendMail({
    from: 'clinicalrecordraufig@gmail.com', 
    to: to, 
    subject: 'confirm email', 
    html: fs.readFileSync(path.join(__dirname, 'view', 'index.html')).toString()
    .replace('__KIND_OF_USER__', kindOfUser)
    .replace('__ID__', id), 
  });

  console.log('Message sent: %s', info.messageId);
}

async function sendchangePass(to, kindOfUser, id) {
  
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'raufig25@outlook.com', 
            pass: 'cFGtp9YdBzvK5DmU' 
        }
  });

  
  let info = await transporter.sendMail({
    from: 'clinicalrecordraufig@gmail.com', 
    to: to, 
    subject: 'change password', 
    html: fs.readFileSync(path.join(__dirname, 'view', 'password.html')).toString()
    .replace('__KIND_OF_USER__', kindOfUser)
    .replace('__ID__', id), 
  });

  return info.messageId
}

module.exports = { sendConfirmationEmail, sendchangePass }