const axios = require('axios');
const { readFile } = require('fs/promises');
const moment = require('moment');

(async () => {
  try {
    //根據變數去抓取資料
    //從stock.txt中讀出檔案代碼
    const stock = await readFile('stock.txt', 'utf-8');
    let stockNo = stock;
    let queryDate = moment().format("YYYYMMDD");
    //抓取股票中文名稱 順便確認股票代碼是否存在
    const quetyStockName = await axios.get("https://www.twse.com.tw/zh/api/codeQuery",{
      params:{
        query: stockNo,
      }
    })
    console.log(quetyStockName.data);
    if(!quetyStockName.data.suggestions || quetyStockName.data.suggestions[0] === "(無符合之代碼或名稱)"){
      throw new Error("查無此代碼")
    }
    let stockData = quetyStockName.data.suggestions[0];
    let stockDatas = stockData.split("\t");
    let stockName = stockDatas[1];
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
})();