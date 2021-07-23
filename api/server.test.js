const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

test('sanity', () => {
  expect(true).toBe(true)
})

test('is correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('[POST] /register', () => {
  test('creates new user in db', async () => {
    await request(server).post('/api/auth/register').send({
      username: 'sandy',
      password: '1234'
    })
    expect(await db('users')).toHaveLength(4)
  })
  test.todo('responds with id, username, password on successful register')
  test.todo('responds with [username and password required] if username missing')
})

describe('[POST] /login', () => {
  test.todo('responds with {message: welcome, [username], token} on successful login')
  test.todo('responds with invalid credentials if incorrect username')
})
