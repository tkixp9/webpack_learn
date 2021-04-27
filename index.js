import './src/js/hello'
import './src/css/main.css'

console.log('---webpack---', 'index.js')

if (module.hot) {
  module.hot.accept()
}
