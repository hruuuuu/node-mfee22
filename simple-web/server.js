//nodejs內建的模組 不用安裝
const http = require('http');
require('dotenv').config();
const server = http.createServer(function (request, response) {
  //裡面會放一個funciton用來接收create server之後要做的事
  //怎麼處理request? 要負責回覆response
  response.statusCode = 200;
  const path = request.url;
  console.log(path);
  switch (path) {
    case '/':
      response.end('hello, server');
      break;
    case '/about':
      response.end('hello, this is about');
    default:
      response.statusCode = 404;
      response.end();
      break;
  }
});
let port = process.env.SERVER_PORT || 3000; //or的這個寫法是給預設值 如果.env設定檔的port是undifined或null 就執行後面的開在3000
server.listen(port, () => {
  console.log(`我們的簡易版server已經啟動在port ${port} 上`);
});
