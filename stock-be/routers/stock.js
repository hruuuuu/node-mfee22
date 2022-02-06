//stock-be/routers/stock.js

//stock的router 本來的app.get改成router.get 並把router共通的地方拿去server.js裡stockRouter的地方
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock');

//RESTful API列表
//建議加一個api的router 比較不會跟前端的router打架
//兩種寫法都可以
router.get('/', stockController.getAll);

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

router.get('/:stockId', stockController.getPriceByCode);

module.exports = router;
