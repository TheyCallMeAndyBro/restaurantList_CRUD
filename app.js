const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

require('dotenv').config()

const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const router = require('./routes')
const messageHandler = require('./middlewares/mseeage-handler')
const errorHandler = require('./middlewares/error-handler')


const methodOverride = require('method-override')
const { where } = require('sequelize')

app.engine('.hbs', engine({ extname: '.hbs', helpers: {} }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) //''內可以隨意指定 辨別使用methodOverride的方式


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session()) //驗證的來源,配合req.isAuthenticated()

app.use(messageHandler)

app.use(router)

app.use(errorHandler)


app.listen(port, () => {

  console.log('App running in local:3000')
})


