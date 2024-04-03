import { useCallback, useEffect, useState } from "react";
import config from "../../params/config.js";
import './style.css';

export default function Search({ onChange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMenu = useCallback(async () => {
        setLoading(true);
        // const response = await fetch(config.fullApi + 'Menu/');
        // const unPreparedData = await response.json();
        // setData(unPreparedData.data);
        setLoading(false);
    }, [])

    useEffect(
        () => {
            fetchMenu();
        }, [fetchMenu]
    );

    function inputEvent(event) {
        onChange(event.target.value);
    }

    return (
        <div className="searchPanel">
            <label>
                <input onChange={inputEvent} placeholder="Введите поисковый запрос" />
            </label>
        </div>
    )
}