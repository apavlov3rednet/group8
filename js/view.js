class View {
    /**
     * Установка полученного контента, Визуализация
     * @param {*} content 
     */
    static setContent(content) {
        let obContent = document.getElementById('content');
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
    
            View.bindEvents(obForm, db, dbName);

            //Обновление селектов если они есть на форме
            arSelect.forEach(select => {
                let dbSelectName = select.getAttribute('name').toLowerCase() + 's'; //получение имени базы данных для селекта

                let dbSelect = DB.getValue(dbSelectName) || []; //получение базы данных

                console.log(dbSelect)
                View.updateList(select, dbSelect);
            });
        }
        
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
                item.value = '';
            });

            ar.push(model);

            //Добавляем в базу данных
            DB.setValue(db, ar);
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
            children: childrens
        });
    }
}