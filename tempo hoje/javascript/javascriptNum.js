//1
const apiKey = '274fe3783c887537491ea9b113b26b3d'

//2
const apiCountryURL = 'https://countryflagsapi.com/png/'

//3

//4
const apiUnsplash = 'https://source.unsplash.com/1600x900/?'

//
const cityInput = document.querySelector('#city-input')

//5
const searchBtn = document.querySelector('#search')

//10
const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')

//fim do 10


//28
const weatherContainer = document.querySelector('#weather-data')

const errorMessageContainer = document.querySelector('#error-message')
const loader = document.querySelector('#loader')

const suggestionContainer = document.querySelector('#suggestions')
const suggestionButtons = document.querySelectorAll('#suggestions button')

// Loader
const toggleLoader = () => {
  loader.classList.toggle('hide')
}

//11
/*async é assincrona, pois precisamos esperar a consulta*/
const getWeatherData = async city => {
  //00
  toggleLoader()


  //14
  /*pegar no doc até a interrogação e complementar - parei no minuto 39:07 - https://www.youtube.com/watch?v=VS8EBgPwsSU&t=2480s*/
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
  //15 await é pq tem que esperar o fetch da api
  const res = await fetch(apiWeatherURL)

  //16 aquirecebemos o json e convertemos para objeto JS
  const data = await res.json()

  //visualizar no console o json
  //17 concole.log(data)

  toggleLoader()

  return data
}

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove('hide')
}

const hideInformation = () => {
  errorMessageContainer.classList.add('hide')
  weatherContainer.classList.add('hide')

  suggestionContainer.classList.add('hide')
}

//9
const showWeatherData = async city => {
  hideInformation()

  //11
  //console.log(city)


  //19 a função tambem deve ser assincrona e o data deve aguardar com await
  const data = await getWeatherData(city)

  //18
  //getWeatherData(city)

  if (data.cod === '404') {
    showErrorMessage()
    return
  }

  //20
  cityElement.innerText = data.name
  //21 - parseInt para retornar apenas o valor inteiro sem casas decimais
  tempElement.innerText = parseInt(data.main.temp)

  //22
  descElement.innerText = data.weather[0].description

  //23 - aqui alteramos o icone atraves so endereço que pegamos e vamos mudar o nome do icone por um templatestring.
    weatherIconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  )
    //24
  countryElement.setAttribute('src', apiCountryURL + data.sys.country)

  //25
  umidityElement.innerText = `${data.main.humidity}%`

  //26
  windElement.innerText = `${data.wind.speed}km/h`

  //27 - eliminar no html os elementos estaticos para não aparecerem e a classe hide no weather-data esconderá tudo.

  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`


//29
  weatherContainer.classList.remove('hide')
}

//6
searchBtn.addEventListener('click', async e => {
  e.preventDefault() //previne algumas falhas

  //8
  const city = cityInput.value


  //12 tem que digitar e aparecer no console o que foi digitado
  showWeatherData(city)
 
  //7
  //console.log('teste')
})


//30
cityInput.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    const city = e.target.value

    showWeatherData(city)
  }
})

// Sugestões
suggestionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const city = btn.getAttribute('id')

    showWeatherData(city)
  })
})
