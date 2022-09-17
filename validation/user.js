const { check } = require('express-validator');

exports.userValidation = [

  check('email')
    .notEmpty()
    .withMessage('Email is Required'),

  check('password')
    .notEmpty()
    .withMessage('Password is Required')
    .isLength({ min: 8, max: 12 })
    .withMessage('Password length should be atleast 8-12 characters long')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password should contain 1 capital letter, 1 special character, 1 numeric character')
  ,
];