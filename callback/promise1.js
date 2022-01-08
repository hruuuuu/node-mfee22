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

let dt = new Date();
console.log(`Start at ${dt.toISOString()}`);

doWork('刷牙', 2000)
  .then((result) => {
    let dt = new Date();
    console.log(`${result} at ${dt.toISOString()}`);
    return doWork('吃早餐', 3000);
  })
  .then((result) => {
    let dt = new Date();
    console.log(`${result} at ${dt.toISOString()}`);
    return doWork('寫功課', 2000);
  })
  .then((result) => {
    let dt = new Date();
    console.log(`${result} at ${dt.toISOString()}`);
  })
  .catch((err) => {
    //處理錯誤 會抓到前面promise發生的錯誤
    console.log(err);
  });
