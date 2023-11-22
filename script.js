'use strict';
(function() {
    /** Data Base controller */
    var DataBase = {
        /** Установка переменной в LocalStorage
         * @param {*} key 
         * @param {*} value 
         */
        setValue: function(key, value) {
            if(!value || value === '' || typeof value === undefined)
                this.removeValue(key);

            window.localStorage.setItem(key, JSON.stringify(value));
        },

        /** Получение переменной из LocalStorage по ключу
         * @param {*} key 
         * @returns 
         */
        getValue: function(key) {
            let value = window.localStorage.getItem(key);

            if(this.isJson(value))
                return JSON.parse(value);

            return value;
        },

        /** Удалить переменную
         * @param {*} key 
         */
        removeValue: function(key) {
            window.localStorage.removeItem(key);
        },

        /** Очистка базы */
        clear: function() {
            window.localStorage.clear();
        },

        isJson: function(value) {
            try {
                JSON.parse(value);
            }
            catch(error) {
                return false;
            }

            return true;
        }
    }

    var DOM = {
        /** Добавление элемента
         * @param {*} tagName 
         * @param {className, attrs{}, styles{}, children[], events{}} params 
         * @returns 
         */
        create: function(tagName, params = {}) {
            if(!tagName)
                return false;

            let element = document.createElement(tagName);

            if(params.className) {
                let classList = params.className.split(' ');
                for(let i of classList) {
                    element.classList.add(i);
                }
            }

            if(typeof params.attrs === 'object') {
                for(let index in params.attrs) {
                    element.setAttribute(index, params.attrs[index]);
                }
            }

            if(typeof params.styles === 'object') {
                for(let i in params.styles) {
                    element.style[i] = params.styles[i];
                }
            }

            if(typeof params.events === 'object') {
                for(let i in params.events) {
                    element.addEventListener(i, params.events[i]);
                }
            }

            if(typeof params.children === 'object' && params.children instanceof Array) {
                params.children.forEach(item => {
                    element.append(item);
                });
            }
                
            return element;
        },

        /** Изменение элемента
         * @param {*} element 
         * @param {*} params 
         */
        adjust: function(element = {}, params = {}) {
            if(params.className) {
                let classList = params.className.split(' ');
                for(let i of classList) {
                    element.classList.add(i);
                }
            }

            if(typeof params.attrs === 'object') {
                for(let index in params.attrs) {
                    element.setAttribute(index, params.attrs[index]);
                }
            }

            if(typeof params.styles === 'object') {
                for(let i in params.styles) {
                    element.style[i] = params.styles[i];
                }
            }

            if(typeof params.events === 'object') {
                for(let i in params.events) {
                    element.addEventListener(i, params.events[i]);
                }
            }

            if(typeof params.children === 'object' && params.children instanceof Array) {
                params.children.forEach(item => {
                    element.append(item);
                });
            }
        },

        /** Helper: Удаление всех стилей элемента
         * @param {*} element 
         */
        removeStyles: function(element) {
            element.removeAttribute('style');
        },

        /**
         * 
         * @param {*} element 
         * @param {*} all 
         */
        clearItem: function(element = {}, all = false) {
            element.innerHTML = '';

            if(all) {
                DOM.removeStyles(element);
                element.removeEventListener();

                // Array.from(element.attributes).forEach(item => {
                //     element.removeAttribute(item);
                // });
            }
        },

        /**
         * 
         * @param {*} element 
         * @param {*} total 
         */
        removeItem: function(element = {}, total = false) {
            if(total) {
                element.remove();
            }
            else {
                DOM.clearItem(element, true);
            }
        }
    }

    var Owner = {
        userName: {},

        /** Создание пользователя автомобиля
         * @param {*} firstName 
         * @param {*} lastName 
         * @param {*} secondName 
         * @returns 
         */
        setName: function(firstName = '', lastName = '', secondName) {
            if(typeof firstName != 'string' || typeof lastName != 'string')
                return false;

            this.userName = {
                name: firstName,
                lastName: lastName
            }

            if(typeof secondName === 'string' && secondName != "") 
                this.userName.secondName = secondName;
        },

        /** Установка даты рождения
         * @param {*} date 
         */
        setBirthDate: function(date) {
            try {
                if(date instanceof Date) {
                    let d = new Date(date);

                    this.userName.dateBD = d;
                }
            }
            catch(error) {
                console.log('invalid data');
            }
        },

        /** Получение полного имени пользователя
         * @returns 
         */
        getFullName: function() {
            if(Object.keys(this.userName).length != 0)
                return this.userName.lastName + ' ' + this.userName.name + this.getSecondName();
        },

        getSecondName: function() {
            if(this.userName.secondName)
                return ' ' + this.userName.secondName;
        }
    }

    // let person = Owner;

    // person.setName('Ivan', 'Petrov', 'Alekseevich');
    // person.setBirthDate('11.11.2002');

    // DataBase.setValue('user', person);

    // let test = DOM.create('div', {
    //     className: 'test some-class',
    //     styles: {
    //         width: '100px',
    //         height: '100px',
    //         backgroundColor: '#333',
    //         display: 'block'
    //     },
    //     children: [
    //         DOM.create('span')
    //     ],
    //     events: {
    //         click: function() {
    //             console.log('good');
    //         }
    //     }
    // });

    // document.body.append(test);

})(window);


