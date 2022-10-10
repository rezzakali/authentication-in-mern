// external imports
import jwt from 'jsonwebtoken';

// internal imports
import User from '../models/userSchema.js';
import ErrorResponse from '../utilities/error.js';

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return next(new ErrorResponse('No token', 404));
    }
    // verify the token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const finalUser = await User.findOne({
      id: verifiedToken._id,
      'tokens.token': token,
    });

    if (!finalUser) {
      return next(new ErrorResponse('User not found!', 404));
    }

    res.status(200).json({
      success: true,
      result: 'Authorized user!',
    });

    next();
  } catch (error) {
    return next(new ErrorResponse('Unauthorized user!', 401));
  }
};

export default authentication;
