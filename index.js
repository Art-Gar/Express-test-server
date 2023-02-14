const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const app=express();

// Init middleware

app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
// set static folder
app.use(express.static(path.join(__dirname,'public')));

// Members API Routes
app.use('/api/members',require('./routes/api/members'));
app.use('/api/db',require('./routes/api/db'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


