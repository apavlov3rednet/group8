const express = require('express');
const path = require('path');
const morgan = require('morgan');
const MongoDB = require('./server/mongodb');

// const MongoClient = require('mongodb').MongoClient;

const app = express();

const PORT = 8085;
// const client = new MongoClient('mongodb://localhost:27017');

// client.connect().then(mongoClient => {
//     console.log('DB Connect');
//     console.log(mongoClient.options.dbName);
//     const db = mongoClient.db('group8');
//     const collection = db.collection('brands');
//     console.log(collection);
// });

const db = new MongoDB;
db.Init();

// let count = db.getCountElements('brands');
// console.log(count);

const createPath = (page, dir = 'views', ext = 'html') => {
    return path.resolve(__dirname, dir, `${page}.${ext}`);
};

app.use(morgan(':method :url :res[content-lenght] - :response-time ms'));

app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

//GET requests
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

    let list = db.getValue(req.params.page, {}, ['_id', 'TITLE']);
    console.log(list);
});

app.get('/views/:page.html', (req, res) => {
    const title = req.params.page;
    res.sendFile(createPath(req.params.page), {title});
});

app.get('/:page/:name/', (req, res) => {
    const title = req.params.page;
    res.sendFile(createPath(req.params.page), {title});
});

//POST requests
app.post('/:page/', (req, res) => {
    const title = req.params.page;
    const data = req.body;

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