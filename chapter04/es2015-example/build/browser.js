'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * npm init -y
 * npm i -S -D babel-cli babel-preset-es2015
 * echo '{"presents": ["es2015"]}' > .babelrc 
*/
var Example = function () {
    function Example() {
        _classCallCheck(this, Example);
    }

    _createClass(Example, [{
        key: 'render',
        value: function render() {
            return '<h1>Example</h1>';
        }
    }]);

    return Example;
}();

var example = new Example();
console.log(example.render());