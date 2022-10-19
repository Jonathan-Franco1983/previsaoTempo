const apiKey = '274fe3783c887537491ea9b113b26b3d'
const apiCountryURL = 'https://countryflagsapi.com/png/'

const cityInput = document.getElementById('barra-pesquisa')
const searchBtn = document.getElementById('input-BTN')

const cityElement = document.querySelector('#cidade')
const tempElement = document.querySelector('#temperatura span')
const descElement = document.querySelector('#descricao')
const tempoIconElement = document.querySelector('#weather-icon')
const paisElement = document.querySelector('#pais')
const umidadeElement = document.querySelector('#umidade span')
const ventoElement = document.querySelector('#vento span')

//funções
/*função async é uma função assincrona, ou seja, pode  demorar um pouco para responder.*/
const recebeDados = async city => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}$lang=pt_br`

  const res = await fetch(apiWeatherURL)
  const data = await res.json()

  console.log(data)
}

const mostraTempo = city => {
  receberDados(cityInput)
}

//eventos

searchBtn.addEventListener('click', e => {
  e.preventDefault() //prevenimos um default

  const city = cityInput.value

  mostraTempo(city)
})
