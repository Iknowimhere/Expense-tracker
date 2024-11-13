import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({
        message: 'Please Login',
      });
    }
    let decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decodedToken.id);
    req.user = user._id;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
