# How To Mock JSON Web Tokens
As the title suggests, this is an example of how to mock JSON Web Tokens for unit
testing a Node.js Express application. It assumes you're using Auth0 but the
mocking strategy applies more broadly to JSON Web Tokens in general.

I've also written a [companion article](https://carterbancroft.com/mocking-json-web-tokens-and-auth0/)
for this repo.

## Setup

```
$ npm install
```

## Running The App
From the root of the repository...

```
$ npm start
```

The app runs by default on port 4000.

## Running Tests
This is probably what you care about most... Seeing that the test is able to
hit an auth'd endpoint.

```
$ npm test
```

Tests run against a server running on port 4001. The tests will setup and tear
down the server automatically so no need to make sure the server is running
before the tests run.

## Generating Your Own Key Set
If you'd like to use your own key set as an experiment you'll need to...

1. Generate an RSA key.
2. Retrieve the `n` and `e` values for that key.
3. Base64urlUInt encode your `n` and `e` values
4. Replace the values for each in [test/fixtures.js](https://github.com/carterbancroft/mock-jwt-example/blob/master/test/fixtures.js)

I used Python 3 for all the key stuff because it's easy.

### Generating An RSA Key
Simple as this:

```
$ python3
>>> from Crypto.PublicKey import RSA
>>> key = RSA.generate(2048)
```

To save your key to a file:

```
>>> f = open('mykey.pem','wb')
>>> f.write(key.exportKey('PEM'))
>>> f.close()
```

The private key saved in `mykey.pem` can be copy/pasted over top of [this key](https://github.com/carterbancroft/mock-jwt-example/blob/master/test/fixtures.js#L8-L34).

### Retrieving `n` and `e` Values For The Key
To get these important values, from a python repl, simply do:

```
>>> key.n
...
>>> key.e
...
```

### Base64urlUInt Encoding
This requires the [pyjwkest module](https://pypi.org/project/pyjwkest). From the command line:

```
pip install pyjwkest
```

Then from a Python repl:

```
>>> from jwkest import long_to_base64
>>> long_to_base64(<your-n-value>)
...
>>> long_to_base64(<your-e-value>)
...
```

The output is the strings to replace your `n` and `e` values [here](https://github.com/carterbancroft/mock-jwt-example/blob/master/test/fixtures.js#L37-L44).
