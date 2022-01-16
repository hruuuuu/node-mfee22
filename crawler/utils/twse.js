//負責從證交所查資料
const axios = require('axios');
//抓取股票中文名稱，順便確認股票代碼是否存在
async function queryStockName(stockNo) {
  //所以外層也要包async 這樣整個fucntion都會變成非同步 回傳的話就會回傳promise物件而不是真正的資料 所以在主程式那邊也要加一個await
  const queryStockName = await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
    //這邊是用async來撈資料
    params: {
      query: stockNo,
    },
  });
  return queryStockName.data;
}
//抓取特定日期的股票資料
async function queryStockPrice(queryDate, stockNo) {
  const queryStockPrice = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
    params: {
      response: 'json',
      date: queryDate,
      stockNo,
    },
  });
  return queryStockPrice.data;
}

module.exports = { queryStockName, queryStockPrice };
