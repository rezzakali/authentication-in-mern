// internal imports
import User from '../models/userSchema.js';
import ErrorResponse from '../utilities/error.js';

async function registerController(req, res, next) {
  const { name, email, phone, password } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      phone,
      password,
    });
    await newUser.save();
    console.log(newUser);
    res.status(201).json({
      success: true,
      result: newUser,
    });
    next();
  } catch (error) {
    return next(new ErrorResponse('There was a server side error', 500));
  }
}

export default registerController;
