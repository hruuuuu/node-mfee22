let car1 = require('./car');
//部分引用
let { showName, setName, color } = require('./car2');
car1.setName('Happy', 'Car');
car1.showName();
console.log(car1.color);
//car1.color = 'orange';
setName('Sad', 'Car');
showName();
console.log(color);
