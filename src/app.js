const path = require('path')// core node module - dont need to install
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//console.log(__dirname)//contains path to the current directory -will use this to get to the public directory
//console.log(__filename)// contains path to itself

// lines below define paths for Express config
const publiccDirectoryPath = path.join(__dirname, '../public')//'..' as a second arg goes up a folder; '../..' to go two up
//need a brand new path if u want to customizr the views directory(eg: changed views to templates)
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs') //allows you to set a value for an express setiting(key, settingName)
app.set('views', viewsPath)// need to st it again if you  customize the views direcotry
hbs.registerPartials(partialsPath)//takes a path to the directory where the partials live


//set up static directoy to serve
app.use(express.static(publiccDirectoryPath))//serving up the diretory-customizes your server
//static means the assets do not change (opposite: dynamic)


app.get('', (req,res)=>{
    //render: can render the the handlebar templates
    res.render('index', {//created dynamic html doc
        title: 'Weather', 
        name: 'Aditi'
    })//name of the template in the views folder
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Aditi'
    })
    })

app.get('/help', (req,res)=>{
    res.render('help',{
        name:'Aditi',
        title:'Help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address' 
        })
    }

    geocode(req.query.address, (error, {latitude,longitude, location}={}) => {
        if (error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if (!req.query.search){//no search term given
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req,res) => {
    res.render('404',{
        msg: 'Help article not found',
        name: 'Aditi',
        title: '404'
})
})
//404 page: needs to come last
app.get('*',(req,res)=>{ //* (wild card character): everything else
    res.render('404', {
        msg: 'My 404 page',
        name: 'Aditi',
        title: '404'
})
})
//handlebars: allows us to render dynamic docs and create reusable code




// app.get('',(req,resp)=>{//no purpose - the html file runs instead
//     resp.send("<h1>Weather</h1>")//displays text, html, json...
// })//configures what a server should do when user tries to get the resource at a specific url
// //takes 2 arguments: partial url, a function- what to send back when user visits this route 
//     //function takes 2 arg: incoming request (info about query string), what to respond wih




//domain (all these run on a single express server) - multiple routes below
//app.com--root route
//app.com/help (partial url = '/help')
//app.com/about

//start the server up: takes 1 required and i optional arg: port number (3000) and asychnronous call back function which runs when the server starts runninh
app.listen(3000, ()=>{
    console.log('server is up on port 3000') //doesnt display on the browser

})
//to view on browser: http://localhost:3000
//to shut it down: ctrl + c

//when localhost:3000 is searched, it goes to the server, finds a matching route and processed the express using the handler(res.send)