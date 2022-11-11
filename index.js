const express = require("express");
const dotenv = require('dotenv')
const cors = require('cors')

const connectDB = require('./src/db')
const api = require('./src/routes/index')
dotenv.config();

const app = express();

//connect to db
connectDB();

const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/api/v1', api);
// initialize the server
app.listen(port, () => {
  console.log(`server running on localhost:${port}`)
})
