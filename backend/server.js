const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');
const app = express();
//Body parser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/key').mongoURI;

//Connect to mongo
mongoose.connect(db).then(() => console.log('MongoDB Connected..,')).catch((err) => console.log(err));

// User Routes
app.use('/api/items', items);
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server started on port ${port}!`));
