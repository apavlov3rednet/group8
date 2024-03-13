const models = {
    _id: {},
    TITLE: {
        type: 'String',
        require: true,
        default: 'none',
        loc: "Название",
        sort: true,
        editable: true
    },
    BRAND: {
        type: 'DBRef',
        require: false,
        default: 'none',
        loc: "Бренд",
        sort: true,
        editable: true
    },
};

export default models;