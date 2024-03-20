import { useEffect, useState} from 'react';
import Logo from '../../images/logo.png';
import Menu from '../menu/Menu';
import './style.css';

export default function Header({ curPath }) {
    /**
     * Правила работы со стейтами
     * 1. Нельзя писать вне компонента
     * 2. useState и useEffect всегда должны быть вверху и без условий
     */
    const [now, setNow] = useState(new Date()); //нулевой (now) - элемент состояния; первый (setNow) - функция для изменения элемента состояния
    // const [menu, setMenu] = useState(props.menu);

    // const getMenu = useCallback(() => {
    //     setMenu(props.menu);
    // }, []);

    useEffect(
        () => {
            const interval = setInterval(() => setNow(new Date()), 1000);

            return () => {
                clearInterval(interval);
            }
        }, []
    )

    return (
        <header>
            <div className='LogoGroup'>
                <img src={Logo} width="30px" alt="" />
                <h1>SPA</h1>
            </div>
            
            <Menu curPath={curPath}/>

            <div className="timer">
                Текущее время: { now.toLocaleTimeString() } 
            </div>
        </header>
    )
}