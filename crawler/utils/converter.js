//轉換器 轉換資料用
//處理股票名稱
function parseStockName(stockNameData) {
  if (!stockNameData.suggestions || stockNameData.suggestions[0] === '(無符合之代碼或名稱)') {
    throw new Error('查無此代碼');
  }
  let stockData = stockNameData.suggestions[0];
  let stockDatas = stockData.split('\t');
  return stockDatas[1];
}
//處理價格資料
function convertPrice(stockPriceData, stockNo) {
  //抓取特定日期的股票資料
  let processData = stockPriceData.data.map((data) => {
    //處理民國年->西元年
    let dateArr = data[0].split('/');
    dateArr[0] = Number(dateArr[0]) + 1911;
    data[0] = dateArr.join('-');
    //處理千分逗點
    data = data.map((value) => {
      return value.replace(/[,]+/g, '');
    });
    data.unshift(stockNo);
    return data;
  });
  return processData;
}
module.exports = { parseStockName, convertPrice };
