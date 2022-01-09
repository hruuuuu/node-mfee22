const { readFile } = require('fs/promises');

/*
readFile('test.txt', 'utf-8')
  .then((result) => {
    console.log(`內建promise版本: ${result}`);
  })
  .catch((err) => {
    console.log(`內建promise版本err: ${err}`);
  });
  */

(async () => {
  try {
    let result = await readFile('test.txt', 'utf-8');
    console.log(`內建promise版本: ${result}`);
  } catch {
    console.log(err);
  }
})();
