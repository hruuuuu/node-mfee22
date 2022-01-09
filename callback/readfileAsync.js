const { readFile } = require('fs');

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
// (async () => {
//   let result = await readFilePromise(data);
//   console.log(result);
// })();

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
  let result = await readFilePromise();
  console.log(result);
})();
