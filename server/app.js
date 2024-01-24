//Подключаем модуль поддержки протокла HTTP
const http = require('http');
//http://group8/

//Подключаем модуль управления файлами
const fs = require('fs'); //file system

const server = http.createServer(function(request, response) {
    if(request.url === "http://group8/") {
        //Читаем содержимое файла
        fs.readFile(`${__dirname}index.html`, (err, content) => {

            if(!err) {
                //Устанавливаем заголовок документа
                response.setHeader('Content-Type', 'text/html');
                //response.setHeader('Title', 'Some title');

                //Установить контент
                response.write(content);
            }
            else {
                response.statusCode = 500;
                response.write('Some error 500');
                console.log(err);
            }
            
            response.end();
        });
    }
    else {
        response.write('Hi');
        response.end();
    }
});

server.listen(8082, '127.0.0.1', function() {
    console.log('Server start listen');
});