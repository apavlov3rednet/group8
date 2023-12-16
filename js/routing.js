class Routing
{
    constructor() {
        this.viewsDir = '/views/';
        this.arRoute = {};
        this.ext = '.tmpl';
        this.error404 = '404';
    }

    /**
     * 
     * @param {*} url important
     * @param {method = GET*|POST, type = sync*|async, reponseType = text} params options
     */
    static ajaxOld(url, params = {}) {
        //Старт события XHR
        let xhr = new XMLHttpRequest();

        //Определяем метод запроса и его тип
        if(params.method != 'GET')
            xhr.open(params.method, url, params.type === 'async');
        else
            xhr.open('GET', url, params.type === 'async');

        //Ожидаемый тип данных от сервера    
        if(params.type === 'async')
            xhr.responseType = (params.responseType) ? params.responseType : 'json';

        //Заголовки
        //xhr.setRequestHeader('Content-Type', 'application/json');
        if(params.headers instanceof Array) {
            params.headers.forEach((item, index) => xhr.setRequestHeader(index , item));
        }

        if(params.data && Object.keys(params.data).length > 0) {
            xhr.send(params.data);
        }
        else {
            xhr.send();
        }
            
        //Прогресс выполнения запроса
        xhr.onprogress = function(event) {
            console.log(event);
        }

        //Результат обращения к серверу
        xhr.onload = function() {
            /**
             * 100 - 120 - ошибки которые происходят на физическом сервере
             * 200 - 226 - положительный ответ
             * 300 - 308 - редиректы
             * 400 - 499 - ошибки приложения, клиента
             * 500 - 526 - ошибки сервера, как приложения
             */
            if(xhr.status != 200) {
                console.error(`Error ${xhr.status}: ${xhr.statusText}`); // Error 404: Not found;
            }
            else {
                console.log(xhr.response);
            }
        }

        //Произошла ошибка запроса
        xhr.onerror = function(event) {
            console.error(event);
        }

    }

    static ajax(url, params = {}) {
        let _this = this;
        let content = fetch(url)
            .then(response => {
                return response.text();
            })
            .then(data => {
                let route;
                let view = new View();
                
                for(let i in params.routes) {
                    if(params.routes[i].request === url) {
                        route = params.routes[i];
                    }
                }

                _this.setUrl(route.url, route.name);
                view.setContent(data);

                if(params.callback && params.callback instanceof Function) {
                    
                }
            });
    }

    tree(menu) {
        menu.forEach((item, index) => {
            this.arRoute[index] = {
                name: item.innerText,
                request: this.viewsDir + item.dataset.route + this.ext,
                url: '/' + item.dataset.route + '/'
            }
        });

        this.arRoute.error = {
            name: '404',
            request: this.viewsDir + this.error404 + this.ext,
            url: '/404/'
        }
    }

    getContent(id, params = {}) {
        let url = this.arRoute[id].request || 'error';

        if(url !== 'error') {
            Routing.ajax(url, params);
        }
        else {
            
        }
    }

    static setUrl(url, title) {
        let tagTitle = document.querySelector('title');
        let h1 = document.body.querySelector('h1');

        tagTitle.innerText = title;
        h1.innerText = title;


        //history.pushState({page: 1}, title, url);

    }
}


//jQuery $.ajax()
//BX BX.ajax()
