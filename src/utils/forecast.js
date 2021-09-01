const request = require("request")
const forecast =(latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c6c264b809c170f3d2e991a1888e5615&query='+ latitude +','+ longitude +' &units=f'
    request({ url, json: true}, (error,{body})=>{
        if(error){
            callback('Unable to connect site', undefined)
                }
               else if (body.error){
                callback('Unable to get location', undefined)
               }
                else{
                    callback(undefined, body.current.weather_descriptions[0] + " .It is currently " + body.current.temperature + " but it feels like " + body.current.feelslike )
                  
                     
                }
                })
    }
    module.exports = forecast