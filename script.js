let city = document.querySelector(".city")
let btn = document.querySelector(".searchbtn")
let info = document.querySelector(".info")
city.addEventListener("keypress", function (e) {
    if (e.keyCode == 13) {
        btn.click()
    }
})
function search() {
    info.innerHTML = `<div class="card">
            <div class="maincard">
                <div class="cityandicon">
                    <p class="cityname"></p>
                    <img src="" alt="" class="icon">
                </div>
                <p class="desc fontsize"></p>
                <p class="temp fontsize"></p>
            </div>
            <div class="seccard">
                <p class="wind"></p>
                <p class="humidity"></p>
                <p class="visibility"></p>
                <p class="lastupdated"></p>
            </div>
        </div>
        <div class="forecast">
            <p class="heading">5-Day Forecast</p>
            <div class="days">
                <div class="each">
                    <div class="cityandiconf">
                        <p class="citynamef"></p>
                        <img src="" alt="" class="iconf">
                    </div>
                    <p class="descf fontsizef"></p>
                    <p class="tempf fontsizef"></p>
                </div>
            </div>
        </div><footer> <a href="https://openweathermap.org/api" target="_blank">Weather API</a></footer>`
    if (city.value == "") {
        console.log("no value entered")
        let temperature = document.querySelector(".temp")
        temperature.innerHTML = `Please enter a city first`
    }
    else {
        async function main() {
            let name = document.querySelector(".cityname")
            let cityname = city.value
            let refer = await getting(cityname)
            let foref = await gettingforecast(cityname)
            let nameofcity = refer.name
            let dt = new Date((refer.dt) * 1000)
            let visibility = document.querySelector(".visibility")
            let humidity = document.querySelector(".humidity")
            name.innerHTML = `<b>${nameofcity}</b>`
            let image = document.querySelector(".icon")
            let wind = document.querySelector(".wind")
            let desc = document.querySelector(".desc")
            let temperature = document.querySelector(".temp")
            let lastupdt = document.querySelector(".lastupdated")
            let weatherdesc = refer.weather[0].main
            let maintemp = Math.floor(refer.main.temp)
            let icon = refer.weather[0].icon
            let windsp = refer.wind.speed
            let vis = Math.floor((refer.visibility) / 1000)
            let hum = refer.main.humidity
            lastupdt.innerHTML = `Last updated ${dt.toLocaleTimeString()} ${dt.toDateString()}`
            desc.innerHTML = `${weatherdesc}`
            temperature.innerHTML = `${maintemp}°C`
            image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
            wind.innerHTML = `<b>Avg Wind Speed</b> ${Math.floor(windsp * 3.6)}Km/h`
            visibility.innerHTML = `<b>Visibility</b> ${vis}Km`
            humidity.innerHTML = `<b>Relative Humidity</b> ${hum}%`
            let days = document.querySelector(".days")
            for (let i = 0; i < foref.list.length; i++) {
                if (i % 8 === 0) {
                    let dttime = new Date((foref.list[i].dt) * 1000)
                    days.innerHTML = days.innerHTML + ` <div class="each">
                    <div class="cityandiconf">
                        
                        <img src="https://openweathermap.org/img/wn/${foref.list[i].weather[0].icon}@2x.png" alt="" class="iconf">
                    </div>
                    <p class="datef fontsizef colorf">${dttime.toDateString()}</p>
                    <p class="descf fontsizef colorf">${foref.list[i].weather[0].main}</p>
                    <p class="tempf fontsizef colorf">${Math.floor(foref.list[i].main.temp)}°C</p>
                </div>`

                    console.log(dttime.toTimeString(), dttime.toDateString(), foref.list[i].weather[0].main, foref.list[i].weather[0].icon)
                }
            }

        }
        main()
    }
}
async function getting(cityname) {
    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=a4b319baa5e8a5d6256c51f0d3226459&units=metric`)
        if (!data.ok) {
            console.log("website will soon be live")
            notfound()
        }
        let djson = await data.json()



        console.log(djson)
        console.log(djson.weather[0].description, " in ", cityname)
        return djson

    } catch (error) {
        console.log(error)
        notfound()
    }
}
function notfound() {
    let info = document.querySelector(".info")
    info.innerHTML = `<div class="card">
            <div class="maincard">
                <div class="cityandicon">
                    <p class="cityname"></p>
                    <img src="" alt="" class="icon">
                </div>
                <p class="desc fontsize"></p>
                <p class="temp fontsize"></p>
            </div>
            <div class="seccard">
                <p class="wind"></p>
                <p class="humidity"></p>
                <p class="visibility"></p>
                <p class="lastupdated"></p>
            </div>
        </div>`
    let temperature = document.querySelector(".temp")
    temperature.innerHTML = `Oops! City not found`
}
async function gettingforecast(cityname) {
    try {
        let datafore = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=a4b319baa5e8a5d6256c51f0d3226459&units=metric
`)
        if (!datafore.ok) {
            console.log("forecast can not be fetched")
        }
        else {
            let fore = await datafore.json()


            console.log(fore)
            return fore
        }
    } catch (error) {
        console.log(error)
    }
}
function mode() {
    let bg = getComputedStyle(document.body).backgroundColor
    if (bg == "rgb(255, 255, 255)") {
        document.body.style.backgroundColor = "black"
        document.querySelector(".city").style.backgroundColor = "rgb(55, 54, 54)"
        document.querySelector(".city").style.color = "white"
        document.querySelector(".cityname").style.color = "rgb(203, 166, 237)"
        document.querySelector(".card").style.color = "rgb(243, 227, 250)"
        let elements = document.getElementsByClassName("colorf")
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color = "pink"
        }
    }
    else {
        document.body.style.backgroundColor = "white"
        document.querySelector(".city").style.backgroundColor = "white"
        document.querySelector(".city").style.color = "black"
        document.querySelector(".cityname").style.color = "blueviolet"
        document.querySelector(".card").style.color = "rgb(69, 3, 97)"
        let elements = document.getElementsByClassName("colorf")
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.color = "rgb(97, 75, 197)"
        }
    }
}

function liveloc() {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(res => res.json())
            .then(data => {
                const cityl = data.address.city|| data.address.town || data.address.village;;
                console.log(city);
                city.value = cityl
                search()
                city.value = city.value
            });
    });
}