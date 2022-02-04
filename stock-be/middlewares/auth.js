let checkLogin = (req, res, next) => {
  if (req.session.member) {
    next();
  } else {
    req.statusCode(400).json({
      code: 99999,
      msg: '尚未登入',
    });
  }
};

module.exports = { checkLogin };
