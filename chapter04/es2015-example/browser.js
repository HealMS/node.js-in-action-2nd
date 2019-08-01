/** 
 * npm init -y
 * npm i -S -D babel-cli babel-preset-es2015
 * echo '{"presents": ["es2015"]}' > .babelrc 
*/
class Example {
    render() {
        return '<h1>Example</h1>';
    }
}

const example = new Example();
console.log(example.render());