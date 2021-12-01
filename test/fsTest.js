const fs = require('fs');

console.log(fs.readdir('./', (err, files) => {
    if (err) console.error(err)
    else console.log(files)
}));