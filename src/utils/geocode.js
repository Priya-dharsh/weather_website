const request = require("request")
const fs = require('fs');


    const geocode = (address,callback)=>{
        const add = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicHJpeWFzaHJpcmFtIiwiYSI6ImNrc25yZzJ3ZDNrbGMybnJvbmZoamJ2NnQifQ.tEzJ7-1vDZuVZFaqOvCB4A'
        request({ url:add, json: true}, (error,{body})=>{
            if(error){
                callback('Unable to connect website', undefined)
                    }
                   else if (body.features.length === 0){
                    callback('Unable to find location, Try another search', undefined)
                   }
                    else{
                        callback(undefined, {
                            latitude: body.features[0].center[1],
                            longitude: body.features[0].center[0],
                            location: body.features[0].place_name
                        })
                      
                         
                    }
                    })
    }
    
    

  module.exports = geocode
