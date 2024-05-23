/*
* fibonachi
*
* последовательность чисел, в которой первые два число 0 и 1, а последующие являются суммой двух предыдущих
* принимает номер числа в последовательности и его возвращает
*
* 0 1 1 2 3 5 8 13 21 34 55
*/

(function () {
    const fibonachi = function(n) {
        if (n <= 0 ) {
            return 0;
        }
    
        if (n <= 2 ) {
            return 1;
        }

        return fibonachi(n-1) + fibonachi(n-2);
    }

    console.log('fibonachi # 1: ', fibonachi(10))
    
})();

(function () {
    const fibonachi = function(n) {
        if (n <= 0 ) {
            return 0;
        }
    
        if (n <= 2 ) {
            return 1;
        }

        let prev = 1;
        let result = 1;
        for (i = 0; i < n - 2; i++) {
            let tmp = result;
            result += prev;
            prev = tmp;
        }
        return result;
    }

    console.log('fibonachi # 2: ', fibonachi(10))
    
})();
