const sum = (n) => {
  arr = [];
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  for (i = 1; i <= n; i++) {
    arr.push(i);
  }
  let result = arr.reduce(reducer, 0);
  return result;
};

console.log(sum(1)); //1
console.log(sum(3)); //1+2+3=6
console.log(sum(5)); //1+2+3+4+5=15
console.log(sum(15)); //1+2+3+4+5+6+7+8+9+10+11+12+13+14+15=120
