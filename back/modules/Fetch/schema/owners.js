const owners = {
    _id: {},
    TITLE: {
        type: 'String',
        require: true,
        default: 'none',
        loc: "ФИО",
        sort: true,
        editable: true
    },
    PHONE: {
        type: 'Phone',
        require: false,
        default: 'none',
        loc: "Телефон",
        sort: true,
        editable: true
    },
    EMAIL: {
        type: 'Email',
        require: false,
        default: 'none',
        loc: "E-mail",
        sort: true,
        editable: true
    },
};

export default owners;