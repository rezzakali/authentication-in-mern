// external imports

// redirect already logged in user to inbox pabe
const redirectLoggedIn = function (req, res, next) {
  let cookies = req.cookies.jwt;

  if (!cookies) {
    next();
  } else {
    res.redirect('/inbox');
  }
};

export default redirectLoggedIn;
