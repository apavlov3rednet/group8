const cards = {
    _id: {},
    TITLE: {
        type: 'String',
        require: true,
        default: 'none',
        loc: "Гос.знак",
        sort: true,
        editable: true
    },
    MODEL: {
        type: 'DBRef',
        require: false,
        default: 'none',
        loc: "Модель",
        sort: true,
        editable: true,
        collection: 'models'
    },
    OWNER: {
        type: 'DBRef',
        require: false,
        default: 'none',
        loc: "Владелец",
        sort: true,
        editable: true,
        collection: 'owners'
    },
};

export default cards;