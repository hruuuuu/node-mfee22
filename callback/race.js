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

let p1 = doWork('刷牙', 2000);
let p2 = doWork('吃早餐', 3000);
let p3 = doWork('寫功課', 2000);

//當三個中只要有一個做完 就會回傳
//race是比賽
Promise.race([p1, p2, p3]).then((values) => {
  console.log(values);
});
