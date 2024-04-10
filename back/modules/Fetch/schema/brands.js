const brands = {
    _id: {},
    TITLE: {
        type: 'String',
        require: true,
        default: 'none',
        loc: "Название",
        sort: true,
        editable: true,
        searchable: true,
    },
    COUNTRY: {
        type: 'String',
        require: false,
        default: 'none',
        loc: "Страна",
        sort: true,
        editable: true,
        searchable: true,
    },
    PARENT_COMPANY: {
        type: 'String',
        require: false,
        default: 'none',
        loc: "Владеющая компания",
        sort: true,
        editable: true,
        searchable: true,
    },
    BUDGET: {
        type: 'Number',
        require: true,
        default: 0,
        loc: "Годовой бюджет ($)",
        sort: true,
        editable: true,
        step: 10000,
        filter: true,
    },
};

export default brands;