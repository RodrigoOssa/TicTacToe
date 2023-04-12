const algo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

let resultado = algo.findIndex(item => { console.log(item); return item === [1, 2, 3] })
console.log(resultado)

resultado = algo.find(item => { console.log(item); return item == [1, 2, 3] })
console.log(resultado);

let [myarray] = algo;
let numero = [1, 2, 3];
console.log(typeof myarray)
console.log(typeof numero);
console.log(myarray == numero)

resultado = algo.findIndex(item => {
    console.log(item);
    return item.toString == numero.toString;
})
console.log(resultado);

console.log(algo.length)