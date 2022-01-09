function test() {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}
console.log(4);
test();
console.log(5); //要把主程式跑完 stack才會空 event loop才會去把2搬到主程式來做
//原本：4->1->3->5->2

function test() {
  console.log(1);
  new Promise((resolve, reject) => {
    //包一個promise並沒有改變機制
    setTimeout(() => {
      console.log(2);
    }, 0);
  });
  console.log(3);
}
console.log(4);
test();
console.log(5);
//promose: 4->1->3->5->2

async function test() {
  console.log(1);
  await new Promise((resolve, reject) => {
    //在await會暫停卡住
    setTimeout(() => {
      console.log(2);
    }, 0);
  });
  console.log(3); //所以3會等2做完才做
}
console.log(4);
test();
console.log(5);
//await: 4->1->5->2->3
