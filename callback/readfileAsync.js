const { readFile } = require('fs');

/*
//data帶入function版本
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
(async () => {
 try{
  let result = await readFilePromise(data);
  console.log(result);
 }catch{
  console.log(err);
 }
})();
*/

//沒有用data帶入的版本
let readFilePromise = () => {
  return new Promise((resolve, reject) => {
    readFile('test.txt', 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

(async () => {
  try {
    let result = await readFilePromise();
    console.log(result);
  } catch {
    console.log(err);
  }
})();
