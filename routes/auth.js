const auth = require('../controller/auth')
const express = require('express');
const route = express.Router();
const errorWrap = require('../utils/errorWrap'); 
const { userValidation } = require('../validation/user');
const validationError = require('../middleware/validationError');
const checkAuth = require('../middleware/checkAuth');


route.post('/sign-in',userValidation,validationError,errorWrap.wrapper(auth.signIn));

route.post('/sign-out',checkAuth,errorWrap.wrapper(auth.signOut));



/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     tags:
 *      - Authentication 
 *     name: userLogin
 *     summary: To get  user login 
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       200:
 *         description: Your login success
 *         content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     items:
 *                         $ref: login/login-user
 * 
 *                     
 *               
 *       401:
 *         description: Wrong Credentials
 *       404:
 *         description: User not found
 * 
 * /auth/sign-out:
 *   post:
 *     tags:
 *      - Authentication 
 *     name: userLogin
 *     summary: To get  user login 
 *     consumes:
 *       - application/json
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: logout success
 *         content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     items:
 *                         $ref: component/login/loginuser                 
 *       401:
 *         description: Wrong Credentials
 *       404:
 *         description: User not found        
 * 
 * 
 */

module.exports = route;
