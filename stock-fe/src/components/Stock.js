import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/config';

const Stock = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); //預設值不能放null 因為非陣列不能使用.map() 但空陣列[]是一個array

  useEffect(() => {
    //http://localhost:3002/api/stocks
    (async () => {
      //let response = await axios.get('http://localhost:3002/api/stocks');
      let response = await axios.get(`${API_URL}/stock`);
      setData(response.data);
    })();
  }, []); //[]裡面沒有變數 表示不會因為變數改變而重新渲染 就只會渲染一次

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>
      {data.map((stock) => {
        return (
          <div
            key={stock.id} //如果沒有給key react會全部重新渲染 會比較沒效率 如果有給key 就可以比對帶有key的DOM就好
            className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer"
          >
            <Link to={`/stock/${stock.id}`}>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {stock.id}
              </h2>
              <p className="text-gray-700">{stock.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Stock;
