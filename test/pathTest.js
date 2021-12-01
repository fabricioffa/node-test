const path = require('path');

console.log(path.resolve(__dirname, './test')) 
// c:\Users\alves\Documents\Projects\Node\test

console.log(path.sep)
// \

console.log(path.parse('./main.js'))
// { root: '', dir: '.', base: 'main.js', ext: '.js', name: 'main' }

console.log(path.parse(__filename))
// {
//  root: 'c:\\',
//  dir: 'c:\\Users\\alves\\Documents\\Projects\\Node',
//  base: 'main.js',
//  ext: '.js',
//  name: 'main'
// }

console.log(path.normalize('\\Users\\alves\\Documents\\Projects\\Node'))
// \Users\alves\Documents\Projects\Node

// 
console.log(path.join('\\Users\\alves', '..', 'Documents', 'Projects\\Node'))
// \Users\Documents\Projects\Node

console.log(path.isAbsolute(__filename))
// true
