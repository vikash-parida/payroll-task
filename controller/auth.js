const models = require('../models')
const jwt = require('jsonwebtoken');


exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    let checkUser = await models.user.findOne({
      where: { email },
    });
    if (!checkUser) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      let userDetails = await checkUser.comparePassword(password);
      console.log(userDetails);
      if (userDetails === true) {
        const token = jwt.sign(
          {
            id: checkUser.dataValues.id,
            email: checkUser.dataValues.email,
            role_id:checkUser.dataValues.role_id
          },
          process.env.SECRET_KEY,
          { expiresIn: process.env.JWT_EXPIRE_TIME }
        );
        req.userId = checkUser.dataValues.id;
        delete checkUser.dataValues.email_verified_at;
        delete checkUser.dataValues.password;
        delete checkUser.dataValues.remember_token;
        delete checkUser.dataValues.forget_id;

        await models.user_token.create({
          user_id:checkUser.dataValues.id,
          token:token
        }); 

        return res.status(200).json({
          message: 'Authenticate Successfully',
          token: token,
          userData: checkUser,
        });
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    }
  };

exports.signOut = async(req,res) => {
  const signOut = await models.user_token.destroy({
      where: { user_id: req.userData.id }
  });

  console.log(req.userData.id);
  if (signOut) {
    return res.status(200).json({ message: "Successfully logged out" });

  }

}