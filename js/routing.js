class Routing
{
    constructor() {
        this.viewsDir = '/views/';
        this.arRoute = [];
        this.ext = '.tmpl';
        this.error404 = '404';
        this.arrObRoutes = {};
    }

    /**
     * 
     * @param {*} url important
     * @param {method = GET*|POST, type = sync*|async, reponseType = text} params options
     */
    static ajax(url, params = {}) {
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

    tree() {
        let menu = document.body.querySelectorAll('menu li');

        menu.forEach(item => {
            this.arRoute.push(item.dataset.route);
        });

        this.arRoute.forEach((item, index) => {
            this.arrObRoutes[index] = this.viewsDir + item + this.ext;
        });

        this.arrObRoutes['error'] = this.viewsDir + this.error404 + this.ext;
    }

    getContent(id) {
        let url = this.arrObRoutes[id] || 'error';
        const body = new URLSearchParams();

        if(url !== 'error') {
            fetch(url, { type: 'async', method: 'POST', responseType: 'html', headers: {
                'Access-Control-Allow-Origin': '*',
            }, body}).then();
        }
        else {
            fetch(this.arrObRoutes.error404).then();
        }
    }
}


//jQuery $.ajax()
//BX BX.ajax()
