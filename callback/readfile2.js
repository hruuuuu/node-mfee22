const { readFile } = require('fs');

//data用帶入的function版本
// let data = 'test.txt';
// let readFilePromise = (data) => {
//   return new Promise((resolve, reject) => {
//     readFile(data, 'utf-8', (err, data) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(data);
//     });
//   });
// };

// readFilePromise(data)
//   .then((result) => {
//     console.log(`這裡是promise的result: ${result}`);
//   })
//   .catch((err) => {
//     console.log(`這裡是promise的err: ${err}`);
//   });

//直接把promise存成變數的版本
let readFilePromise = new Promise((resolve, reject) => {
  readFile('test.txt', 'utf-8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  });
});

readFilePromise
  .then((result) => {
    console.log(`這裡是promise的result: ${result}`);
  })
  .catch((err) => {
    console.log(`這裡是promise的err: ${err}`);
  });
