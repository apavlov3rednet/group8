import { MongoClient } from 'mongodb';

export default class MongoDB {
    static #DBNAME = "group8"; //имя базы
    static #LOCATION = "mongodb://localhost"; //127.0.0.1
    static #PORT = 27017; //порт
    static #LOGIN; //логин
    static #PSSWD; //пароль

    constructor(collectionName) {
        console.log('start DB connect');
        const url = [MongoDB.#LOCATION, MongoDB.#PORT].join(":") + '/'; //mongodb://localhost:12017

        this.client = new MongoClient(url);
        this.db = this.client.db(MongoDB.#DBNAME);
        this.collection = this.db.collection(collectionName);
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

    async setValue(props = {}) {
        let id = await this.collection.insertOne(props); //db.collectionName
        return id;
    }

    static removeValue(key) {
        if (confirm("Действительно удаляем?")) {
            this.collection.dropOne(key);
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

    async getValue(filter = {}, select = [], limit = false, pageCount = false) {
        let query = [];
        let options = {};

        if(select.length > 0) {
            let arSelect = {};
            for (let key of select) {
                arSelect[key] = 1;
            }
            query.push(arSelect); //request = [filter, arSelect]
        }

        if(limit)
            options.limit = limit;

        if(pageCount)
            options.skip = pageCount;

        return await this.collection.find(filter, { query, ...options } ).toArray();
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