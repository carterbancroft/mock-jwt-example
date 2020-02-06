'use strict'

const express = require('express')
const jwksRsa = require('jwks-rsa')
const expressJwt = require('express-jwt')

const routes = require('./routes')
const config = require('./config')

const start = port => {
  const app = express()

  const checkJwt = expressJwt({
    // Validate the audience and the issuer.
    audience: config.auth0.audience,
    issuer: config.auth0.issuer,
    algorithms: ['RS256'],

    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${config.auth0.issuer}.well-known/jwks.json`
    }),
  })
  app.use(checkJwt)

  app.use('/api', routes)

  const apiPort = port || 4000

  return app.listen(apiPort)
}

const stop = async app => {
  process.exit(0)
}

module.exports = {
  start,
  stop,
}
