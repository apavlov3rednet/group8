'use strict';

//хелпер с логированием
var promiseCount = 0;
var thisPromiseCount = 0;
function testP() {
    thisPromiseCount = ++promiseCount;
    var log = document.getElementById('log');

    log.insertAdjacentHTML('beforeend', thisPromiseCount + ' Запуск асинхронного кода');
}

//Конструктор обещаний
var p1 = new Promise((resolve, reject) => {
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ' старт асинхронного кода');

    window.setTimeout(function() {
        resolve(thisPromiseCount); //Положительный ответ
    }, Math.random() * 4000 + 1000);
});

//Старт исполнения обещания (Promise)
p1.then(function(val) {
    log.insertAdjacentHTML('beforeend', val + ' Промис исполнен');
    log.insertAdjacentHTML('beforeend', thisPromiseCount + ' завершен');
});