class View {
    constructor() {
        this.obContent = document.getElementById('content');
    }

    setContent(content) {
        this.obContent.innerHTML = content;

        let obForm = this.obContent.querySelector('form');
        if(obForm) {
            let arName = obForm.dataset.base;
            let db = DB.getValue(arName) || [];
    
    
            this.bindEvents(obForm, db, arName);
            this.updateList();
        }
        
    }

    bindEvents(obForm, ar, db, callback = []) {
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

            callback.forEach(item => {
                _this.updateList(item, ar);
            });
        });
    }

    updateList(select, arr, title = 'Выберите') {
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