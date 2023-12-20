(function() {
    let r = new Routing();
    let view = new View();

    //Объекты разметки
    let menu = document.body.querySelectorAll('menu li');

    r.tree(menu);

    //Обработка клика по пунктам меню
    menu.forEach((item, index) => {
        item.addEventListener('click', function() {
            r.getContent(index, View.setContent); //Запрос контента и вызов вьювера через коллбек функцию
        });
    });

})(window);