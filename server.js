const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes/routes')
const path = require('path')

const mongoose = require('mongoose')
const db = require('./config/db')
mongoose.connect(db.url, (err, res) => {
  if(err)
    console.error("Error connecting to: " + db + ". " + err)
  else
    console.log("Successfully connected to: " + db.url )
})

const bodyParser = require('body-parser')

app.use(morgan('combined'))
app.use(bodyParser.json())

const port = process.env.PORT || 8080

app.listen(port)
console.log('App is running on port ' + port)

let browserPath = path.join(__dirname, 'browser')
app.use('/browser', express.static(browserPath))

routes(app)
