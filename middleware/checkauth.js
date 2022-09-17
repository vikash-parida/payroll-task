const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = async (req, res, next) => {
  try {
    const checkToken = req.headers.authorization;
    if (!checkToken) {
      return res.status(401).send({ message: 'Unauthorized' });
    } else {
        // console.log(req.headers.authorization)
      let token = req.headers.authorization.split(' ')[1];
      const checkToken = await models.user_token.findOne({
        where: {
          token
        }
      });
      // console.log(checkToken);
      if (!checkToken) {
        return res.status(401).send({ message: 'Unauthorized' });
      }
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      let userDetails = await models.user.findOne({
        where: { id: decode.id },
      });
      if (!userDetails) {
        return res.status(401).send({ message: 'Unauthorized' });
      } else {
        delete userDetails.dataValues.password;
        req.userData = userDetails.dataValues;
        next();
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: 'Unauthorized' });
  }
};