//Подключаем модуль поддержки протокла HTTP
const http = require('http');
//Подключаем модуль управления файлами
const fs = require('fs'); //file system
const path = require('path');
const express = require('express');

const PORT = 8082;

const server = http.createServer(function(req, res) {
    console.log('Server request');
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');
    res.write('<meta charset="UTF-8">');

    //res.write('<link rel="stylesheet" href="style.css">');
    //res.write('<h1>Test</h1>');
    //res.setHeader('Content-Type', 'application/json');

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.tmpl`);

    let basePath = '';

    switch(req.url) {
        case '/':
            basePath = 'index.html';
        break;

        // case '/index.html':
        //     res.setHeader('Location', '/');
        //     res.statusCode = 301; //Контролируемый редирект
            
        // break;

        case '/brands':
            basePath = createPath('brands');
        break;

        case '/models':
            basePath = createPath('models');
        break;

        case '/objects':
            basePath = createPath('objects');
        break;

        case '/owners':
            basePath = createPath('owners');
        break;

        case '/services':
            basePath = createPath('services');
        break;

        default: 

        break;
    }

    // if(req.url != '/') {
    //     let exp = '/^([a-z]+)$';
    //     let page = req.url.match(exp);
    //     console.log(page); 
    // }

    // const app = express();

    // app.use(express.static('public'));

    // app.use(req.url, function(_, res) {
    //     console.log(_, res);
    // });

    if(basePath != '') {
        fs.readFile(basePath, (err, data) => {
            if(err) {
                console.log(err);
                res.end();
            }
            else {
                res.write(data);
                res.end();
            }
        });
    }
    else {
        res.end();
    }
});

// const app = express();

// app.use(express.static('/public'));

// app.listen(PORT);

server.listen(PORT, 'localhost', function() {
    console.log('Server start listen');
});