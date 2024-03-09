import { useState } from "react";
import Form from "../form/Form.jsx";
import Table from "../table/Table.jsx";

export default function Container() 
{
    const [row, setRow] = useState('');

    const handleUpdateRow = (value) => {
        if(value.data)
            setRow(value.data[0]);
    }

    return (
        <div className='container'>
            <Form arValue={row} nameForm='Brands'/>
            <Table onChange={handleUpdateRow} nameTable='Brands'/>
        </div>
    )
}

