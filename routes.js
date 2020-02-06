'use strict'

const express = require('express')
const router = express.Router()


/*function checkJwt(req, res, next) {
  if (req.user) next()
  else res.sendStatus(401)
}*/

router.get('/secret', (req, res) => {
  return res.send({text: "You must be auth'd if you are seeing this page."})
})

module.exports = router
