import {useState, useCallback, useEffect} from 'react';
import './style.css';

export default function Form({nameForm}) {
    const [schema, setSchema] = useState(null);
    const url = 'http://localhost:8000/api/' + nameForm + '/';

    useEffect(
        () => {
            async function fetchData() {
                const response = await fetch('http://localhost:8000/api/schema/get/' + nameForm + '/');
                const answer = await response.json();
                setSchema(answer);
              }
              fetchData();
        }, []
    );

    function renderForm(data = {}) {
        let formElements = [];

        for(let i in data) {
            let newRow = data[i];

            newRow.code = i;
            switch(newRow.type) {
                case 'String':
                    newRow.fieldType = 'text';
                break;

                case 'Number':
                    newRow.fieldType = 'number';
                break;

                case 'Phone':
                    newRow.fieldType = 'tel';
                break;

                case 'Email':
                    newRow.fieldType = 'email';
                break;

                case 'Password':
                    newRow.fieldType = 'password';
                break;

                case 'Hidden':
                default:
                    newRow.fieldType = 'hidden';
                break;
            }

            formElements.push(newRow);
        }

        return (
            <>
                {
                    formElements.map((item, index) => (
                        <label key={index} htmlFor={item.code}>
                            <span>{item.loc} {item.require && '*'}</span>
                            <input name={item.code} 
                            required={item.require && true}
                            step={(item.fieldType === 'number') ? '1000' : null}
                            type={item.fieldType} />
                        </label>
                    ))
                }
            </>
        );
    }

    return (
        <form method='POST' action={url}>
            { renderForm(schema) }

            <button>Сохранить</button>
        </form>
    )
}
