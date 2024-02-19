require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user")

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = { email: email, password: password }
  if (!email || !password) {
    res.status(400).json({ msg: "Veuillez fournir un courriel et un mot de passe " });
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ msg: "L'utilisateur n'existe pas." });
    }
    //ne9ssa validation de mdp 
    const accessToken = generateAccessToken(user)
    res.json({ accessToken: accessToken })
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur lors de l'authentification." });
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });//15s pour tester le refreshtoken
}

const register = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body })//...=> pou extraire les donnes de corps de la requete
    const token = generateAccessToken(newUser);
    res.status(200).json({ newUser, token })
  } catch (error) {
    res.status(500).json({ msg: "Erreur lors de l'inscription." });
  }
}


module.exports = { login, register}