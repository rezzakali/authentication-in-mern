// internal imports
import ErrorResponse from '../utilities/error.js';

const logoutController = async (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    res.status(200).send('Cleared cookie');
    next();
  } catch (error) {
    return next(new ErrorResponse(''));
  }
};

export default logoutController;
