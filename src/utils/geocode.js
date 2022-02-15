const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaXNoYWgxNjkiLCJhIjoiY2t6aHl4dGZ1MnZkMTJ1bzFmejd2YzdhciJ9.tkyleRgkqajtrMTlkGBY8g&list=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (response.body.features.length===0) {
            callback('Unable to find location.Try Another Location', undefined)
        } else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]

            })
        }

    })
}
module.exports = geocode