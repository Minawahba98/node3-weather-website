const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

// Define path for Express views
const pathWay = path.join(__dirname, '../views')
const pathDirectory = path.join(__dirname, '../public')

//setup handler engine and views location
app.set('views', pathWay);
app.set('view engine', 'hbs');

//Partials Path
const partialsPath = path.join(__dirname, '../views/Partials')
hbs.registerPartials(partialsPath)



//Static Directory
app.use(express.static(pathDirectory))

app.get('', (req, res) => {
    res.render('index', {
        name: 'mina wahba'
    })
})

app.get('/product', (req, res) => {
    res.send({
        product: []
    })

})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'mina wahba',
        age: '25'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        name: 'mina wahba'
    })

})
// app.get('', (req, res) => {
//     res.send('Hello express')

// })



// app.get('/help', (req, res) => {
//     res.send('Help')

// })
// app.get('/about', (req, res) => {
//     res.send('About')

// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})






app.get('*', (req, res) => {
    res.render('404', {
        name: "mina wahba",
    })
})



app.listen(3000, () => {
    console.log('server is up')
})