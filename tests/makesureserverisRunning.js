const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure chai
chai.use(chaiHttp)
chai.should()

// eslint-disable-next-line no-undef
describe('Make sure status is 200', () => {
  // eslint-disable-next-line no-undef
  it('Should return 200', (done) => {
    chai.request(app)
      .get('/')
      .end((_err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
})
