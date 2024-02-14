const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMClient = require('react-dom/client');


//low level
const hi = <h1 className="" dataName="">Привет мир!</h1>; //jsx аттрибуты пишем camelCase стилем, CamelCase, camelCase 

ReactDOM.render(hi);
ReactDOM.render(<h1>Hi</h1>);

//Без JSX
ReactDOM.render(React.createElement('input', {
    placeholder: 'some text',
    type: 'text',
    onClick: () => console.log('click')
}), document.getElementById('root'));

const inputClick = () => console.log('click');

//jsx
ReactDOM.render(<input type='text' placeholder='som text' onClick={inputClick}/>,  document.getElementById('root'));


//root - корень проекта, куда происходит вся генерация
const root = ReactDOMClient.createRoot(document.getElementById('root'));

const element = <div>Привет, {userName}!</div>
root.render(element);

//components
const Logo = () => {
    return (
        <img src='./public/images/logo.png'/>
    )
}

class Header extends React.Component {
    headerText = 'SPA Application';

    render(data) {
        return (
            <header className="header">
                <Logo />
                <h1>{this.headerText}</h1>
                <menu>
                    {data.links.map(item => {
                        if(item.selected) {
                            <li className="selected">{item.name}</li>
                        }
                        else {
                            <li>{item.name}</li>
                        }
                    })}
                </menu>
            </header>
        );
    }
}

root.render(<Header />)