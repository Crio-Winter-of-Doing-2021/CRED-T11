const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();


var corsOptions = {
  origin: "http://localhost:3000",
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



// twilioClient.verify
//   .services("VAf7685d17a069ae7d1f5fe43ca9b7ec16") //Put the Verification service SID here
//   .verificationChecks.create({ to: "devkumar5436@gmail.com", code: "089727" })
//   .then(verification_check => console.log(verification_check.status));
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
