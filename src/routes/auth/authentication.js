export const isAuth = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/unauthenticated");
  } else {
    next();
  }
};


