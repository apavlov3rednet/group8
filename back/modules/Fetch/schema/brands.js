const brands = {
    _id: {},
    TITLE: {
        type: 'String',
        require: true,
        default: 'none',
        loc: "Название"
    },
    COUNTRY: {
        type: 'String',
        require: false,
        default: 'none',
        loc: "Страна"
    },
    PARENT_COMPANY: {
        type: 'String',
        require: false,
        default: 'none',
        loc: "Владеющая компания"
    },
    BUDGET: {
        type: 'Number',
        require: false,
        default: 0,
        loc: "Годовой бюджет ($)"
    },
};

export default brands;