const { readFile } = require('fs');

//這是一個callback
readFile('test.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});
//做完之後inset to mysql...等
