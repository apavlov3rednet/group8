import React, { useCallback, useEffect, useState } from "react";
import config from "../../params/config";
import { CChart } from '@coreui/react-chartjs'
import '../table/style.css';

export default function Index() {
    const [table, setTable] = useState({
        body: []
    });

    const [pie, setPie] = useState({});

    const [loading, setLoading] = useState(false);

    const fetchTable = useCallback(async () => {
        setLoading(true);
        const response = await fetch(config.fullApi + 'collections/get/');
        const unPreparedData = await response.json();

        let labels = [];
        let numbers = [];

        unPreparedData.forEach(item => {
            labels.push(item.TITLE.split('.')[1]);
            numbers.push(item.DOCUMENTS);
        })

        setPie({
            labels: labels,
            numbers: numbers
        })

        setTable({
            body: unPreparedData
        });
        setLoading(false);
    }, []);

    useEffect(
        () => {fetchTable()}, [fetchTable]
    )

    return (
        <>
        <table cellPadding={0} cellSpacing={0} className="simple-table">
            <thead>
                <tr>
                    <th>Название коллекции</th>
                    <th>Индексы</th>
                    <th>Кол-во документов</th>
                </tr>
            </thead>
            <tbody>
                {loading && <tr><td>Loading...</td></tr>}

                {
                    !loading && table.body.map((row, index) => (
                        <tr key={index}>
                            { 
                                Object.values(row).map((col, key) => (
                                    <td>{col}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <CChart
            type="polarArea"
            data={{
                labels: pie.labels,
                datasets: [
                {
                    data: pie.numbers,
                    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB', '#36CFEB'],
                },
                ],
            }}
            options={{
                plugins: {
                legend: {
                    labels: {
                    //color: getStyle('--cui-body-color'),
                    }
                }
                },
                scales: {
                r: {
                    grid: {
                    //color: getStyle('--cui-border-color'),
                    },
                }
                }
            }}
            />
        </>
    )
}