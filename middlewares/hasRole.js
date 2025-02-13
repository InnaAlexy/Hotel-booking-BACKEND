module.exports = async function (roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.send({ error: "Access dinied" });
      return;
    }

    next();
  };
};
