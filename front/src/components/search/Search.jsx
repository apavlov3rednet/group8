
import { useCallback, useEffect, useState } from "react";
import config from "../../params/config.js";
import './style.css';

export default function Search({ onChange, nameCollection }) {
    const [schema, setSchema] = useState({});

    useEffect(
        () => {
            async function fetchData() {
                const response = await fetch(config.fullApi + 'schema/get/' + nameCollection + '/');
                const answer = await response.json();
                
                for(let key in answer) {
                    let element = answer[key];
            
                    if(element.type === 'DBRef') {
                        let mdb =  await fetch(config.fullApi + element.collection + '/');
                        let ar  = await mdb.json();  
                        answer[key].arList = ar.data;
                    }

                    if(element.filter && element.type === 'Number') {
                        let min = await fetch(config.fullApi + nameCollection + '/?min=' + key);
                        let minValue = await min.json();

                        let max = await fetch(config.fullApi + nameCollection + '/?max=' + key);
                        let maxValue = await max.json();
                        answer[key].limits = {
                            min : minValue.data[0][key],
                            max : maxValue.data[0][key]
                        };
                    }   
                }

                setSchema(answer);
              }

              fetchData();
        }, [nameCollection]
    );

    function inputEvent(event) {
        onChange(event.target.value);
    }

    function toggleModal() {
        let modal = document.querySelector('.modal');
        let overlay = document.querySelector('.overlay');
        modal.classList.toggle('show');
        overlay.classList.toggle('show');
    }

    function renderFilter(data = {}) {
        let formElements = [];
        for(let i in data) {
            let newRow = data[i];

            newRow.code = i;
            if(newRow.filter) {
                switch(newRow.type) {
                    case 'Number':
                        newRow.field = 'range';
                    break;
                }

                formElements.push(newRow);
            }
        }

        return(
            <>
                {
                    formElements.map((item, index) => (
                        <label key={index}> 
                            <span>{item.loc}</span>
                            <div className="rangeGroup">
                            <input type={item.field} 
                            max={item.limits.max}
                            min={item.limits.min}
                            step={item.type === 'Number' && item.step}
                            list={item.field === 'range' && index}
                            name={item.code + '[MIN]'}/>

                            {
                                item.field === 'range' && 
                                <datalist id={index}>
                                    <option value={item.limits.min} label={item.limits.min}></option>
                                    <option value={item.limits.max} label={item.limits.max}></option>
                                </datalist>
                            }
                            </div>

                            <div className="rangeGroup">
                            <input type={item.field} 
                            max={item.limits.max}
                            min={item.limits.min}
                            step={item.type === 'Number' && item.step}
                            list={item.field === 'range' && index}
                            name={item.code + '[MAX]'}/>

                            {
                                item.field === 'range' && 
                                <datalist id={index}>
                                    <option value={item.limits.min} label={item.limits.min}></option>
                                    <option value={item.limits.max} label={item.limits.max}></option>
                                </datalist>
                            }
                            </div>
                        </label>
                    ))
                }
            </>
        )
    }

    return (
        <>
        <div className="searchPanel">
            <label>
                <input onChange={inputEvent} placeholder="Введите поисковый запрос" />
            </label>

            <button onClick={toggleModal}></button>
        </div>

        <div className="modal">
            <div className="modal-head">Фильтр <button onClick={toggleModal}></button></div>
            <form method='GET' action=''>
                {renderFilter(schema)}
            </form>
        </div>
        <div className="overlay" onClick={toggleModal}></div>
        </>
        
    )
}