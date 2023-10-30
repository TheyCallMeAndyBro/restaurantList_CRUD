//註冊邏輯
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../models')
const Users = db.Users

router.post('/', (req, res, next) => {
  const { name, email, password, confirm_passowrd } = req.body
  if (!email || !password) {
    req.flash('error', '請填寫完整資訊') //伺服器端判斷
    return res.redirect('back')
  }

  if (password !== confirm_passowrd) {
    req.flash('error', '驗證密碼與密碼不符')
    return res.redirect('back')
  }

  Users.count({ where: { email } })

    .then(emailcheck => {
      if (emailcheck > 0) {
        req.flash('error', '此信箱已經註冊')
        return res.redirect('back')
      }
      return bcrypt.hash(password, 10)
        .then(hash => {
          return Users.create({ name, email, password: hash })
        })
    })

    .then(user => {
      if(!user){
        req.flash('error','創建失敗')
        return res.redirect('back')
      }
      req.flash('success', '註冊成功')
      return res.redirect('/login')
    })

    .catch(error => {
      error.UserCreate = '註冊失敗'
      next(error)
    })
})


module.exports = router