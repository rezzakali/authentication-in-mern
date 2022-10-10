// external imports
import bcrypt from 'bcrypt';

// internal imports
import User from '../models/userSchema.js';
import ErrorResponse from '../utilities/error.js';

async function loginController(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide your email and password!'));
  }

  // find the user
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse('Invalid credentials!', 404));
    }
    // compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    // if the password is invalid
    if (!isValidPassword) {
      return next(new ErrorResponse('Password mismatched!', 400));
    }
    // generate token
    const token = await user.generateToken();

    //  set the cookie
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true, //accessible only by web server
      secure: true, // https
      sameSite: 'None', //cross-site cookie
    });

    res.status(200).json({
      success: true,
      result: token,
    });
  } catch (error) {
    return next(new ErrorResponse('There was a server side error', 500));
  }
}

export default loginController;
