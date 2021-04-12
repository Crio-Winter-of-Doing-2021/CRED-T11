const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
require('dotenv').config()
const app = express();



var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
// });

// scheduling the cron jobs for sending the reminders for timely payments;
let transporter = nodemailer.createTransport({
  service:'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});

const User = db.user;
const Card = db.card;

// cron
cron.schedule('0 0 * * 7', async () => {
      const cards =  await Card.findAll()
      for (let card of cards){
        if(card.dataValues.outstanding_amount>0){
          const user = await User.findOne({
            where:{
              id:card.dataValues.userId,
            }
          })
          console.log(user);
          let messageOptions = {
            from: 'credcreditcard4@gmail.com',
            to: user.dataValues.email,
            subject: 'Reminder For paying bill',
            html: 
            `
            <h3>Hi , ${user.dataValues.username} </h3>
            <p>You are receiving this mail because you have outstanding amount ₹ ${card.dataValues.outstanding_amount} for card</p> 
            <b>Card Details</b>
            <p>Card Holder Name - ${card.dataValues.card_name} </p>           
            <p>Card No - ${card.dataValues.card_no} </p>
            `
          };
          transporter.sendMail(messageOptions, function(error, info) {
            if (error) {
              throw error;
            } else {
              console.log('Email successfully sent!');
            }
          });
          console.log("you need to pay your payment");
        }
      }
  console.log('running every once a week');
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CRED " });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/card.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
