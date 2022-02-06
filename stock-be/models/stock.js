//models/stock.js
//用來處理stock裡有關資料庫的部分
const connection = require('../utils/db');

//取得全部資料
const getAll = async () => {
  let [data, fields] = await connection.execute('SELECT * FROM stocks');
  console.log(data);
  return data;
};

//取得某股票代碼的總筆數
const countByCode = async (stockId) => {
  let [total] = await connection.execute(
    'SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id = ?',
    [stockId]
  );
  total = total[0].total;
  return total;
};

//取得某股票代碼的價格
const getPriceByCode = async (stockId, offset, perPage) => {
  const [data, fields] = await connection.execute(
    'SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ?, ?',
    [stockId, offset, perPage]
  );
  return data;
};

module.exports = { getAll, countByCode, getPriceByCode };
