const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);

    switch (req.url) {
        case '/': {
            fs.createReadStream('./index.html').pipe(res);
            break;
        }

        case '/index.js': {
            fs.createReadStream('./index.js').pipe(res);
            break;
        }

        case '/data': {
            const data = fs.readFileSync('./data.json', 'utf-8');
            res.write(data);
            res.end();
            break;
        }

        default: {
            if (req.url.startsWith('/data')) {
                const callbackName = req.url.replace('/data?callback=', '');
                const data = fs.readFileSync('./data.json', 'utf-8');
                res.write(`${callbackName}(${data})`);
                res.end();
            } else {
                res.statusCode = 404;
                res.write('<h1>Not found</h1>');
                res.end();
            }
        }
    }
});

server.listen(3000, function () {
    console.log('http://localhost:3000');
});