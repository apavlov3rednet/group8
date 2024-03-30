import { useState, useEffect, useCallback } from "react";
import Form from "../form/Form.jsx";
import Table from "../table/Table.jsx";
import Index from '../index/Index.jsx';
import HeaderTag from "../headertag/HeaderTag.jsx";

export default function Container({ curPath }) 
{
    const [row, setRow] = useState('');
    const [collectionName, setCollectionName] = useState(null);

    const handleUpdateRow = (value) => {
        if(value.data)
            setRow(value.data[0]);
    }

    const setCollection = useCallback(async () => {
        if(curPath!=='index')
            setCollectionName(curPath);
    })

    useEffect(
        () => { 
            setCollection();
        }, [setCollection]
    )

    return (
        <div className='container'>
            <h1>
                {!collectionName && 'Главная'}
                {collectionName && <HeaderTag name={collectionName}/>}
            </h1>
            { collectionName && <Form arValue={row} nameForm={collectionName}/> }
            { collectionName && <Table onChange={handleUpdateRow} nameTable={collectionName}/>}
            
            { !collectionName && <Index></Index>}
        </div>
    )
}

