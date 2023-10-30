const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local')
const db = require('../models')
const Users = db.Users
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({ usernameField: 'email' }, function Verify(username, password, done) {
  return Users.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: { email: username },
    raw: true
  })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'email或密碼錯誤' })
      }
      return bcrypt.compare(password, user.password)
        .then(isMatched => {
          if (!isMatched) {
            return done(null, false, { message: '密碼錯誤' })
          }
          return done(null, user) //將user傳回給 done
        })
    })
    .catch(error => {
      error.LoginMessage = '登入失敗'
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  const { id, name, email } = user  //user為策略中傳給上方done的資料
  return done(null, { id, name, email })
})

passport.deserializeUser((user, done) => {
  done(null, { id: user.id }) //將資料存進req.user之後可以使用這邊作為呼叫
})

const restaurants = require('./restaurantlists')
const users = require('./users')
const authhandler = require('../middlewares/auth-handler')

router.use('/restaurants', authhandler, restaurants)
router.use('/users', users)

router.get('/', (req, res) => {

  res.redirect('/restaurants')


})

router.get('/login', (req, res) => {

  res.render('login')
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    req.flash('error', '缺少email或密碼')
    res.redirect('back')
  }
  passport.authenticate('local', {
    successRedirect: '/restaurants',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next)
})

router.get('/register', (req, res) => {

  res.render('register')
})

router.post('/logout', (req, res) => {
  req.logout(error => {
    if(error){
      next(error)
    }
    return res.redirect('/login')
  })
})


module.exports = router