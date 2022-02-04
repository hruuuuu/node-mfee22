//member的router
const express = require('express');
const router = express.Router();
const connection = require('../utils/db');
//npm i bcrypt
const bcrypt = require('bcrypt');

/* 做後端的驗證 */
//npm i express-validator
const { body, validationResult } = require('express-validator');

const registerRules = [
  body('email').isEmail().withMessage('Email欄位請填寫正確格式'),
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為8'),
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('密碼驗證不一致'),
];

/* 做圖片上傳前的處理 */
//npm i multer
const multer = require('multer');
const path = require('path');

//設定圖片要存的位置 & 檔名
const storage = multer.diskStorage({
  //設定儲存目的地
  destination: (req, file, cb) => {
    //先建立好資料夾/public/uploads
    //multer的cb第一個參數是錯誤 一般都設定null即可
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    //原始的檔名會存在file這個變數
    console.log('原始的filename', file);
    //拿到副檔名
    const ext = file.originalname.split('.').pop();
    //生成一個新的檔名(如: 加上uuid或時間戳記)
    cb(null, `member-${Date.now()}.${ext}`);
  },
});

const uploader = multer({
  storage,
  //fileFilter用來過濾圖片 加上mimetype可以過濾檔案格式
  fileFilter: (req, file, cb) => {
    console.log('file.mimetype', file.mimetype);
    if (
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/png'
    ) {
      cb(new Error('不接受的檔案型態', false));
    } else {
      cb(null, true);
    }
  },
  //limits用來限制檔案尺寸
  limits: {
    fileSize: 1024 * 1024,
  },
});

//api/auth/register
router.post(
  '/register',
  //這一行是multer middleware用法
  //uploader就是我們寫好的middleware .single表示單一檔案 ()裡面放欄位名稱
  uploader.single('photo'),
  registerRules,
  async (req, res, next) => {
    //req.params --> 變數是在網址上
    //req.query --> ?xxx
    //req.body --> form post
    //console.log('req.body:', req.body);

    /* 拿到驗證的結果 */
    const validateResult = validationResult(req);
    // 如果validateResult不是空的 = 有錯誤
    if (!validateResult.isEmpty()) {
      //把錯誤驗證結果變成array 方便我們取得錯誤結果
      let error = validateResult.array();
      console.log('validate result (error)', error);
      //並把錯誤訊息作為res傳給前端
      return res.status(400).json({
        code: 33001,
        msg: error[0].msg,
      });
    }
    /* 檢查email是否已經註冊過 */
    let [members] = await connection.execute(
      'SELECT * FROM members WHERE email = ?',
      [req.body.email]
    );
    console.log('exist member', members);
    //如果資料庫裡已經存在member 表示已註冊過
    if (members.length > 0) {
      return res.status(400).json({
        code: 33002,
        msg: 'email已註冊',
      });
    }
    //雜湊密碼
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    //處理圖片路徑
    console.log('req.file (生成處理過的filename)', req.file);
    let filename = req.file ? '/public/uploads/' + req.file.filename : '';
    console.log('加上路徑的filename', filename);
    //儲存到資料庫
    let [result] = await connection.execute(
      'INSERT INTO members (email, password, name, photo) VALUES (?, ?, ?, ?)',
      [req.body.email, hashPassword, req.body.name, filename]
    );
    res.json({ message: 'ok' });
  }
);

router.post('/login', async (req, res, next) => {
  //確認帳號存在
  let [members] = await connection.execute(
    'SELECT * FROM members WHERE email = ?',
    [req.body.email]
  );
  console.log(members);
  if (members.length === 0) {
    return res.status(400).json({
      code: 33003,
      msg: '尚未註冊',
    });
  }
  //如果帳號存在 再比對密碼
  //把會員資料從陣列中拿出來
  let member = members[0];
  let result = await bcrypt.compare(req.body.password, member.password);
  if (!result) {
    return res.status(400).json({
      code: 33004,
      msg: '帳號或密碼錯誤',
    });
  }
  //如果密碼比對成功 記錄在session(或是發token 也可以是jwt 這邊是記錄在session)
  //把要寫入session的資料包成物件
  let returnMember = {
    id: member.id,
    name: member.name,
    photo: member.photo,
  };
  //真正寫入session
  req.session.member = returnMember;
  //把會員資料傳回給前端
  res.json({
    code: 0,
    data: returnMember,
  });
});

module.exports = router;
