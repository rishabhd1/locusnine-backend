const express = require('express');
const app = express();
const port = 5000;

const connectDB = require('./config/db');
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Routes
app.use('/api/user', require('./routes/user'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
