import {useState, useEffect} from 'react';
import config from '../../params/config.js';
import './style.css';

export default function Form({nameForm, arValue}) {
    const [schema, setSchema] = useState(null);
    const [formValue, setFormValue] = useState(arValue);
    const [url, setUrl] = useState(config.fullApi + nameForm + '/');
    const [edit, setEdit] = useState(false);

    useEffect(
        () => {
            async function fetchData() {
                const response = await fetch(config.fullApi + 'schema/get/' + nameForm + '/');
                const answer = await response.json();
                
                for(let key in answer) {
                    let element = answer[key];
            
                    if(element.type === 'DBRef') {
                        let mdb =  await fetch(config.fullApi + element.collection + '/');
                        let ar  = await mdb.json();  
                        answer[key].arList = ar.data;
                    }
                }
                setSchema(answer);
              }
              setUrl(config.fullApi + nameForm + '/');
              fetchData();
              
              if(arValue) {
                setFormValue(arValue);
                setEdit(true);
              }
              
        }, [nameForm, arValue, edit]
    );

    function renderSelect(ar) {
        let list = ar.arList;
        let value = ar.value._id;

        return (
            <>
                <option key={0} value={0}>Выбери...</option>
                {
                list.map(item => (
                    <option selected={value === item._id} key={item._id} value={item._id}>{item.TITLE}</option>
                ))
                }
            </>
        )
    }

    function renderForm(data = {}, ar = {}) {
        let formElements = [];

        for(let i in data) {
            let newRow = data[i];

            newRow.code = i;
            newRow.value = (ar[i]) ? ar[i] : '';

            switch(newRow.type) {
                case 'String':
                    newRow.fieldType = 'text';
                    newRow.field = 'field';
                break;

                case 'Number':
                    newRow.fieldType = 'number';
                    newRow.field = 'field';
                break;

                case 'Phone':
                    newRow.fieldType = 'tel';
                    newRow.field = 'field';
                break;

                case 'Email':
                    newRow.fieldType = 'email';
                    newRow.field = 'field';
                break;

                case 'Password':
                    newRow.fieldType = 'password';
                    newRow.field = 'field';
                break;

                case 'DBRef':
                    newRow.fieldType = 'select';
                    newRow.field = 'select';
                    newRow.list = renderSelect(newRow);
                break;

                case 'Hidden':
                default:
                    newRow.fieldType = 'hidden';
                    newRow.field = 'field';
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
                            { item.field === 'field' &&  <input name={item.code} 
                            required={item.require && true}
                            defaultValue={item.value && item.value }
                            step={(item.fieldType === 'number') ? '1000' : null}
                            type={item.fieldType} /> }

                            { item.field === 'select' && <select name={item.code}>{item.list}</select>}
                        </label>
                    ))
                }
            </>
        );
    }

    function clearForm(e) {
        e.preventDefault();

        let formElements = e.target.closest('form').querySelectorAll('input, select, textarea'); //querySelector

        formElements.forEach(item => {
            if(item.tagName === 'SELECT') {
                item.value = 0;
            }
            else {
                item.value = '';
            }
        });
        setEdit(false);
    }

    return (
        <form method='POST' action={url}>
            { renderForm(schema, formValue) }

            <button>
                {edit && 'Изменить'}
                {!edit && 'Сохранить'}
            </button>
            <button onClick={clearForm}>Сбросить</button>
        </form>
    )
}
