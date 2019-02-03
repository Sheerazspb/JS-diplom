# Дипломное задание к курсу «Основы JavaScript»

## Задание

Вы помогаете крипто-стартапу сделать сайт-биржу, на котором можно обменивать валюту на токены этой компании (они называются "Неткоины") и передавать токены между пользователям.
Ваша задача состоит в том, чтобы написать основную логику сайта.

Программа, которую требуется реализовать, состоит из двух частей:

### Часть 1

Класс "Пользователь". Он должен уметь выполнять все основные функции:

-   Добавление нового пользователя
-   Авторизация
-   Добавление денег в личный кошелек
-   Конвертация валют
-   Перевод токенов другому пользователю

    Также, требуется написать функцию, которая возвращает текущий курс между валютами и "Неткоин".

    _Курс меняется каждую секунду_

### Часть 2

Программа, которая выполняет следующий пользовательский сценарий:

-   Добавление 2-х пользователей
-   Зачисление одному из них на счет 500000 евро
-   Перевод этих денег в токены "Неткоин".
-   Передача этих токенов другому пользователю


## Выполнение задания

### 1. Начало работы

1. Склонируйте этот репозиторий.
1. Установите [Docker](https://docs.docker.com/install/) для своей операционной системы.
1. В командной строке перейдите в папку с репозиторием.
1. Перед началом работы выполните следующие команды в командной строке:
    - `docker network create netcoin-network`
    - `docker run --name mongo -d -p 27017:27017 --network netcoin-network mongo`
    - `docker build -t netcoin-node .`
    - `docker run --name netcoin-api -d -p 1337:1337 --network netcoin-network -v $(pwd)/static:/usr/src/static netcoin-node`
1. Перейдите по [ссылке](http://localhost:1337) и убедитесь, что видите надпись **Биржа "Неткоин"**
1. В папке с проектом лежит файл `./static/main.js`. Задание следует выполнять в нем.

**Чтобы "сбросить" данные в базе, выполните следующую команду: `docker rm -f mongo && docker run --name mongo -d -p 27017:27017 --network netcoin-network mongo`**

### 2. Решение первой части задания

1. В файле `main.js` объявите класс `Profile`
1. Реализуйте методы, которые требуются в 1 части задания

Пример правильного метода:

```javascript
addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }
```

### 3. Решение второй части задания

1. В том же файле `main.js` начните реализацию главной функции, которая будет выполнять пользовательский сценарий
1. Не забудьте, что перед выполнением любых действий, кроме создания пользователя, ему необходимо авторизоваться

Пример:

```javascript
function main(){
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });
    // сначала создаем и авторизуем пользователя

    // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
            console.error('Error during adding money to Ivan');
            } else {
                console.log(`Added 500000 euros to Ivan`);
        });
}

main();
```

### Пример выводов в консоль успешно решенного задания

![Пример вывода](/output.png)

Для облегчения задачи, можно воспользоваться классом ApiConnector, который умеет делать все необходимые запросы к API биржи. Код класса находится в файле `api-connector.js`

### 4. Конец работы

1. Чтобы выключить приложение, выполните следующие команды в командной строке:
    - `docker rm -f mongo`
    - `docker rm -f netcoin-node`
    - `docker network rm netcoin-network`
1. Перейдите по [ссылке](http://localhost:1337) и убедитесь, что не видите надпись **Биржа "Неткоин"**


---
Исходный код дипломной работы нужно разместить на [GitHub](https://github.com/).


### Как правильно задавать вопросы дипломному руководителю?

**Что следует делать, чтобы все получилось:**

* Попробовать найти ответ сначала самому в интернете. Ведь, именно это скилл поиска ответов пригодится тебе на первой работе. И только после этого спрашивать дипломного руководителя
* В одном вопросе должна быть заложена одна проблема 
* По возможности, прикреплять к вопросу скриншоты и стрелочкой показывать где не получается. Программу для этого можно скачать здесь https://app.prntscr.com/ru/
* По возможности, задавать вопросы в комментариях к коду. 
* Начинать работу над дипломом как можно раньше! Чтобы было больше времени на правки. 
* Делать диплом по-частям, а не все сразу. Иначе, есть шанс, что нужно будет все переделывать :)  

**Что следует делать, чтобы ничего не получилось:**

* Писать вопросы вида “Ничего не работает. Не запускается. Всё сломалось.”
* Откладывать диплом на потом. 
* Ждать ответ на свой вопрос моментально. Дипломные руководители - работающие разработчики, которые занимаются, кроме преподавания, своими проектами. Их время ограничено, поэтому постарайтесь задавать правильные вопросы, чтобы получать быстрые ответы! 

