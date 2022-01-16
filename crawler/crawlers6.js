const axios = require('axios');
const { readFile } = require('fs/promises');
const moment = require('moment');
const mysql = require('mysql2');
require('dotenv').config();

(async () => {
  let connection = mysql.createConnection({
    host: process.env.DB_HOST, //127.0.0.1
    port: process.env.DB_PORT, //8080是apache
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  try {
    // 根據變數去抓取資料
    // 從 stock.txt 中讀出檔案代碼
    const stock = await readFile('stock.txt', 'utf-8');
    let stockNo = stock;
    // 抓取股票中文名稱，順便確認股票代碼是否存在
    const queryStockName = await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
      params: {
        query: stockNo,
      },
    });
    //console.log(queryStockName.data);

    if (!queryStockName.data.suggestions || queryStockName.data.suggestions[0] === '(無符合之代碼或名稱)') {
      throw new Error('查無此代碼');
    }
    let stockData = queryStockName.data.suggestions[0];
    let stockDatas = stockData.split('\t');
    let stockName = stockDatas[1];

    //儲存股票代碼與名稱進資料庫
    //寫了IGNORE會忽視掉已經存過的
    let saveNameResult = await connection.execute('INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)', [stockNo, stockName]);
    //console.log(saveNameResult);

    let queryDate = moment().format('YYYYMMDD');
    const response = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
      params: {
        response: 'json',
        date: queryDate,
        stockNo,
      },
    });
    //console.log(response.data);

    //開始處理資料
    let processData = response.data.data.map((data) => {
      //處理民國年->西元年
      let dateArr = data[0].split('/');
      dateArr[0] = Number(dateArr[0]) + 1911;
      data[0] = dateArr.join('-');
      //處理千分逗點
      data = data.map((value) => {
        return value.replace(/[,]+/g, '');
      });
      data.unshift(stockNo);
      // console.log(data);
      return data;
    });
    //把整理好的資料存進資料庫
    let savePriceResult = await connection
      .promise()
      .query('INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?', [processData]);
  } catch (err) {
    console.log(err);
  }
  connection.end();
})();
