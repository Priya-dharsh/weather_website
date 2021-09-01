const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const express=require('express')
const hbs= require('hbs')

const app=express()
const port=process.env.PORT || 3000

const path=require('path')
//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const publicDirpath =path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirpath)),

app.get('', (req,res)=>{
    res.render('index')
})

app.get('/about',function(req,res){
  res.render('about',{
      title:"About handler page",
      name:"Priya"
  })
}),

app.get('/weather',function(req,res){
    const address = process.argv[2]
    console.log(process.argv)
    if(!req.query.address){
      
        return res.send({
            error:'You must provide location'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={ })=>{
        if(error){
          return res.send({
            error:'Unable to find location'
        })
        }
          forecast(latitude, longitude,(error, forecastdata)=>{
            if (error){
              return console.log(error)
            }
            console.log(location)
           console.log(forecastdata)
           res.send({
            forecast:forecastdata,
            location:location
        })
          })
       
   
    })
})
app.get('/products', (req,res)=>{
    if(!req.query.games){
       return res.send({
             error: 'You must provide games value'
        })
    }
    
    console.log(req.query.games)
    res.send({
        games:"Football",
        rating: 5
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help',
        name:"xx"
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        content:'Help article not found'
    })
   // res.send('Help article not found')
})

app.get('*', (req,res) =>{
    res.render('error',{
        content:'My 404 page'
    })
    //res.send('404 error')
})
app.listen(port,function(){
    console.log("Server is running on " +port)  
})