//儲存股票代碼與名稱進資料庫
//寫了IGNORE會忽視掉已經存過的
async function saveStockName(stockNo, stockName) {
  const saveNameResult = await connection.execute('INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)', [stockNo, stockName]);
  return saveNameResult;
}
//把整理好的資料存進資料庫
async function saveStockPrice(connection, processData) {
  return await connection
    .promise()
    .query('INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?', [processData]);
}

module.exports = { saveStockName, saveStockPrice };
