class Routing
{
    constructor() {
        this.viewsDir = '/views/';
        this.arRoute = {};
        this.ext = '.html';
        this.error404 = '404';
    }

    /**
     * 
     * @param {*} url important
     * @param {method = GET*|POST, type = sync*|async, reponseType = text} params options
     */
    static ajax(url, params = {}) {
        let _this = this;
        fetch(url)
            .then(response => {
                //Определяем формат ответа сервера, если не указан то текст по умолчанию
                if(params.type === 'json')
                    return response.json();

                if(params.type === 'blob')
                    return response.blob();

                return response.text();
            })
            .then(data => {
                //Проверяем на наличие коллбек функции для успешного исполнения
                if(params.onsucces && params.onsucces instanceof Function) {
                    let getData = params;

                    if(data != '')
                        getData.answer = data;

                    params.onsucces(getData); //Вызов коллбек функции
                }
                else return data;
            });
    }

    /**
     * Дерево маршрутизации
     * @param {*} menu 
     */
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

    /**
     * Получаем контент по маршруту
     * @param {*} id 
     * @param {*} onsucces Function
     */
    getContent(id, onsucces) {
        let url = this.arRoute[id].request || 'error';
        let title = this.arRoute[id].name;
        let pageUrl = this.arRoute[id].url;

        if(url !== 'error') {
            Routing.ajax(url, {
                title: title,
                onsucces: onsucces //коллбек-функция
            });
        }

        Routing.setUrl(pageUrl, title); //Устанавливаем URL страницы
    }

    static setUrl(url, title) {
        history.pushState({page: 1}, title, url);
    }
}