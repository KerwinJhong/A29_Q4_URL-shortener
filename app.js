const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') { // 如果不是 production 模式
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const Shorteners = require('./models/shorteners')
const ranUrl = require('./lib/ranUrl.js')
const shortenCheck = require('./lib/shortenCheck.js')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  if (req.body.link.trim() === '') {
    res.render('index', { error: true })
  } else {
    const baseUrl = `${req.protocol}://${req.headers.host}/`

    Shorteners.findOne({ link: req.body.link }, (err, links) => {
      if (err) return console.error(err)
      if (links) {
        res.render('index', { createLinkSuccess: true, baseUrl, shortenLink: links.shortenLink })
      } else {
        async function start() {
          try {
            let shortenLink = ranUrl(5)
            let whileSwich = await shortenCheck(shortenLink)
            while (whileSwich) {
              shortenLink = ranUrl(5)
              whileSwich = await shortenCheck(shortenLink)
            }
            const shorteners = Shorteners({
              link: req.body.link,
              shortenLink: shortenLink
            })
            shorteners.save((err, shorteners) => {
              if (err) return console.error(err)
              return res.render('index', { createLinkSuccess: true, baseUrl, shortenLink: shorteners.shortenLink })
            })
          } catch (e) {
            console.warn(e)
          }
        }
        start()
      }
    })
  }
})

app.get('/:id', (req, res) => {
  Shorteners.findOne({ shortenLink: req.params.id }, (err, url) => {
    if (err) return console.error(err)
    if (!url) {
      res.render('index', { link: req.params.id })
    } else {
      res.redirect(`${url.link}`)
    }
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('app is running')
})