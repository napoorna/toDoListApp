const path = require('path');
const express = require('express')
const layout = require('express-layout')
const hbs = require('hbs')
const routes = require('./routes')

const port = process.env.PORT || 3535;

const app = express()

const bodyParser = require('body-parser')

const viewPath= path.join(__dirname, 'views');
const partialsPath= path.join(__dirname, 'views/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

const middlewares = [
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded({extended:false})
]

app.use(middlewares)

app.use('/', routes)

app.listen(port, ()=>{
    console.log("App is running!!")
})