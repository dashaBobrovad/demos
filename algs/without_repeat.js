/*
* Ф-я, которая возвращает массив только с уникальными числами
*/

function without_repeat(arr) { // O(n)
    const result = [];
    const obj = {};

    arr.forEach(num => obj[num] = obj[num] ? obj[num] + 1 : 1);

    for (let key in obj) {
        if (obj[key] === 1) {
            result.push(key);
        }
    }

    console.log(result); //  ['1', '2', '4']
    return result;
}

without_repeat([0, 0, 1, 2, 3, 3, 3, 4,]);
