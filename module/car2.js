//第二種寫法
exports.setName = function (firstName, lastName) {
  name = `${firstName} ${lastName}`;
};
exports.showName = function (newName) {
  console.log(`hello car2, ${name}`);
};
exports.color = 'red';
/*
最後不用加這句!!!
exports = { setName, showName };
不能這樣寫

Node底層會這樣偷偷處理module:
1. 在開頭的地方 加上 exports = module.exports = {}
2. 在結束的地方 加上 return module.exports;

因為它是return module.exports
如果我們寫exports = {} 看到大括號 -> 分配記憶體
變成是分配了一個新的記憶體給exports 並且在這個記憶體裡傳入setName跟showName

所以情況會是:
module.exports -->指向{}
exports --> 指向{setName, showName}

變成導出時module.exports並沒有寫入任何東西 所以會是空的 就會有錯誤
*/
