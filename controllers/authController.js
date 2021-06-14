const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
require('dotenv').config()


exports.user_cred = [
  // Validate input fields.
  body('username', 'Username required and must be atleast 3 characters.').isLength({ min:3 }).trim(),
  body('password', 'Password must be atleast 6 characters.').isLength({ min:6 }),
  

  // Process the request after validating.
  (req, res) => {
    // Save errors from validation, if any.
    const errors = validationResult(req)
    // console.log(req.body);

    // Check if there were errors from the form.
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
    }
    else {
      // Save username and password.
      // Convert username to lowercase for db consistency
      const username = req.body.username.toLowerCase()
      const password = req.body.password
      // Create a token for the user.
      const token = jwt.sign({ username: username }, process.env.jwtSecret,
        {expiresIn: 21600 })
      // Set token in header
      req.headers['token'] = token
      res.status(200).send({ user: username, token: token, authorized: true })
    }
  },
]
