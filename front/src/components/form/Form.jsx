import {useState, useCallback, useEffect} from 'react';
//import './style.css';

export default function Form({nameForm}) {
    const [schema, setSchema] = useState(null);

    useEffect(
        () => {
            async function fetchData() {
                const response = await fetch('http://localhost:8000/api/schema/' + nameForm + '/');
                const answer = await response.json();
                setSchema(answer);
              }
              fetchData();
        }, []
    );

    function renderForm(data = {}) {
        let formElements = [];

        for(let i in data) {
            if(i != '_id') {
                formElements.push(data[i]);
            }
        }

        return (
            <>
                {
                    formElements.map((item, index) => (
                        <label key={index}>
                            <span>{item.loc}</span>
                            <input name={index} type='' />
                        </label>
                    ))
                }
            </>
        );
    }

    return (
        <form method='POST'>
            { renderForm(schema) }

            <button>Сохранить</button>
        </form>
    )
}
