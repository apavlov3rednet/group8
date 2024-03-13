import { ObjectId } from "mongodb";
import schema from "../schema/index.js";
import MongoDB from "./MongoDB.js";
import Fetch from "../index.js";

export default class Controll {

    constructor(collectionName = '') {
        if(collectionName == '')
            return;

        this.schema = schema[collectionName];
    }

    preparePost(query = {}) {
        let data = {};

        //Если есть данный атрибут, то это будет сигналом для обновления, если нет - для добавления
        if(query._id.length > 0) {
            data._id = new ObjectId(query._id);
        }

        if(Object.keys(query).length > 0 && Object.keys(this.schema).length > 0) {
            for (let i in this.schema) {
                if(i === '_id') continue;

                let checkElement = query[i];
                let checkSchema = this.schema[i];

                if(checkElement != '') {
                    switch(checkSchema.type) {
                        case 'Number':
                            data[i] = parseFloat(checkElement);
                        break;

                        case 'String':
                            data[i] = String(checkElement);
                        break;
                    }
                }
                else {
                    data[i] = checkSchema.default;
                }
            }
        }

        return data;
    }

    static prepareData(data = [], schema = {}) {
        let result = [];

        if(data instanceof Array && Object.keys(schema).length > 0) {
            data.forEach(item => {
                let newRow = {};

                for(let fieldName in schema) {
                    let fieldSchema = schema[fieldName];
                    let newData = (item[fieldName]) ? item[fieldName] : fieldSchema.default;
                    if(fieldSchema.type != 'DBRef') {
                        newRow[fieldName] = newData;
                    }
                    else {
                        async function getSim() {
                            let mdb = new Fetch.MongoDB('brands');
                            console.log(Object(item[fieldName]));
                            console.log(item[fieldName].$ref);
                            const result = await mdb.getOne({_id: item[fieldName].$id}, []);
                            console.log(result);
                        }
                        
                        getSim();
                    }
                }
                result.push(newRow);
            });
        }

        return result;
    }
}