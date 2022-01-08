let doWork = function (job, timer, callback) {
  setTimeout(() => {
    callback(null, `完成工作 ${job}`);
  }, timer);
};
let dt = new Date();
console.log(`start ${dt.toISOString()}`);
doWork('刷牙', 2000, (err, result) => {
  let dt = new Date();
  console.log(`${result} at ${dt.toISOString()}`);
});
doWork('吃早餐', 5000, (err, result) => {
  let dt = new Date();
  console.log(`${result} at ${dt.toISOString()}`);
});
doWork('寫功課', 7000, (err, result) => {
  let dt = new Date();
  console.log(`${result} at ${dt.toISOString()}`);
});
