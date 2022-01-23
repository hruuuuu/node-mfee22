//stock的router 本來的app.get改成router.get 並把router共通的地方拿去server.js裡stockRouter的地方
const express = require('express');
const router = express.Router();
const connection = require('../utils/db');

//RESTful API列表
//建議加一個api的router 比較不會跟前端的router打架
//兩種寫法都可以
router.get('/', async (req, res, next) => {
  let result = await connection.execute('SELECT * FROM stocks');
  res.json(result[0]);
});

// router.get('/api/stock_prices', async (req, res, next) => {
//   let [data, fields] = await connection.execute('SELECT * FROM stock_prices');
//   res.json(data);
// });

// router.get('/api/stock/:stockId', async (req, res, next) => {
//   //用req.params.stockId取得stockId
//   let [data, fields] = await connection.execute(
//     'SELECT * FROM stock_prices WHERE stock_id = ?',
//     [req.params.stockId]
//   );
//   res.json(data);
// });

router.get('/:stockId', async (req, res, next) => {
  const stockId = req.params.stockId;
  const page = req.query.page || 1; //預設值為1 也就是如果網址沒有打?page=xxx 就自動=1
  /*
  const [count] = await connection.execute(
    'SELECT * FROM stock_prices WHERE stock_id = ?',
    [stockId]
  );
  const total = count.length;
  */
  let [total] = await connection.execute(
    'SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id = ?',
    [stockId]
  );
  total = total[0].total;
  const perPage = 3;
  const lastPage = Math.ceil(total / perPage);
  //計算SQL要用的offset
  const offset = perPage * (page - 1);
  const [data, fields] = await connection.execute(
    'SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ?, ?',
    [stockId, offset, perPage]
  );
  res.json({
    pagination: { total, perPage, page, lastPage },
    data,
  });
});
module.exports = router;
