const services = {
    _id: {},
    TITLE: {
        type: 'String',
        require: true,
        default: 'none',
        loc: "Наименование услуги",
        sort: true,
        editable: true
    },
    DATE: {
        type: 'Date',
        require: true,
        default: 'none',
        loc: "Дата оказания",
        sort: true,
        editable: true
    },
    CARD: {
        type: 'DBRef',
        require: true,
        default: 'none',
        loc: "Автомобиль",
        sort: true,
        editable: true,
        collection: 'cards'
    },
    PRICE: {
        type: 'Number',
        require: true,
        default: 0,
        loc: "Цена за ед.",
        sort: true,
        editable: true,
        step: 10,
    },
    COUNT: {
        type: 'Number',
        require: true,
        default: 0,
        loc: "Кол-во",
        sort: true,
        editable: true,
        step: 1,
    },
    TOTAL: {
        type: 'Number',
        require: false,
        default: 0,
        loc: "Сумма",
        sort: true,
        editable: true,
        step: null,
    },
};

export default services;