import User from "../models/User.js";
import { genToken } from "../utils/genToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      confirmPassword,
      photo: req.file?.path,
    });

    // Save user to database
    const savedUser = await newUser.save();
    let token = genToken(savedUser._id);

    res.status(201).json({
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        photo: savedUser?.photo,
        token
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    // Check if password is correct
    const user = await User.findOne({ email }).select('+password');
    console.log(user);

    if (!user || !(await user.matchPassword(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //generate token
    let token = genToken(user._id);
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        photo: user?.photo,
        token
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
