const Shorteners = require('../models/shorteners.js')

function shortenCheck(shortenLink) {
  return new Promise((resolve, reject) => {
    Shorteners.findOne({ shortenLink: shortenLink })
      .exec((err, url) => {
        if (err) reject(err)
        if (url === null) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
  })
}

module.exports = shortenCheck