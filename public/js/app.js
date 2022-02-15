const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#one')
const msg2 = document.querySelector('#two')
const msg3 = document.querySelector('#three')
const msg4 = document.querySelector('#four')
const msg5 = document.querySelector('#five')
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    msg1.textContent = 'Loading..'
    // console.log(location)
    fetch('http://localhost:5000/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.location === undefined) {
                msg1.textContent = data.error
                msg2.textContent = " "
                msg3.textContent = " " 
                msg4.textContent = " "
                msg5.textContent = " "

            } else {
                
                msg1.textContent = "Location:  " + data.location
                msg2.textContent = "Weather:  " + data.weather
                msg3.textContent = "Temperature: " + data.temperature+" C"
                msg4.textContent = "You feel:  " + data.feelslike+" C"
                msg5.textContent = "Rain_Probability: " + data.Rain_probability

            }
        })
    })
})
