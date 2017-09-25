
let getRandomInt = function(max) {
  return Math.floor(Math.random()*max);
}

let div = function(a, b) {
  return b === 0 ? 0 : Math.floor(a/b);
}

module.exports = {
  getRandomInt,
  div
}