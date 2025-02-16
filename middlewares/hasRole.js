module.exports = function (roles) {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.send({ error: "Access dinied" });
      return;
    }

    next();
  };
};
