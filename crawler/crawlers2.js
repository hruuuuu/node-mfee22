const axios = require('axios');

(async ()=>{
  try{
    const response = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220109&stockNo=2330');
  console.log(response.data);
  }catch(error){
    console.log(error);
  }
})();