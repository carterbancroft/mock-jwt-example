'use strict'

const assert = require('assert')
const request = require('request-promise-native')

const server = require('../server')
const { getToken } = require('./fixtures')

const TEST_PORT = 4001

// Start an instance of the app that we can test again.
let app
before(async () => app = await server.start(TEST_PORT))
after(() => server.stop(app))

const makeAuthdRequest = async (method, uri, body) => {
  const token = getToken()

  const options = {
    baseUrl: `http://localhost:${app.address().port}`,
    method,
    uri,
    headers: {
      Authorization: `Bearer ${token}`
    },
    resolveWithFullResponse: true,
    json: true,
  }

  if (body) options.body = body

  const response = await request(options)

  return response
}

describe('routes', () => {
  describe('api/secret', () => {
    it('should pass authorization', async () => {
      const { body } = await makeAuthdRequest('GET', '/api/secret')

      const expected = {
        text: "You must be auth'd if you are seeing this page."
      }
      assert.deepStrictEqual(body, expected)
    })
  })
})
