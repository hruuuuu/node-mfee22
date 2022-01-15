const axios = require('axios');

(async ()=>{
  try{
    let stockNo = 2330;
    let queryDate = "20220115";
    // const response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${queryDate}&stockNo=${stockNo}`);
    const response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    {
      //這裡可以放一些設定
      //params: query string的參數
      params:{
        response: "json",
        date: queryDate,
        stockNo,
      },
    })
  console.log(response.data);
  }catch(error){
    console.log(error);
  }
})();