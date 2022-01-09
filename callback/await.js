let doWork = function (job, timer) {
  return new Promise((resolve, reject) => {
    //executor
    setTimeout(() => {
      resolve(`完成工作 ${job}`); //在這邊會把promise物件狀態轉成fulfilled
      //如果發生錯誤
      //就會執行reject(err)
      //並把promise物件狀態轉成rejected
    }, timer);
  });
};
// await 必須放在async function裡
// async function main() {
//   let result1 = await doWork('刷牙', 2000);
//   let dt = new Date();
//   console.log(`${result1} at ${dt.toISOString()}`);
//   dt = new Date();
//   let result2 = await doWork('吃早餐', 3000);
//   console.log(`${result2} at ${dt.toISOString()}`);
//   dt = new Date();
//   let result3 = await doWork('寫功課', 2000);
//   console.log(`${result3} at ${dt.toISOString()}`);
// }
// main(); //<-寫完要記得呼叫 因為他不是立即執行函式 沒有呼叫他不會執行

//或是用IFEE 立即執行函式 寫法
(async () => {
  let dt = new Date();
  let result1 = await doWork('刷牙', 2000);
  console.log(`${result1} at ${dt.toISOString()}`);
  dt = new Date();
  let result2 = await doWork('吃早餐', 3000);
  console.log(`${result2} at ${dt.toISOString()}`);
  dt = new Date();
  let result3 = await doWork('寫功課', 2000);
  console.log(`${result3} at ${dt.toISOString()}`);
})();

/* IFEE 立即執行函式 定義完馬上就執行 沒有名字 只會用一次
(function(){
  ...
})();
(()=>{
  ...
})();
*/
