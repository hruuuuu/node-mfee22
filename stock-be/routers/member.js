//member的router
const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middlewares/auth');

//checkLogin會對整個router有效
router.use(checkLogin);

router.get('/', (req, res, next) => {
  // if (req.session.member) {
  //   res.json(req.session.member);
  // } else {
  //   req.statusCode(400).json({
  //     code: 99999,
  //     msg: '尚未登入',
  //   });
  // }

  //經過checkLogin認證登入了 就可以直接拿到資料
  res.json(req.session.member);
});
module.exports = router;
