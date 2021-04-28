import '../css/hello.less'
const env = MY_ENV
console.log('---webpack--- MY_ENV=', env)

const config = { name: 'jin xiao ke', age: 18, sex: 'gender' }

const testLog = () => {
  for (let i = 0; i < 3; i++) {
    const info = { ...config, age: config.age + 1 }
    console.log('---webpack--- i =', info)
  }
}

testLog()
