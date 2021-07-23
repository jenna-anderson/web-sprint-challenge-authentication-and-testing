const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('./auth-model')
const { checkPayloadBody, checkUsernameExists } = require('../middleware/users')
const { checkUsernameExistsLogin } = require('../middleware/auth')
const tokenBuilder = require('./tokenBuilder')

router.post('/register', checkPayloadBody, checkUsernameExists, async (req, res, next) => {
  const user = req.body
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcrypt.hashSync(user.password, rounds)

  user.password = hash

  try{
    const newUser = await Users.add(user)
    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
});

router.post('/login', checkPayloadBody, checkUsernameExistsLogin, (req, res, next) => {
  const { username, password } = req.body

  if(bcrypt.compareSync(password, req.user.password)) {
    const token = tokenBuilder(req.user)
    res.status(200).json({
      message: `welcome, ${username}`,
      token
    })
  } else {
    next({ status: 401, message: 'invalid credentials'})
  }
});

module.exports = router;
