const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const path =require('path');
const keys=require('./config/keys');
const donors = require ('./routes/api/donors');
const donationRec = require ('./routes/api/donationRec');
const users = require ('./routes/api/users');
const passport = require('passport');
const app=express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect(keys.mongoURI , {useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/donors', donors);

app.use('/api/donationRec', donationRec);
app.use('/api/users', users);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));