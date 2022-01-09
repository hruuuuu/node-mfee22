const { readFile } = require('fs');

let data = 'test.txt';
let readFilePromise = (data) => {
  return new Promise((resolve, reject) => {
    readFile(data, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};
/*
readFilePromise(data)
  .then((data) => {
    // 輸出從 resolve 傳來的 data 內容
    console.log(data);
  })
  .catch((err) => {
    // 輸出從 reject 傳來的 data 內容
    console.log(err);
  });
*/
(async () => {
  let result = await readFilePromise(data);
  console.log(result);
})();
