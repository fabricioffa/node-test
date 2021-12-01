const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello, stranger');
        res.end();
    }
    
    if(req.url === '/list/numbers') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end();
    }
});

server.listen(3000);

console.log('Server listening in port 3000...');