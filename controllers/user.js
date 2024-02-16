require("dotenv").config();
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = {email: email , password : password}
  if (!email || !password) {
    res.status(400).json({ msg: " please provide email and password " });
}
 const accessToken = generateAccessToken(user)
 res.json({accessToken: accessToken})
};
function generateAccessToken(user) {
  
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15s'});//15s pour tester le refreshtoken
  }

  module.exports = {login, }