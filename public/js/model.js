//import {DB} from '/db.js';

class Model
{
    params = {};
    id = Math.random(0,1000) * 1000; //автоматически создаваемый ключ

    constructor(params = {}) {
        this.params = {};
        this.id = this.id;

        for(let i in params) {
            this.params[i] = params[i];
        }
    }

    //Сохранение модели в базу данных
    send() {
        if(Object.keys(this.params).length === 0)
            return false;

        for(let i in this.params) {
            DB.setValue(i, this.params[i]);
        }
    }

    //Установка параметров, переопределение параметров
    set(params = {}) {
        for(let i in params) {
            this.params[i] = params[i];
        }
    }

    filter(obFilter = {}) {
        // if(obFilter.tableName) {
        //     DB.db.tableName(obFilter.tableName);
        // }

        // let ar = [
        //     {brandName: 'Mersedes', country: 'Germany'},
        //     {brandName: 'Opel', country: 'Germany'},
        //     {brandName: 'BMW', country: 'Germany'},
        //     {brandName: 'Lada', country: 'Russia'},
        // ]

        // ar.filter(item => {
        //     for(let i in obFilter) {
        //         return item === item[obFilter[i]];
        //     }
        // });
    }

}

// let brand = new Model({brandName: 'Mersedes'});
// brand.set({country: 'Germany'});
// brand.send();

// let idBrand = brand.filter({country: 'Germany'});

// let model = new Model();
// model.set({brand: idBrand, name: 'SLK'});