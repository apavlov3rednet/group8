import {useState, useEffect} from 'react';
import config from '../../params/config.js';
import './style.css';

export default function Form({nameForm, arValue}) {
    const [schema, setSchema] = useState(null);
    const [formValue, setFormValue] = useState(arValue);
    const url = config.fullApi + nameForm + '/';

    useEffect(
        () => {
            async function fetchData() {
                const response = await fetch(config.fullApi + 'schema/get/' + nameForm + '/');
                const answer = await response.json();
                setSchema(answer);
              }
              fetchData();
              setFormValue(arValue);
        }, [nameForm, arValue]
    );

    function renderForm(data = {}, ar = {}) {
        let formElements = [];
        for(let i in data) {
            let newRow = data[i];

            newRow.code = i;
            newRow.value = (ar[i]) ? ar[i] : '';
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
                            defaultValue={item.value && item.value }
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
            { renderForm(schema, formValue) }

            <button>Сохранить</button>
        </form>
    )
}
