/*
* palindrom
*
* строка читается слева направо и справа налево одинаково
*/

(function () {
    const palindrom = function (word) {
        word = word.toLowerCase();
        return word.split('').reverse().join('') === word;
    }

    console.log('palindrom # 1: ', palindrom("aZaZa"))

})();

(function () {
    const palindrom = function (word) {
        word = word.toLowerCase();

        for (let i = 0; i < word.length / 2; i++) {
            if (word[i] !== word[word.length - i - 1]) {
                return false
            }
        }
        return true;
    }

    console.log('palindrom # 2: ', palindrom("aZaZa"))

})();
