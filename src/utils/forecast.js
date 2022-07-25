const request = require('request')




const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=f8daf6229de5a7a1bd56cc8dc345e677&query=' + latitude+','+longitude+'&units=f'
    request ({url,json:true}, (error,{body}) => {
        if (error){
            callback('Unable to connect to weather service',undefined)
        }else if (body.error){
            callback('Wrong input', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. ' + 'The wind speed is ' + body.current.wind_speed + '.')
        }
    })
}
module.exports = forecast