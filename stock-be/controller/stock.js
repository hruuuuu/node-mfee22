//controller負責商業邏輯
const stockModel = require('../models/stock');

const getAll = async (req, res, next) => {
  stockModal.getAll();
};

const getPriceByCode = async (req, res, next) => {
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
};

module.exports = router;
