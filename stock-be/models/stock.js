//用來處理stock裡有關資料庫的部分
const connection = require('../utils/db');

const getAll = async (req, res, next) => {
  let [data, fields] = await connection.execute('SELECT * FROM stocks');
  res.json(result[0]);
  return data;
};

module.exports = { getAll };
