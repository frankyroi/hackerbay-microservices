const { expect } = require('chai')
const request = require('supertest')

const app = require('../app')


describe('HackerBay-Microservice', () => {
  // Create dummy login data
  const loginDetails = { username: 'john', password: 'johndoe' }
  // Create token variable to save user token
  let token
  // Set various variables to be used in the application
  const imageUrl = 'https://kctmarketplace.ng/public/assets/product/Product_16230904001289283232.png'
  const invalidImageUrl = 'https://s3.amazonaws.com/oxfamamericaunwrapped.com/wp-content/uploads/2013/07/OAU10-53_pair_of_goats'
  const jsonObject = '{ "user": { "firstName": "Albert", "lastName": "Einstein" } }'
  const jsonPatchObject = '[{"op": "replace", "path": "/user/firstName", "value": "Leonado"}, {"op": "replace", "path": "/user/lastName", "value": "Da Vinci"}]'

  // Mock user authentication
  describe('Mock Authentication', () => {
    it('it should not log user in if username and password do not meet requirements', (done) => {
      request.agent(app)
        .post('/api/auth')
        .send({ username: 'john', password: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400)
          done()
        })
    })

    it('it should accept a username/password and return a signed JWT', (done) => {
      request.agent(app)
        .post('/api/auth')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body.authorized).to.equal(true)
          token = res.body.token
          done()
        })
    })
  })

  describe('Thumbnail creation', () => {
    it('it should accept a public image url and return a resized image', (done) => {
      request.agent(app)
        .post('/api/thumbnail')
        .set('token', token)
        .send({ imageUrl: imageUrl })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body.converted).to.equal(true)
        })
      done()
    })

    it('it should not process image if token is invalid', (done) => {
      request.agent(app)
        .post('/api/thumbnail')
        .set('token', 'wrongtoken')
        .send({ imageUrl: imageUrl })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401)
          expect(res.body.authorized).to.equal(false)
        })
      done()
    })

    it('it should not process image if url is invalid', (done) => {
      request.agent(app)
        .post('/api/thumbnail')
        .set('token', token)
        .send({ imageUrl: invalidImageUrl })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400)
        })
      done()
    })
  })

  describe('Patch object', () => {
    it('it should patch object A with object B', (done) => {
      request.agent(app)
        .patch('/api/patchJson')
        .set('token', token)
        .send({ jsonObject, jsonPatchObject })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('it should not patch if token is invalid', (done) => {
      request.agent(app)
        .patch('/api/patchJson')
        .set('token', 'wrongtoken')
        .send({ jsonObject, jsonPatchObject })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401)
          expect(res.body.authorized).to.equal(false)
        })
      done()
    })
  })
})
