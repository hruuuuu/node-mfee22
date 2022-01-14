const axios = require('axios');

/*
axios
  .get('http://34.221.173.92:3000/data')
  .then(function (response) {
    //回傳一整個response物件 資料存在data
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
*/

axios
  .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220109&stockNo=2330')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });