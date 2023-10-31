const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] })) //scope: ['email']只是獲取拿到email的使用權限
//取的URL後經由passport.authenticate去使用fackbook的策略

router.get('/redirect/facebook', passport.authenticate('facebook', {  //經由facebook策略導回來執行以下程式碼
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true
}))


module.exports = router