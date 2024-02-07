function formatName(user) {
    return user.name + ' ' + user.lastName;
}

const user = {
    name: 'Tom',
    lastName: 'Block'
};

const element = (
    <p>Здравству, {formatName(user)}!</p>
);




list.forEach(item => {

    let budget = Intl.NumberFormat('ru', false, item.BUDGET);

    <div>
        <h3>{item.TITLE}</h3>
        <p>{item.PARENT_COMPANY}</p>
        <p><small>{item.COUNTRY}</small></p>
        <p><small>{budget}</small></p>
    </div>;
});
