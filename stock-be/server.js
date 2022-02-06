const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

//利用express這個library來建立一個web app(express instance)
let app = express();

/* 使用第三方開發的CORS middleware 讓我們的server接受非同源請求*/
//原本的設定 只有開啟cors 沒有限制來源等等
//app.use(cors());

app.use(
  cors({
    //為了要讓browser在CORS跨源請求的情況下 還是幫我們送cookie
    //設定接受跨源存取的前端 所以是3000而不是3002(後端)
    origin: ['http://localhost:3000'],
    //credential設為true表示請browser幫我們帶cookie
    credentials: true,
  })
);

/* express內建middleware: urlencoded */
//用來解析req.body(post)
//extended: false -> querystring
//querystring 沒辦法解析巢狀物件
//extended: true -> qs
//qs可以解析巢狀套件 所以比較常用
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* 啟用session */
//npm i express-session
const expressSession = require('express-session');

//npm i session-file-store
//session-file-store是一個服務expression-session的套件
let FileStore = require('session-file-store')(expressSession);

app.use(
  expressSession({
    store: new FileStore({
      //用來指定session要存在硬碟裡的路徑
      //這邊寫完之後要到指定的位置去開一個sessions的資料夾
      path: path.join(__dirname, '..', 'sessions'),
    }),

    //secret是session傳輸時用來加密的key
    //這邊寫完之後要到.env裡去加上SESSION_SECRET
    secret: process.env.SESSION_SECRET,

    //resave設成true 表示不管session有沒有改內容 都希望重新儲存一次
    //因為這邊是要用session-file-store存在硬碟 所以設成false
    resave: false,

    //saveUninitialized設成true 表示不管有沒有要寫入session 後端都會發給一個session id
    saveUninitialized: false,
  })
);

/* 設定視圖樣板 */
//設定視圖樣板要放在哪個資料夾
app.set('views', path.join(__dirname, 'views'));
//設定視圖引擎是pug
app.set('view engine', 'pug');

/* express內建middleware: static */
//assets裡面放靜態檔案 ex: 圖片, js, css...
//app.use('/static', express.static(path.join(__dirname, 'assets')));
//如果沒有要指定router的話也可以這樣寫
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/public', express.static(path.join(__dirname, 'public')));

/* 自己開發的middleware */
app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人來拜訪 at ${current.toISOString()}`);
  next();
});

app.use((req, res, next) => {
  console.log(`這是一個沒有用的中間件`);
  next();
});

app.use((req, res, next) => {
  console.log(`這是一個在首頁後面的中間件`);
  next();
});

//router middleware
app.get('/', (req, res, next) => {
  console.log(`拜訪首頁`);
  //結尾是response去接 是結束終點
  //res.send('hello express');

  //用view engine來渲染頁面 SSR(server-side render)
  //不用寫.pug 因為在前面設定視圖的地方已經宣告是pug檔案了
  res.render('index', {
    //從render傳入資料到pug
    stocks: ['台積電', '長榮', '聯發科'],
  });
});

app.get('/about', (req, res, next) => {
  console.log(`這是關於我們`);
  //res.send('我們是MFEE22');
  res.render('about');
});

app.get('/contact', (req, res, next) => {
  console.log(`這是聯絡我們`);
  //throw new Error('故意製造的錯誤');
  res.send('聯絡MFEE22');
});

//stockRouter也是一個中間件
let stockRouter = require('./routers/stock');
app.use('/api/stock', stockRouter);

let memberRouter = require('./routers/member');
app.use('/api/member', memberRouter);

let authRouter = require('./routers/auth');
app.use('/api/auth', authRouter);

//可以在最後面放一個404 middleware 前面的router都比對不到
app.use((req, res, next) => {
  console.log(`在所有router後面放404中間件`);
  res.status(404).send('404 not found');
});

//在所有middleware後面放錯誤 middleware
app.use((err, req, res, next) => {
  console.log(`來自四個參數的錯誤處理中間件`, err);
  res.status(500).send('server錯誤 請洽系統管理員');
});

const port = process.env.SERVER_PORT || 3002;
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
