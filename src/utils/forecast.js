const request = require('request')
const forecast = (l1, l2, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=99cb35a1fb463d3ca2b9315e1b488b2c&query=' + l1 + ',' + l2 + '&units=m'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (response.body.error) {
            callback('unable to find', undefined)
        } else {
            callback(undefined, {
                weather: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                rainprobability: response.body.current.precip
            })
        }
    })
}
module.exports = forecast;