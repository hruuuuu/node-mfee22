let doWork = function (job, timer, callback) {
  setTimeout(() => {
    callback(null, `完成工作 ${job}`);
  }, timer);
};
let dt = new Date();
console.log(`start ${dt.toISOString()}`);

//這樣寫 三項其實是同步進行(x)
doWork('刷牙', 2000, (err, result) => {
  let dt = new Date();
  console.log(`${result} at ${dt.toISOString()}`);
});
doWork('吃早餐', 3000, (err, result) => {
  let dt = new Date();
  console.log(`${result} at ${dt.toISOString()}`);
});
doWork('寫功課', 2000, (err, result) => {
  let dt = new Date();
  console.log(`${result} at ${dt.toISOString()}`);
});

//正確寫法 但容易變成callback hell
doWork('刷牙', 2000, (err, result) => {
  let dt = new Date();
  console.log(`${result} at ${dt.toISOString()}`);
  doWork('吃早餐', 3000, (err, result) => {
    let dt = new Date();
    console.log(`${result} at ${dt.toISOString()}`);
    doWork('寫功課', 2000, (err, result) => {
      let dt = new Date();
      console.log(`${result} at ${dt.toISOString()}`);
    });
  });
});
