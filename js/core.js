(function() {
    let r = new Routing();
    let view = new View();
    console.log(r);

    //Объекты разметки
    let obOwnerForm = document.getElementById('formOwner');
    let obCarForm = document.getElementById('formCar');
    let obBrandForm = document.getElementById('formBrand');
    let obModelForm = document.getElementById('formModel');
    let menu = document.body.querySelectorAll('menu li');

    //Селекты
    // let selectOwner = obCarForm.querySelector('#owner');
    // let selectBrands = obCarForm.querySelector('#brand');
    // let selectModelBrands = obModelForm.querySelector('[name=BRAND]');
    // let selectModel = obCarForm.querySelector('#model');

    //База данных
    let arOwner = DB.getValue('owners') || []; //массив базы даных
    let arBrands = DB.getValue('brands') || [];
    let arModel = DB.getValue('models') || [];

    //Метод обновления содержимого селекта владелец
    function updateOwnerList(select, arr, title = 'Выберите') {
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

    function bindEvents(obForm, ar, db, callback = []) {
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
                updateOwnerList(item, ar);
            });
        });
    }

    // selectBrands.addEventListener('change', function(event) {
    //     event.preventDefault();

    //     let value = selectBrands.value;

    //     if(arModel.length > 0) {
    //         let newAr = arModel.filter(item => item.params.BRAND === value);
    //         updateOwnerList(selectModel, newAr);
    //     }
    // });

    r.tree(menu);
    menu.forEach((item, index) => {
        item.addEventListener('click', function() {
            r.getContent(index, {
                routes: r.arRoute,
                callback: view
            });
        });
    });



    //Навешивание событий на формы
    //bindEvents(obOwnerForm, arOwner, 'owners', [selectOwner]);
    // bindEvents(obBrandForm, arBrands, 'brands', [selectBrands, selectModelBrands]);
    //bindEvents(obModelForm, arModel, 'models', [selectModel]);

    //Вызываем обновление селекта
    //updateOwnerList(selectOwner, arOwner, 'Выберите владельца');
    //updateOwnerList(selectBrands, arBrands);
   // updateOwnerList(selectModelBrands, arBrands);
   // updateOwnerList(selectModel, arModel);


})(window);