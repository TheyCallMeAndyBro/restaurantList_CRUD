module.exports = (error, req, res, next) => {
  // console.error(error)
  req.flash('error', error.errorCreate || error.errorDelete || error.errorEdit || error.UserCreate || error.LoginMessage|| '處理失敗')
  // res.redirect('back')

  next(error)
}