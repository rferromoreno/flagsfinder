var BoardModule = (function () {

  var _board = Array(9).fill('').map(() => Array(9).fill(''));
  var _flagsCount = 10;

  var _privateMethod = function () {
    // private stuff
    return _board;
  };

  var publicMethod = function () {
    _privateMethod();
  };

  var _shuffle = function() {
    // inicializar el array con flags en posiciones random.
    // rellenar el array en el resto de las posiciones de acuerdo a sus adyacentes.
  }

  return {
    publicMethod: publicMethod
  };

})();

module.exports = BoardModule;