const db = require('../models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.users

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
          }
        
        // create token
        const acessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).json({ acessToken, refreshToken });

    } catch (error) {
        console.log('internal server error ' + error);
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "5000000" }
    );
  }

  const generateRefreshToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_REFRESH,
      { expiresIn: "30d" }
    );
  }
module.exports = {
    login
}