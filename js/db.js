class DB {
    static #DBNAME = "mongodb"; //имя базы
    static #LOCATION = "mongodb://localhost"; //127.0.0.1
    static #PORT = 27017; //порт
    static #LOGIN; //логин
    static #PSSWD; //пароль

    constructor() {}

    static initDb() {
        /*
        const MongoClient = require(DB.#DBNAME).MongoClient;
        const url = [DB.#LOCATION, DB.#PORT].join(":"); //mongodb://localhost:12017

        this.mongoClient = new MongoClient(url);
        this.client = this.mongoClient.connect();//login && pass
        this.db = client.db(DB.#DBNAME);
        */
    }

    static setValue(key, value) {
        //this.initDb();

        let lastElement = [key, value[value.length - 1].id];

        if (!value || value === "" || typeof value === undefined) {
            this.removeValue(key);
        }

        window.localStorage.setItem(key, JSON.stringify(value));

        if (key != "similar" && lastElement instanceof Array)
            DB.setSimilar(lastElement);
        //this.mongoClient.close();
    }

    static setSimilar(ar) {
        let curSimilar = DB.getValue("similar") || [];

        curSimilar.push(ar);

        DB.setValue("similar", curSimilar);
    }

    static removeValue(key) {
        if (confirm("Действительно удаляем?")) {
            //this.initDb();

            window.localStorage.removeItem(key);

            //this.mongoClient.close();
        }
    }

    static getCount(key) {
        let values = DB.getValue(key);
        if (values instanceof Array) return values.length;

        return 0;
    }

    static getSimData(id) {
        let similar = DB.getValue("similar"),
            findElement = similar.filter((item) => {
                
            });

        console.log(findElement);

        return id;
    }

    static getValue(key) {
        //this.initDb();

        let value = window.localStorage.getItem(key);

        if (this.isJson(value)) {
            //this.mongoClient.close();
            return JSON.parse(value);
        }

        //this.mongoClient.close();
        return value;
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
