const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

const PORT = 8085;

const createPath = (page, dir = 'views', ext = 'html') => {
    return path.resolve(__dirname, dir, `${page}.${ext}`);
};

app.use(morgan(':method :url :res[content-lenght] - :response-time ms'));

app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.sendFile(createPath('index'), {title});
});

app.get('/index.html', (req, res) => {
    res.statusCode = 301;
    res.redirect('/');
});

app.get('/:page/', (req, res) => {
    const title = req.params.page;
    res.sendFile(createPath(req.params.page), {title});
});

app.get('/:page/:name/', (req, res) => {
    console.log(req.params.name);
    const title = req.params.page;
    res.sendFile(createPath(req.params.page), {title});
});

//Обработка ошибки обращения к серверу
//Всегда должен быть последним
app.use((req, res) => {
    res
    .status(404)
    .sendFile(createPath('404'))
});

app.listen(PORT, (error) => {
    (error) ? console.log(error) : console.log('Server start');
});