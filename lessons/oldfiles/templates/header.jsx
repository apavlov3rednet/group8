const srcImage = "/images/logo.png";
let headerName = 'Single Page Application';

const componentLogo = <img src={srcImage} width="60px" alt=""/>;
const componentHead = <h1>{headerName}</h1>;
const componentMenu = <menu>
    <li data-route="owners">Владельцы</li>
    <li data-route="brands">Бренды</li>
    <li data-route="models">Модели</li>
    <li data-route="services">Услуги</li>
    <li data-route="objects">Объекты</li>
</menu>;

const componentHeader = <header>
    <componentLogo/>
    <componentHead/>
    <componentMenu/>
</header>;