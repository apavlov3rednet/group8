const brands = {
    TITLE : {
        type: 'string',
        validate: true
    },
    BUDGET : {
        type: 'number',
        validate: true
    },
    PARENT_COMPANY : {
        validate: false
    },
    COUNTRY:{
        validate: false
    },
}

module.exports = brands;