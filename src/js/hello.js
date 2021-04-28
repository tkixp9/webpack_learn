import '../css/hello.less'
import logo from '../assets/logo.png'

const env = MY_ENV
console.log('---webpack--- MY_ENV=', env)

const config = { name: 'jin xiao ke', age: 18, sex: 'gender' }
const arrayLike = { 0: 'li xiao ming', 1: 'jin xiao ke', 2: '露露', length: 4 }
const array = Array.from(arrayLike)
const testLog = () => {
  for (let i = 0; i < array.length; i++) {
    const info = { ...config, age: config.age + 1 }
    console.log('---webpack--- info =', info)
    console.log('---webpack--- array =', array[i])
  }
}

testLog()

const fetchData = () => {
  fetch('/users/ruanyf')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log('Request Failed', err))
}

fetchData()

const appendImg = () => {
  const element = document.createElement('img')
  element.src = logo
  document.body.appendChild(element)
}

appendImg()
