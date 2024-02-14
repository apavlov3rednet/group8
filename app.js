const express = require('express');
const path = require('path');
const morgan = require('morgan');
const MongoDB = require('./server/mongodb');
const { ObjectId } = require('mongodb');

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

// app.use((req,res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Method', 'GET');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requestes-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     //next();
// });

app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

//GET requests
app.get('/', (req, res) => {
    const title = 'Home';
    res.sendFile('./public/index.html', {title});
});

app.get('/index.html', (req, res) => {
    res.statusCode = 301;
    res.redirect('/');
});

app.get('/:page/', async (req, res) => {
    const title = req.params.page;
    let list = await db.getValue(req.params.page, {}, ['_id', 'TITLE']);
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

    console.log(model, data);

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

    console.log(pushData)


    res.sendFile(createPath(req.params.page));

    // let id = await db.setValue(req.params.page, data);

    // if(id.insertedId instanceof ObjectId) {
    //     res.redirect(req.baseUrl + '?success=Y');
    // }
    // else {
    //     res.redirect(req.baseUrl + '?success=N');
    // }
  
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