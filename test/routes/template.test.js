const app = require('../../server/index')
const request = require('supertest')(app)
const assert = require('power-assert')

describe('# test routes', () => {
  const temp = {
    name: 'mocha-test',
    template: '<h2>Hello ${name}</h2>',
    data: "{ name: 'mocha'}"
  }

  it('GET /xhr/v1/template', done => {
    request
      .get('/xhr/v1/template')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === 'success')
        assert(Array.isArray(res.body.data), '返回数据应该为数组')
        done()
      })
  })

  it('POST /xhr/v1/template', done => {
    request
      .post('/xhr/v1/template', temp)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === 'success')
        assert(typeof res.body.data === 'object', '返回数据应该为对象')
        assert(res.body.data._id !== undefined, '需返回新增的模版id')
        done()
      })
  })

  it('GET /xhr/v1/template/:id', done => {
    request
      .get('/xhr/v1/template/5f6b44e787af780946ea82eb')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === 'success')
        assert(typeof res.body.data === 'object', '返回数据应该为对象')
        assert(res.body.data.name === 'test2', '返回数据应与数据库一致')
        done()
      })
  })

  it('GET /xhr/v1/template/:id bad id', done => {
    request
      .get('/xhr/v1/template/5f6b44e787af780946ea82ea')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.code === 400)
        assert(res.body.msg === 'success')
        assert(typeof res.body.data === 'object', '返回数据应该为对象')
        done()
      })
  })

  it('PUT /xhr/v1/template/:id', done => {
    request
      .put('/xhr/v1/template/5f6b44e787af780946ea82eb', temp)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === 'success')
        assert(typeof res.body.data === 'object', '返回数据应该为对象')
        assert(res.body.data.name === 'test2', '返回数据应与数据库一致')
        done()
      })
  })

  it('DELETE /xhr/v1/template/:id', done => {
    request
      .delete('/xhr/v1/template/5f6b44e787af780946ea82ea')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === '删除成功')
        done()
      })
  })
})
