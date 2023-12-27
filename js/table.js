class Table extends DOM {
    static generate(arHead = [], arBody = [], arFoot = [], params = {}) {
        let header = Table.header(arHead);
        let body = Table.body(arBody);
        let footer = Table.footer(arFoot);

        return Table.create('table', {
            className: (params.className) ? params.className : "",
            attrs: (params.attrs) ? params.attrs : {},
            styles: (params.styles) ? params.styles : {},
            events: {

            },
            children: [
                (header) ? header : '',
                (body) ? body : '',
                (footer) ? footer : '',
            ]
        });
    }

    static header(ar = []) {
        if(!ar || ar.length === 0)
            return false;

        let tableHead, tableHeadChild = [];

        ar.forEach(item => {
            tableHeadChild.push(Table.create('th', {
                text: item,
                events: {
                    click: Table.sort
                }
            }));
        });

        tableHead = Table.create('thead', {
            children: [
                Table.create('tr', {
                    children: tableHeadChild
                })
            ]
        });

        return tableHead;
    }

    static footer(ar = []) {
        if(!ar || ar.length === 0)
            return false;

        let tableFoot, tableFootChild = [];

        ar.forEach(item => {
            tableFootChild.push(Table.create('td', {
                text: item,
                events: {
                    click: Table.sort
                }
            }));
        });

        tableFoot = Table.create('tfoot', {
            children: [
                Table.create('tr', {
                    children: tableFootChild
                })
            ]
        });

        return tableFoot;
    }

    static body(ar = []) {
        if(!ar || ar.length === 0)
            return false;

        let tableBody, tableRow = [];

        ar.forEach(row => {
            if(row instanceof Array) {
                let obRow, arRowChild = [];

                row.forEach(item => {
                    let reg = new RegExp('^[0-9]{1,3}[\.]{1}[0-9]+$'), str;

                    if(String(item).match(reg)) {
                        str = String(item).slice(0,7) + '...';
                    }
                    else {
                        str = item;
                    }

                    arRowChild.push(Table.create('td', {text: str}));
                });

                obRow = Table.create('tr', {
                    children: arRowChild
                });

                tableRow.push(obRow);
            }
        });

        tableBody = Table.create('tbody', {
            children: tableRow
        });

        return tableBody;
    }

    static sort() {

    }
}
