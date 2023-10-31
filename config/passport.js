const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')

const db = require('../models')
const Users = db.Users
const bcrypt = require('bcryptjs')
const passport = require('passport')


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

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['email', 'displayName'] //獲取這兩項資料
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile)
  const email = profile.emails[0].value
  const name = profile.displayName

  return Users.findOne({
    attributes: ['id', 'name', 'email'],
    where: { email }, //使用profile.email[0].value作為條件
    raw: true
  })
    .then(user => {
      if (user) { return done(null, user) }

      const randomPwd = Math.random().toString(36).slice(-8)
      return bcrypt.hash(randomPwd, 10)
        .then(hash => Users.create({ name, email, password: hash }))
        .then(user => done(null, { id: user.id, name: user.name, email: user.email })) //只想給session id,name,email三個資料 不然可以直接寫成done(null,user)
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

module.exports = passport