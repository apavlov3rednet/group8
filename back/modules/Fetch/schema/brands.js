const brands = {
    _id: {},
    TITLE: {
        type: 'String',
        require: true,
        default: 'none',
        loc: "Название",
        sort: true,
        editable: true
    },
    COUNTRY: {
        type: 'String',
        require: false,
        default: 'none',
        loc: "Страна",
        sort: true,
        editable: true
    },
    PARENT_COMPANY: {
        type: 'String',
        require: false,
        default: 'none',
        loc: "Владеющая компания",
        sort: true,
        editable: true
    },
    BUDGET: {
        type: 'Number',
        require: false,
        default: 0,
        loc: "Годовой бюджет ($)",
        sort: true,
        editable: true
    },
};

export default brands;