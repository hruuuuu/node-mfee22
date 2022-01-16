const { readFile } = require('fs/promises');
const moment = require('moment');
const twse = require('./utils/twse.js');
const converter = require('./utils/converter.js');
const twseSaver = require('./utils/twseSaver.js');
const connection = require('./utils/db.js'); //也可以這樣引入module直接用

(async () => {
  try {
    //根據變數去抓取資料
    //從 stock.txt 中讀出檔案代碼
    const stockNo = await readFile('stock.txt', 'utf-8');
    //async函式return的其實是promise物件 所以要記得這邊也要await它 等著它回傳了之後 才會收得到真正要的資料
    const stockNameData = await twse.queryStockName(stockNo);
    const stockName = converter.parseStockName(stockNameData);
    const saveStockName = await twseSaver.saveStockName(stockNo, stockName);
    const queryDate = moment().format('YYYYMMDD');
    const stockPriceData = await twse.queryStockPrice(queryDate, stockNo);
    const processData = converter.convertPrice(stockPriceData, stockNo);
    const savePriceResult = await twseSaver.saveStockPrice(connection, processData);
  } catch (err) {
    console.log(err);
  }
  connection.end();
})();
