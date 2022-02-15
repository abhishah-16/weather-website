const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 5000
const pdpath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templets/views')
const partialpath = path.join(__dirname, '../templets/partials')

app.use(express.static(pdpath))
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Abhi shah',
        age: 21
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About weather app',
        name: 'Abhi shah',
        age: 21
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abhi shah',
        age: 21
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide location'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error:error
            })
        }

        forecast(data.latitude, data.longitude, (error, foredata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: data.location,
                weather: foredata.weather,
                temperature: foredata.temperature,
                feelslike: foredata.feelslike,
                Rain_probability: foredata.rainprobability
            })
        })
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        errormessage: 'Help artical not found',

    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        errormessage: 'Page not found',

    })
})
app.listen(port, () => {
    console.warn('server is on')
})