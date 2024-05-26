/*
* Функция вычисляет сумму значений всех узлов
*
* Пример дерева:
* |    |    |   |
* 5    6    1   8
* |   /|\   /\  |
* 5   555   55  5
* /\            |
* 55            5
*/

const data = [
    {
        v: 5,
        c: [
            {
                v: 5,
                c: [{ v: 5 }, { v: 5 }]
            }
        ]
    },
    {
        v: 6,
        c: [{ v: 5 }, { v: 5 }, { v: 5 }],
    },
    {
        v: 1,
        c: [{ v: 5 }, { v: 5 }],
    },
    {
        v: 8,
        c: [
            {
                v: 5,
                c: [
                    {
                        v: 5,
                    }
                ]
            }
        ]
    },
];

function tree_sum(data) {
    if (data.length === 0) {
        return 0;
    }

    let sum = 0;
    let stack = [];

    data.forEach(node => {
        stack.push(node);
    });


    while (stack.length) {
        let node = stack.pop();
        sum += node.v;
        console.log(sum);

        if (node.c) {
            node.c.forEach(node => {
                stack.push(node);
            });
        }
    }

    console.log(sum)
    return sum;
}

tree_sum(data);
