function sumFor(n) {
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
}

function sumFormula(n) {
  let result = ((1 + n) * n) / 2;
  return result;
}

const sumReducer = (n) => {
  arr = [];
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  for (i = 1; i <= n; i++) {
    arr.push(i);
  }
  let result = arr.reduce(reducer, 0);
  return result;
};

function sumRecursive(n) {
  if (n < 1) {
    return 0;
  }
  return n + sumRecursive(n - 1);
}

console.time('for');
for (let i = 1; i <= 10000; i++) {
  //sumFor(100000); //=> 958.962ms
  sumFor(100); //=> 11.428ms
}
console.timeEnd('for');

console.time('formula');
for (let i = 1; i <= 10000; i++) {
  //sumFormula(100000); //=> 0.424ms
  sumFormula(100); //=> 0.326ms
}
console.timeEnd('formula');

console.time('reducer');
for (let i = 1; i <= 10000; i++) {
  //sumReducer(100000); //=> 7.196s
  sumReducer(100); //=> 8.495ms
}
console.timeEnd('reducer');

console.time('recursive');
for (let i = 1; i <= 10000; i++) {
  //sumRecursive(100000); //=> maximum call stack size exceeded
  sumRecursive(100); //=> 10.105ms
}
console.timeEnd('recursive');
