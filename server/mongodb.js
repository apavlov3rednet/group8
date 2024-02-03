const MongoClient = require('mongodb').MongoClient;

class MongoDB {
    static #DBNAME = "group8"; //имя базы
    static #LOCATION = "mongodb://localhost"; //127.0.0.1
    static #PORT = 27017; //порт
    static #LOGIN; //логин
    static #PSSWD; //пароль

    constructor() {}

    Init() {
        console.log('start DB connect');
        const url = [MongoDB.#LOCATION, MongoDB.#PORT].join(":") + '/'; //mongodb://localhost:12017

        this.client = new MongoClient(url);
        this.db = this.client.db(MongoDB.#DBNAME);
        console.log('DB connect');
    }

    async getCountElements(collectionName) {
        try {
            if(collectionName != '') {
                const collection = this.db.collection(collectionName);
                const count = await collection.countDocuments();
                console.log(count);
                return count;
            }
            else {
                return 0;
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    static issetCollection(collectionName) {
        this.Init();
        let result = false;
        if(collectionName != "") {
            result = (this.db[collectionName]);
        }
        this.mongoClient.close();
        return result;
    }
    
    static createCollection(collectionName) {
        if(collectionName === "")
            return false;

        let isset = this.issetCollection(collectionName);
        if(!isset) {
            this.initDb();
            let collection = this.db.createCollection(collectionName);
            this.mongoClient.close();
            return collection; // {ok : 1}
        }

        return false;
    }

    static setValue(collectionName, props = {}) {
        let id = 0;
        this.Init();

        if(collectionName === '' || Object.keys(props).length == 0) {
            this.mongoClient.close();
            return false;
        }

        id = this.db[collectionName].insertOne(props); //db.collectionName
        this.mongoClient.close();
        return id;
    }

    static removeValue(key) {
        if (confirm("Действительно удаляем?")) {
            //this.initDb();

            window.localStorage.removeItem(key);

            //this.mongoClient.close();
        }
    }

    static getCount(collectionName) {
        this.Init();
        let result = 0;
        if(collectionName != "") {
            result = this.db[collectionName].count();
        }
        this.mongoClient.close();
        return result;
    }

    async getValue(collectionName, filter = {}, select = [], limit = false, pageCount = false) {
        if(collectionName == "") {
            this.mongoClient.close();
            return false;
        }

        let collection = this.db.collection(collectionName);
        let request = [filter];

        if(select.length > 0) {
            let arSelect = {};
            for (let key of select) {
                arSelect[key] = 1;
            }
            request.push(arSelect); //request = [filter, arSelect]
        }

        return await collection.find(...request).toArray();//.limit(limit).skip(pageCount);
    }

    static isJson(value) {
        try {
            JSON.parse(value);
        } catch (error) {
            return false;
        }

        return true;
    }
}

module.exports = MongoDB;