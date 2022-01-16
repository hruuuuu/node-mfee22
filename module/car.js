//第一種寫法
let color = 'blue';
function setName(firstName, lastName) {
  name = `${firstName} ${lastName}`;
}
function showName(newName) {
  console.log(`hello car1, ${name}`);
}
module.exports = { setName, showName, color };
