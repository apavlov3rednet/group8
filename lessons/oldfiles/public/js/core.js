(function() {
    let r = new Routing();
    let view = new View();
    let db = localStorage;
    //Объекты разметки
    let menu = document.body.querySelectorAll('menu li');
    let content = document.getElementById('content');

    r.tree(menu);

    //Обработка клика по пунктам меню
    menu.forEach((item, index) => {
        item.addEventListener('click', function() {
            r.getContent(index, View.setContent); //Запрос контента и вызов вьювера через коллбек функцию
        });
    });

    //Загрузка по умолчанию
    let arHead = ['Название таблицы', 'Количество записей'];
    let arBody = [];

    for(let i in db) {
        let count  = DB.getCount(i);

        if(count > 0)
            arBody.push([i, count]);
    }

    let table = Table.generate(arHead, arBody, [], {
        className: 'simple-table'
    });

    content.append(table);

})(window);