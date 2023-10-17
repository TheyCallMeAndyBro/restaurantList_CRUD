const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const db = require('./models')
const restaurantList = db.restaurantList

const methodOverride = require('method-override')
const { where } = require('sequelize')

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) //''內可以隨意指定 辨別使用methodOverride的方式

app.get('/', (req, res) => {
  res.redirect('/restaurants')


})

app.get('/restaurants', (req, res) => {
  restaurantList.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
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
      res.render('index', { restaurants: matchRestaurant, keyword });
    })


})

app.get('/restaurants/new', (req, res) => {
  res.render('new');
})

app.post('/restaurants', (req, res) => {
  const data = req.body
  console.log(data)
  restaurantList.create(data)
    .then(() => { res.redirect('/restaurants') })

})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  restaurantList.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then(restaurantList => { res.render('show', { restaurantList }) })

})


app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  restaurantList.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })

    .then(restaurantList => res.render('edit', { restaurantList }))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  restaurantList.update(req.body, { where: { id } })

    .then(updaterestaurantList => { res.redirect('/restaurants') })

})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  restaurantList.destroy({ where: { id } })
    .then(() => { res.redirect('/restaurants') })
})

app.listen(port, () => {

  console.log('App running in local:3000')
})


