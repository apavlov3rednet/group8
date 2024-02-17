import { useEffect, useState} from 'react';
import Logo from '../../images/logo.png';
import './style.css';

export default function Header() {
    /**
     * Правила работы со стейтами
     * 1. Нельзя писать вне компонента
     * 2. useState и useEffect всегда должны быть вверху и без условий
     */
    const [now, setNow] = useState(new Date()); //нулевой (now) - элемент состояния; первый (setNow) - функция для изменения элемента состояния

    useEffect(
        () => {
            const interval = setInterval(() => setNow(new Date()), 1000);

            return () => {
                clearInterval(interval)
                console.log('clean...')
            }
        }, []
    )

    return (
        <header>
            <div className='LogoGroup'>
                <img src={Logo} width="30px" alt="" />
                <h1>Single Page Application</h1>
            </div>
            
            <menu>
                <li data-route="owners">Владельцы</li>
                <li data-route="brands">Бренды</li>
                <li data-route="models">Модели</li>
                <li data-route="services">Услуги</li>
                <li data-route="objects">Объекты</li>
            </menu>

            <div className="timer">
                Текущее время: { now.toLocaleTimeString() } 
            </div>
        </header>
    )
}