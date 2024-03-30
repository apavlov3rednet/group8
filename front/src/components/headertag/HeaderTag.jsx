export default function HeaderTag({ name }) 
{
    let headers = {
        brands: 'Бренды',
        owners: 'Владельцы',
        services: 'Услуги',
        cards: 'Карточки',
        models: 'Модели',
    }

    return (
        <>{headers[name]}</>
    )
}