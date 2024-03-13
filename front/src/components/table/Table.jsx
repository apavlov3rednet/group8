import {useState, useCallback, useEffect} from 'react';
import config from '../../params/config.js';
import './style.css';

export default function Table({nameTable, onChange}) {
    const [table, setTable] = useState({
        header: [],
        body: [],
        footer: []
    });

    const [loading, setLoading] = useState(false);

    const fetchTable = useCallback(async () => {
        setLoading(true);
        const response = await fetch(config.fullApi + nameTable +'/');
        const unPreparedData = await response.json();

        const data = {
            header: unPreparedData.head,
            body: unPreparedData.data,
            footer: []
        };

        setTable(data);
        setLoading(false);
    }, [nameTable, onChange]);

    useEffect(
        () => {fetchTable()}, [fetchTable]
    )

    function getHeader(schema) {
        let header = [];
        for(let i in schema) {
            if(i === '_id')
                header.push({loc: 'ID'});
            else
                header.push(schema[i]);
        } 

        header.push('');

        return (
            <tr>
                {
                    header.map((item, index) => (
                        <th key={index} 
                            className={item.sort ? 'sortable' : null}>
                                {item.loc}
                                {item.sort ? ' ::' : null}
                        </th>
                    ))
                }
            </tr>
        )
    }

    async function edit(event) {
        const url = config.fullApi + nameTable + '/?id=' + event.target.value;
        const response = await fetch(url);
        const answer = await response.json();
        onChange(answer);
    }

    async function drop(event) {
        const url = config.fullApi + nameTable + '/' + event.target.value + '/';
        const confirmWindow = window.confirm('Уверены?');
        if(confirmWindow) {
            const response = await fetch(url);
            const answer = response.status;

            if(answer === 200) {
                fetchTable();
            }
        }
    }

    return (
        <table cellPadding={0} cellSpacing={0} className="simple-table">
            <thead>
                {loading &&  <tr><td>Loading...</td></tr>}
                {!loading && getHeader(table.header)}
            </thead>
            <tbody>
                {loading && <tr><td>Loading...</td></tr>}

                {
                    !loading && table.body.map(row => (
                        <tr key={row._id} id={row._id}>
                            {
                                Object.values(row).map((col, index) => (
                                    <td key={index}>
                                        {col}
                                    </td> 
                                ))
                            }
                            <td>
                                <button value={row._id} onClick={edit} className='edit'></button>
                                <button value={row._id} onClick={drop} className='drop'></button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}