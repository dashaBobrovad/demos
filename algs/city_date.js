/*
* Дан словарь из городов и дат выступлений рок-групп
*
* Необходимо преобразовать словарь (key-value) в массив из названий городов
* Вывод городов должен быть в хронологическом порядке
* Города, в которых концерт уже прошел, нужно исключить
*
* Результат ["Казань", "Санкт-Петербург", "Калининград"]
*/

const data = {
    "Москва": new Date("2020-04-01"),
    "Казань": new Date("2024-07-02"),
    "Владивосток": new Date("2020-04-21"),
    "Калининград": new Date("2024-07-15"),
    "Омск": new Date("2020-04-18"),
    "Санкт-Петербург": new Date("2024-07-10"),
};

function city_date(data) {
    const res = Object.keys(data)
        .filter(city => data[city] > Date.now())
        .sort((a, b) => data[a] - data[b]);

    console.log("result: ", res);
    return res;
}

city_date(data);
