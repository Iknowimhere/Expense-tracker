import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    lowercase: true,
  },
  photo: {
    type: String,
    default: 'https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false,
    validate:{
      validator:function(value){
        return value===this.confirmPassword
      },
      message:'Password and confirm password must be same'
    }
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
  }
});

userSchema.pre('save',async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  this.confirmPassword = undefined;
  next();
})

userSchema.methods.matchPassword = async function(pwd,pwdDb){
  return await bcrypt.compare(pwd,pwdDb);
}

const User = mongoose.model('User', userSchema);

export default User;
