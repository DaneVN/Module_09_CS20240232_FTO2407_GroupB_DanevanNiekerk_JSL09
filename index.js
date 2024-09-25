//BACKGROUND API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    //promise is resolved
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    //promise is rejected
    .catch(err => {
        console.log(err)
        const bgDefault = "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjcyNzc0ODZ8&ixlib=rb-4.0.3&q=85"
        document.body.style.backgroundImage = `url(${bgDefault})`
    })


//CRYPTO CURRENCY API
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    //promise is resolved
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        //crypto top
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        //crypto content
        document.getElementById("crypto").innerHTML += `
            <p>🎯: R${data.market_data.current_price.zar}</p>
            <p>👆: R${data.market_data.high_24h.zar}</p>
            <p>👇: R${data.market_data.low_24h.zar}</p>
        `
    })
    //promise is rejected
    .catch(err => console.error(err))

    
//TIME
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}
setInterval(getCurrentTime, 1000) //Live update

//WEATHER

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

