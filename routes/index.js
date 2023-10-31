const express = require('express')
const router = express.Router()
const passport = require('passport')


const restaurants = require('./restaurantlists')
const users = require('./users')
const authhandler = require('../middlewares/auth-handler')
const oauth2_fb = require('./oauth2_fb')

router.use('/restaurants', authhandler, restaurants)
router.use('/users', users)
router.use('/oauth2_fb', oauth2_fb)

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
    if (error) {
      next(error)
    }
    return res.redirect('/login')
  })
})



module.exports = router