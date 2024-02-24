class View {
    /**
     * Установка полученного контента, Визуализация
     * @param {*} content 
     */
    static setContent(content) {
        let obContent = document.getElementById('form');
        let title = content.title;
        
        obContent.innerHTML = content.answer;

        let obForm = obContent.querySelector('form');
        let h1 = document.querySelector('h1');
        let obTitle = document.querySelector('title');

        h1.innerHTML = title;
        obTitle.innerHTML = title;

        if(obForm) {
            let dbName = obForm.dataset.base;
            let db = DB.getValue(dbName) || [];

            let arSelect = obForm.querySelectorAll('select');

            let arCountInput = obForm.querySelectorAll('[name=PRICE], [name=COUNT], [name=TOTAL_PRICE]');

            if(arCountInput.length === 3) {
                View.updateTotalCount(arCountInput);
            }
    
            View.bindEvents(obForm, db, dbName);
            View.setTable(dbName);

            //Обновление селектов если они есть на форме
            arSelect.forEach(select => {
                let dbSelectName = select.getAttribute('name').toLowerCase() + 's'; //получение имени базы данных для селекта

                let dbSelect = DB.getValue(dbSelectName) || []; //получение базы данных

                View.updateList(select, dbSelect);
            });
        }
        
    }

    static setTable(baseName) {
        let dbValues = DB.getValue(baseName) || [];
        let data = [];
        let arHead = [];
        let obContent = document.getElementById('content');

        if(dbValues instanceof Array) {
            dbValues.forEach((item, index) => {
                let row = [];
                row.push(item.id);

                if(index === 0)
                    arHead.push('ID');

                for (let i in item.params) {
                    row.push(item.params[i]);

                    if(index === 0)
                        arHead.push(Loc.getMessage(i));
                }

                data.push(row);
            });
        }

        let table = Table.generate(arHead, data, [], {
            className: 'simple-table'
        });

        obContent.innerHTML = '';

        DOM.adjust(obContent, {
            children: [table]
        })
    }

    static bindEvents(obForm, ar, db, callback) {
        let _this = this;
        obForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let arFields = obForm.querySelectorAll('input, select');

            let model = new Model();

            arFields.forEach(item => {
                let params = {};
                params[item.name] = item.value;
                model.set(params);
                
                switch(item.tagName) {
                    case "INPUT":
                        item.value = '';
                    break;

                    case "SELECT":
                        item.value = 0;
                    break;
                }
            });

            ar.push(model);

            //Добавляем в базу данных
            DB.setValue(db, ar);
            View.setTable(db);
        });
    }

    static updateList(select, arr, title = 'Выберите') {
        let childrens = [];

        select.innerHTML = '';

        //Дефолтная позиция
        childrens.push(DOM.create('option', {
            attrs: { value: 0},
            text: title
        }));

        //Собираем список валдельцев в потомки селекта
        arr.forEach(item => {
            childrens.push(DOM.create('option', {
                attrs: { value: item.id },
                text: Object.values(item.params).join(' ') //Объединение всех значений через пробел
            }));
        });

        //Обновляем селект
        DOM.adjust(select, {
            children: childrens,
            events: {
                //Перевязка связанного поля по имени основного поля
                change: function(events) {
                    if(select.dataset.rel) {
                        let id = select.value; //Значение основного поля
                        let relationSelect = document.getElementById(select.dataset.rel); //Объект связанного селекта
                        let db = relationSelect.getAttribute('name').toLowerCase() + 's'; //Имя базы данных связанного селекта
                        let arDb = DB.getValue(db).filter(item => item.params[select.getAttribute('name')] === id) || []; //Получаем данные по фильтру для связанного селекта
            
                        View.updateList(relationSelect, arDb); //Обновляем связанный селект
                    }
                }
            }
        });
    }

    static updateTotalCount(arFields = []) {
        arFields.forEach(item => {
            if(item.getAttribute('name') == 'PRICE' || item.getAttribute('name') == 'COUNT') {
                item.addEventListener('change', function() {
                    let totalPrice = document.querySelector('[name=PRICE]').value * document.querySelector('[name=COUNT]').value;

                    document.querySelector('[name=TOTAL_PRICE]').value = totalPrice;
                });
            }
        });
    }
}