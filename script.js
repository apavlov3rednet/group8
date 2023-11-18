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
            return window.localStorage.getItem(key) || false;
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
                return this.userName.lastName + ' ' + this.userName.name;
        }
    }

    console.log(typeof Owner)

})(window);


