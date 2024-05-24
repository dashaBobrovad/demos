/*
* Матрица
*
* Посчитать периметр закрашенной области, при том, что 1 ячейка = 1x1
*/

const data = [
    "XOOXO",
    "XOOXO",
    "OOOXO",
    "XXOXO",
    "OXOOO",
]

function matrix(data) { // O(N*N)
    let p = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[i][j] === "X") {
                // 1. Первый эл-т
                // 2. Над элементом ничего нет в первой строке
                // 3. Последний эл-т
                // 4. Под элементом ничего нет в последней строке 
                // 5. Рядом с элементом располагается пустой элемент слева || сверху || снизу ||справа
                p += j === 0 || data[i][j-1] === "O";
                p += i === 0 || data[i-1][j] === "O";
                p += j === data[i].length - 1 || data[i][j+1] === "O";
                p += i === data.length - 1 || data[i+1][j] === "O";
            }
        }

    };

    console.log("P =", p); // 24
    return p;
}

matrix(data);
