// npx create-react-app folder
import React from 'react';

const PORT = 3000;

class Header extends React.Component {
    render() {
        return (
            <header>Шапка сайта</header>
        )
    }
}

class Image extends React.Component {
    render(props) {
        return (
            <img src='./images/logo.png' 
            width={(props.width) ? props.width : '20px'} 
            onClick={props.event}/>
        )
    }
}


class App extends React.Component {
    render() {
        return (
            <div className='test'>
                <Header />
                <Image />
                <Image width='40px' event={this.clickOnLogo} />
                <Image />
                <Image />
                <Image />
            </div>
        )
    }

    clickOnLogo() {
        window.location = '/';
    }
}

export default App;