export const isAuth = (req, res, next) => {
  if (!req.user) {
    res.redirect("/unauthenticated");
  } else {
    next();
  }
};


