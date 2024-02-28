import {useState, useCallback, useEffect} from 'react';
import './style.css';

export default function Table() {
    // const Header = function() {
    //     let firstRow = children[0];
    //     let headerCol = [];

    //     for(let index in firstRow) {
    //         let col = firstRow[index];
    //         headerCol.push(index);
    //     } 
        
    //     headerCol.forEach((item, index) => {
    //         <th key={index}> {item} </th>
    //     })
    // }

    const [table, setTable] = useState({
        header: [],
        body: [],
        footer: []
    });

    const [loading, setLoading] = useState(false);

    const fetchTable = useCallback(async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/getListBrands/');
        const unPreparedData = await response.json();

        const data = {
            header: unPreparedData.head,
            body: unPreparedData.data,
            footer: []
        };

        setTable(data);
        setLoading(false);
    }, []);

    useEffect(
        () => {fetchTable()}, [fetchTable]
    )

    function getHeader(schema) {
        let header = [];
        for(let i in schema) {
            if(i === '_id')
                header.push('ID');
            else
                header.push(schema[i].loc);
        } 

        header.push('');

        return (
            <tr>
                {
                    header.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))
                }
            </tr>
        )
    }

    return (
        <table className="simple-table">
            <thead>
                {loading &&  <tr><td>Loading...</td></tr>}
                {!loading && getHeader(table.header)}
            </thead>
            <tbody>
                {loading && <tr><td>Loading...</td></tr>}

                {
                    !loading && table.body.map(row => (
                        <tr key={row._id}>
                            {
                                Object.values(row).map((col, index) => (
                                    <td key={index}>
                                        {col}
                                    </td> 
                                ))
                            }
                            <td><button value={row._id}>Удалить</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}