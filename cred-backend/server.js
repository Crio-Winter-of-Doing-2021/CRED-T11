const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express();
// User login and sign up (POST /login, /signup routes)

// Add a credit card (POST /cards, this includes verification)

// Get list of cards associated for a user (GET /cards with userid)

// Post statement (POST /cards/{id}/statements/{year}/{month}

// Fetch the statement summary (GET /cards/{id}/statements/{year}/{month}

// Payment of the bill (POST /cards/{id}/pay)

app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});
app.use(bodyParser.json());
// app.use('/api', apiRouter);
app.get('/',(req, res)=>{
    res.send('Hello world');
})

const port=process.env.PORT || 4000
app.listen(port,()=>{console.log('r')})
