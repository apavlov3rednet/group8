class DB {
    static #DBNAME = "group8"; //имя базы
    static #LOCATION = "mongodb://localhost"; //127.0.0.1
    static #PORT = 27017; //порт
    static #LOGIN; //логин
    static #PSSWD; //пароль

    constructor() {}

    static initDb() {
        const MongoClient = require(DB.#DBNAME).MongoClient;
        const url = [DB.#LOCATION, DB.#PORT].join(":"); //mongodb://localhost:12017

        this.mongoClient = new MongoClient(url);
        this.client = this.mongoClient.connect();//login && pass
        this.db = client.db(DB.#DBNAME);
    }

    static issetCollection(collectionName) {
        this.initDb();
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
        this.initDb();

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
        this.initDb();
        let result = 0;
        if(collectionName != "") {
            result = this.db[collectionName].count();
        }
        this.mongoClient.close();
        return result;
    }

    static getValue(collectionName, filter = {}, select = [], limit = false, pageCount = false) {
        let ob = null;
        this.initDb();

        if(collectionName == "") {
            this.mongoClient.close();
            return false;
        }

        let collection = this.db.getCollection(collectionName);
        let request = [filter];

        if(select.length > 0) {
            let arSelect = {};
            for (let key of select) {
                arSelect[key] = 1;
            }
            request.push(arSelect); //request = [filter, arSelect]
        }

        ob = collection.find(...request).limit(limit).skip(pageCount);

        this.mongoClient.close();
        return ob;
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
