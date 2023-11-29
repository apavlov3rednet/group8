let names = [
    'Ivan', 
    'Bogdan', 
    'Ruslan',
    'Olga',
    'Inna',
    'Anna',
];

[first, second, third] = [...names];


names[names.length] = 'David';



// let newNames = [...names];

// console.log(names, newNames);

//Так никогда не делай!!!
names[8] = 'Misha'; 
names.someValue = 'some-value';

// console.log(names);
// let newNames = [...names];

// console.log(newNames);

//console.log(names[2]);
//console.log(names[-1]);
// console.log(names.at(-1));
// console.log(names[names.length - 1]);

// pop/push && shift/unshift

//names.pop(3);

names.push('Rita', 'Margo', 'Aleksey;Pavel');

// names.length = names.length - 2;

// console.log(names);

// names.length = 10;

// console.log(names);

let newNames = Array.from(names);

console.log(newNames);
// let multi = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
// ];

// console.log(multi[1][1]);

//console.log(names);
let bigName = names.filter(name => name.length > 4);

let bigName2 = names.filter(name => {
    if(name.length > 5) return name;
});

// console.log(bigName, bigName2);

// bigName.fill('Petr');
// bigName.fill('Ivan', 2, 4);
// bigName.fill('Bogdan', 4, 100);

// console.log(bigName);

//console.log(Array(100).fill('Bogdan'));

// const ar = Array(4).fill({});
// console.log(ar);
// ar[0].hi = 'all';
// console.log(ar);

// let numbers = [1, 4, 9, 25, 3, 8, 10];
// let roots = numbers.map(Math.sqrt);
// let roots2 = numbers.map(num => {
//     return Math.round(Math.sqrt(num)); 
// });

// console.log(numbers);
// console.log(roots);
// console.log(roots2);

// bigName.fill('blabla1'); - заменить все элементы
// bigName.fill('blabla2', 3); - заменить только 3 индекс
// bigName.fill('blabla3', 4, 20); - заменить все начиная с 4 индекса и добавить недостающие до 20

// let numbers = [1, 4, 9, 25, 3, 8, 10];
// // let roots = numbers.map(Math.sqrt);

// let ten = numbers.find(element => element > 10);

// console.log(ten);

// let indexTen = numbers.findIndex(element => element > 10);

// console.log(indexTen);

//.findLast()
//.findLastIndex()

// console.log(numbers);

//console.log(numbers, roots, roots2);
// console.log(names);

// let str = names.join('||'); // JSON.stringify
// console.log(str);

// console.log(str.split('||')); //JSON.parse

// console.log(String(numbers)); //Здесь сепаратор запятая

// console.log([] + 1);
// console.log([1] + 1);
// console.log([1,2] + 1);
// console.log([1,2] + [3,4]);

// console.log([...[1,2], ...[3,4]]);

// Array.prototype.merge = function(...arr) {

// }