const models = {
    _id: {},
    BRAND: {
        type: 'DBRef',
        require: true,
        default: 'none',
        loc: "Бренд",
        sort: true,
        editable: true,
        collection: 'brands'
    },
    TITLE: {
        type: 'String',
        require: true,
        default: 'none',
        loc: "Название",
        sort: true,
        editable: true
    },
    
};

export default models;