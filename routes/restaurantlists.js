const express = require('express')
const router = express.Router()

const db = require('../models')
const restaurantList = db.restaurantLists

router.get('/', (req, res) => {
  // console.log(req.session)
  // console.log(req.user)
  restaurantList.count().then(totalrestaurants => {  //先計算出餐廳有多少然後得出總頁數
    const renderRestaurant = 9
    const totalRestaurantsPage = Math.ceil(totalrestaurants / renderRestaurant)

    const page = parseInt(req.query.page) || 1 //未傳入時為1
    const hasNextPage = page < totalRestaurantsPage
    const hasPrepage = (page - 1) > 0

    const dropdownValue = req.query.dropdownValue
    let orderOpition; //儲存order by選項

    //用來防止下拉式選單更新
    const A = dropdownValue === "A"
    const Z = dropdownValue === "Z"
    const category = dropdownValue === "category"
    const location = dropdownValue === "location"

    switch (dropdownValue) {
      case "A":
        orderOpition = [['name', 'ASC']]  //多一個括號原因為要讓name與ASC一起被當作條件
        break;
      case "Z":
        orderOpition = [['name', 'DESC']]
        break;
      case "category":
        orderOpition = [['category', 'ASC']]
        break;
      case "location":
        orderOpition = [['location', 'ASC']]
        break;
    }
    const usersId = req.user.id

    return restaurantList.findAll({
      attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
      where: { usersId },
      offset: (page - 1) * 9,
      limit: 9,
      order: orderOpition,
      raw: true
    })

      .then(restaurantLists => {
        const keyword = req.query.keyword?.trim()
        const matchRestaurant = keyword ? restaurantLists.filter(restaurantList => {
          const restaurantListsData =   //重新生成物件只想取name,category
          {
            name: restaurantList.name,
            category: restaurantList.category,
          }

          //再用Object.values使物件變成數列 使用.some()數列方法辨認
          return Object.values(restaurantListsData).some(value => {
            if (typeof (value) === 'string') {
              return value.toLowerCase().includes(keyword)
            }
            else return false
          })
        }) : restaurantLists

        res.render('index', {
          restaurants: matchRestaurant, keyword,
          Previous: page > 1 ? page - 1 : page,
          Next: page + 1,
          page,
          hasPrepage,
          hasNextPage,
          dropdownValue,
          A,
          Z,
          category,
          location
        });
      })
  })
})

router.get('/new', (req, res) => {
 
  res.render('new');
})

router.post('/', (req, res, next) => {
  const data = req.body
  const usersId = req.user.id
  // console.log({ data, usersId })

  return restaurantList.create({ ...data, usersId })//data為物件需要加上...讓所有的值都被create
    .then(() => {
      req.flash('success', '新增成功')
      res.redirect('/restaurants')
    })

    .catch(error => {
      error.errorCreate = '新增失敗'
      next(error)
    })

})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const usersId = req.user.id

  return restaurantList.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'usersId'],
    raw: true
  })
    .then(restaurantList => {
      if (!restaurantList) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurants')
      }
      if (restaurantList.usersId !== usersId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurants')
      }
      res.render('show', { restaurantList })
    })

})


router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantList.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })

    .then(restaurantList => res.render('edit', { restaurantList }))
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const usersId = req.user.id

  return restaurantList.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'usersId'],
  })
    .then(restaurantList => {
      if (!restaurantList) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurants')
      }
      if (restaurantList.usersId !== usersId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurants')
      }

      restaurantList.update(req.body)

        .then(updaterestaurantList => {
          req.flash('success', '編輯成功')
          res.redirect('/restaurants')
        })
        .catch(error => {
          error.errorEdit = '編輯失敗'
          next(error)
        })
    })

})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  const usersId = req.user.id

  return restaurantList.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'usersId'],
  })
    .then(restaurantList => {
      if (!restaurantList) {
        req.flash('error', '找不到資料')
        return res.redirect('/restaurants')
      }
      if (restaurantList.usersId !== usersId) {
        req.flash('error', '權限不足')
        return res.redirect('/restaurants')
      }
      restaurantList.destroy()
        .then(() => {
          req.flash('success', '刪除成功')
          res.redirect('/restaurants')
        })
        .catch(error => {
          error.errorDelete = '刪除失敗'
          next(error)
        })
    })
})

module.exports = router