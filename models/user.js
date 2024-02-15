const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Veuillez insère votre email"],
    unique: true, 
  },
  password: {
    type: String,
    required: [true, "Veuillez insère votre mot de passe"],
  },
  userType: {
    type: String, 
    enum : {
        values : ['CEO', 'RH', 'Tech Lead'],
        message : `{value} n'a pas la permission de se connecter`
      }, 
      required: true , 
    }, 
    createdAt:{
     type:Date, 
     default: Date.now() 
    },
    updatedAt: {
      type: Date , 
    default: Date.now()
    }
});
module.exports =  mongoose.model('user', userSchema)