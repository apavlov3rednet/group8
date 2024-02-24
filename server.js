import express from 'express';
import morgan from 'morgan';
import Fetch from './back/modules/Fetch/index.js';

// const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 8000;
// const client = new MongoClient('mongodb://localhost:27017');

// client.connect().then(mongoClient => {
//     console.log('DB Connect');
//     console.log(mongoClient.options.dbName);
//     const db = mongoClient.db('group8');
//     const collection = db.collection('brands');
//     console.log(collection);
// });

// let count = db.getCountElements('brands');
// console.log(count);

// const createPath = (page, dir = 'views', ext = 'html') => {
//     return resolve(__dirname, dir, `${page}.${ext}`);
// };

app.use(morgan(':method :url :res[content-lenght] - :response-time ms'));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Необходимо для работы как клиент-сервер
// app.set('views', 'views');
// app.use(express.urlencoded({extended: true}));
// app.use(express.static('public'));

//GET requests
app.get('/api/getList:CollectionName/', async (req, res) => {
    let result = {},
        mdb = new Fetch.MongoDB(req.params.CollectionName.toLowerCase()),
        filter = {},
        select = [],
        limit = req.query.limit ? req.query.limit : false,
        skip = req.query.skip ? req.query.skip : false;

    result = await mdb.getValue(filter, select, limit, skip);

    res.end(JSON.stringify(result));
});

app.get('/:page', async (req, res) => {
    res.end();
});

app.post('/api/setValue:CollectionName/', async (req, res) => {
    const collectionName = req.params.CollectionName.toLowerCase();
    const mdb = new Fetch.MongoDB(collectionName);
    const Controll = new Fetch.Controll(collectionName);
    const result = await mdb.setValue(Controll.preparePost(req.query));

    res.end();
});


/*
app.get('/index.html', (req, res) => {
    res.statusCode = 301;
    res.redirect('/');
});

app.get('/:page/', async (req, res) => {
    const title = req.params.page;
    let list = await db.getValue(req.params.page, {}, ['_id', 'TITLE']);
    console.log(list);
    res.sendFile(createPath(req.params.page), {title});
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
app.post('/:page/', async (req, res) => {
    const data = req.body;
    const model = require('./server/models/'+req.params.page);
    
    let pushData = {};

    for(let index in data) {
        let val = data[index];
        let schema = model[index];

        if(schema.validate) {
            switch(schema.type) {
                case 'string':
                    if(val instanceof String) {
                        pushData[index] = val;
                    }
                break;
    
                case 'number':
                    if(val instanceof Number) {
                        pushData[index] = val;
                    }
                break;
            }
        }
        else {
            pushData[index] = val;
        }
    }
    res.sendFile(createPath(req.params.page));  
});
*/
//Обработка ошибки обращения к серверу
//Всегда должен быть последним
app.use((req, res) => {
    res
    .status(404)
    .end('Error');
});

app.listen(PORT, (error) => {
    (error) ? console.log(error) : console.log('Server start on port ' + PORT);
});