(function() {
    //Объекты разметки
    let obOwnerForm = document.getElementById('formOwner');
    let obCarForm = document.getElementById('formCar');

    let arOwner = DB.getValue('owners') || []; //массив базы даных

    //Метод обновления содержимого селекта владелец
    function updateOwnerList() {
        let selectOwner = obCarForm.querySelector('#owner');
        let childrens = [];

        selectOwner.innerHTML = '';

        //Дефолтная позиция
        childrens.push(DOM.create('option', {
            attrs: { value: 0},
            text: 'Выбери'
        }));

        //Собираем список валдельцев в потомки селекта
        arOwner.forEach(item => {
            childrens.push(DOM.create('option', {
                attrs: { value: item.id },
                text: item.params.LAST_NAME + ' ' + item.params.NAME
            }));
        });

        //Обновляем селект
        DOM.adjust(selectOwner, {
            children: childrens
        });
    }

    //Обрабатываем отправку формы
    obOwnerForm.addEventListener('submit', function(event) {
        event.preventDefault(); //Отменяем штатное поведение события

        let arFields = obOwnerForm.querySelectorAll('input');

        //Создаем модель формы
        let owner = new Model();

        arFields.forEach(item => {
            let params = {};
            params[item.name] = item.value;
            owner.set(params);
        });

        arOwner.push(owner);

        //Добавляем в базу данных
        DB.setValue('owners', arOwner);

        //Вызываем обновление селекта
        updateOwnerList();
    });

     //Вызываем обновление селекта
    updateOwnerList();

})(window);