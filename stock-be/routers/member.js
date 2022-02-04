//member的router
const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middlewares/auth');

//checkLogin會對整個router有效
router.use(checkLogin);

router.get('/', (req, res, next) => {
  /* 改寫成checkLogin middleware require即可
  //如果session裡有member存在(有登入過)
  // if (req.session.member) {
  //   //就回傳member資料
  //   res.json(req.session.member);
  // } else {
  //   //否則回傳錯誤訊息
  //   req.statusCode(400).json({
  //     code: 99999,
  //     msg: '尚未登入',
  //   });
  // }
  */

  //經過checkLogin確認登入了 就可以直接拿到資料
  res.json(req.session.member);

  /*
  res.json({
    id: 1,
    name: '小賴',
  })
  */
});
module.exports = router;
