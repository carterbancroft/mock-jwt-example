'use strict'

const server = require('./server')

// Start it up
const app = server.start()
const port = app.address().port
console.log(`Listening for requests at http://localhost:${port}...`)
