import { useCallback, useEffect, useState } from "react";
import config from "../../params/config";

export default function Index() {
    const [table, setTable] = useState({});

    const [loading, setLoading] = useState(false);

    const fetchTable = useCallback(async () => {
        setLoading(true);
        const response = await fetch(config.fullApi + 'collections/get/');
        // const unPreparedData = await response.json();

        // setTable(data);
        // setLoading(false);
    }, []);

    useEffect(
        () => {fetchTable()}, [fetchTable]
    )



    return (
        <div>
            <h1>Главная страница</h1>
        </div>
    )
}