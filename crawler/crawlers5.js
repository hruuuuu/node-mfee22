const axios = require('axios');
const { readFile } = require('fs/promises');
const moment = require('moment');
const mysql = require('mysql2');
require("dotenv").config();

(async () => {
  let connection = mysql.createConnection({
    host: process.env.DB_HOST, //127.0.0.1
    port: process.env.DB_PORT, //8080是apache
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
  try {
    const stock = await readFile('stock.txt', 'utf-8');
    let stockNo = stock;
    const queryStockName = await axios.get("https://www.twse.com.tw/zh/api/codeQuery",{
      params:{
        query: stockNo,
      }
    })
    console.log(queryStockName.data);
    if(!queryStockName.data.suggestions || queryStockName.data.suggestions[0] === "(無符合之代碼或名稱)"){
      throw new Error("查無此代碼")
    }
    let stockData = queryStockName.data.suggestions[0];
    let stockDatas = stockData.split("\t");
    let stockName = stockDatas[1];

    //儲存股票代碼與名稱進資料庫
    let saveNameResult = await connection.execute(
      "INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)",
      [stockNo, stockName]
    );
    console.log(saveNameResult);
    let queryDate = moment().format("YYYYMMDD");
    const response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    {
      params:{
        response: "json",
        date: queryDate,
        stockNo,
      },
    })
    //console.log(response.data);
  } catch {
    console.log(err);
  }
  connection.end();
})();