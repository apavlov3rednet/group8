import { useState } from "react";

const Parent = () => {
    const [value, setValue] = useState('');

    const handle = (val) => { //5
        setValue(val); //6
    }

    return (
        <div>
            <Sibling1 onChange={handle}></Sibling1> //4
            <Sibling2 value={value}></Sibling2> //7
        </div>
    )
}

const Sibling1 = ({onChange}) => {
    const handle = (event) => { //2
        onChange(event.target.value); //3
    }

    return (
        <input type="button" onClick={handle} /> //1
    )
}

const Sibling2 = ({value}) => {
    return (
        <span>{value}</span> //8 finish
    )
}