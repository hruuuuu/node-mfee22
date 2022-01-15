const axios = require('axios');
const { readFile } = require('fs/promises');

(async () => {
  try {
    const stock = await readFile('stock.txt', 'utf-8');
    try{
      let stockNo = stock;
      let queryDate = "20220115";
      const response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
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
  } catch {
    console.log(err);
  }
})();