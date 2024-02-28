import { useCallback, useEffect, useState } from "react";

export default function Menu() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMenu = useCallback(async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/getListMenu/');
        const unPreparedData = await response.json();
        setData(unPreparedData.data);
        setLoading(false);
    }, [])

    useEffect(
        () => {
            fetchMenu();
        }, [fetchMenu]
    )

    return (
        <menu>
            {
                !loading && data.map((menuElement) => (
                    <li key={menuElement._id}><a href={menuElement.LINK}>{menuElement.NAME}</a></li>
                ))
            }
        </menu>
    )
}