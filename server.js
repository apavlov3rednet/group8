import express from 'express';
import morgan from 'morgan';
import Fetch from './back/modules/Fetch/index.js';
import schema from './back/modules/Fetch/schema/index.js';
import { ObjectId } from 'mongodb';
import config from './back/params/config.js';

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

//app.use(morgan(':method :url :res[content-lenght] - :response-time ms'));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.urlencoded({extended: true}));

//GET requests
app.get('/api/:CollectionName/', async (req, res) => {

    console.log('true', req.params.CollectionName);
    let mdb = new Fetch.MongoDB(req.params.CollectionName.toLowerCase());
    let options = {};

    if(req.query) {
        options.filter = {};

        if(req.query.id) {
            options.filter._id = new ObjectId(req.query.id);
        }

        if(req.query.q) {
            options.search = req.query.q;
        }

        if(req.query.min || req.query.max) {
            options.sort = {};
            options.sort.min = req.query.min ? req.query.min : 0;
            options.sort.max = req.query.max ? req.query.max : 900000000000;
        }

        if(req.query.sort && req.query.order) {
            options.sort = {};
            options.sort.field = req.query.sort;
            options.sort.order = req.query.order;
        }

        if(req.query.filter === 'Y') {
            for(let i in req.query) {
                options.filter[i] = req.query[i];
            }
        }
    }

    let result = await mdb.getValue(options);

    res.end(JSON.stringify(result));
});

app.get('/api/collections/get/', async (req, res) => {
    let mdb = new Fetch.MongoDB();
    await mdb.getCollectionsStats().then(result => {
        res.end(JSON.stringify(result));
    });
});

//DELETE methods
app.get('/api/:CollectionName/:id/', async (req, res) => {
    let mdb = new Fetch.MongoDB(req.params.CollectionName.toLowerCase());
    mdb.removeValue(req.params.id);
    res.end('deleted');
}); //app.delete

app.get('/api/schema/get/:Schema/', async (req, res) => {
    let obSchema = await schema[req.params.Schema.toLowerCase()];
    res.end(JSON.stringify(obSchema));
});

//POST methods
app.post('/api/:CollectionName/', async (req, res) => {
    const collectionName = req.params.CollectionName.toLowerCase();
    const mdb = new Fetch.MongoDB(collectionName);
    const result = await mdb.setValue(req.body);

    if(result.acknowledged) {
        let newUrl = config.fullClient + collectionName + "?id=" + String(result.insertedId);
        res.redirect(newUrl);
    }
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