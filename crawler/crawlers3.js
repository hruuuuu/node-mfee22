const axios = require('axios');
const { readFile } = require('fs/promises');

(async () => {
  try {
    const stock = await readFile('stock.txt', 'utf-8');
    const now = new Date;
    const month = Number(now.getMonth() + 1);
    const date = Number(now.getDate());
    const format = (num)=>{
      if (num < 10){
        return `0${num}`;
      }else{
        return num;
      }
    }
    const today = `${now.getFullYear()}${format(month)}${format(date)}`;
    //console.log(today);
    //try catch只要包一層就可以了
      let stockNo = stock;
      let queryDate = today; //自動改成今天的日期
      const response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params:{
          response: "json",
          date: queryDate,
          stockNo,
        },
      })
    console.log(response.data);
  } catch {
    console.log(err);
  }
})();