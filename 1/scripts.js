// Функция для нахождения максимального числа в массиве
function findMax(arr) {
    // Здесь напишите свою логику
}

// Проверка работы функции
console.log(findMax([3, 7, 2, 9, 5])); // Должно вывести 9

function testFunction() {
    alert("Код выполняется!");
}

// Объекты Задание 1 Напишите функцию countProperties(obj), которая принимает объект и возвращает количество его собственных (не унаследованных) свойств.
function countProperties(obj) {
    return Object.keys(obj).length;
}

const user1 = { name: "Alice", age: 25, city: "New York" };
console.log(countProperties(user1)); // 3

// Объекты Задание 2 Напишите функцию hasProperty(obj, key), которая проверяет, существует ли указанное свойство key в объекте obj.
function hasProperty(obj, key) {
    return Object.hasOwn(obj, key)
}

const user2 = { name: "Bob", age: 30 };
console.log(hasProperty(user2, "age")); // true
console.log(hasProperty(user2, "city")); // false

// Объекты Задание 3 Напишите функцию mergeObjects(obj1, obj2), которая объединяет два объекта. Если в обоих объектах есть одинаковые свойства, пусть берется значение из obj2.
function mergeObjects(obj1, obj2) {
    return Object.assign(obj1, obj2)
}

const obj1 = { name: "Alice", age: 25 };
const obj2 = { age: 30, city: "London" };
console.log(mergeObjects(obj1, obj2));
// { name: "Alice", age: 30, city: "London" }

// Объекты Задание 4 Напишите функцию getObjectKeys(obj), которая возвращает массив всех ключей переданного объекта.
function getObjectKeys(obj) {
    return Object.keys(obj);
}

const car = { brand: "Toyota", model: "Camry", year: 2022 };
console.log(getObjectKeys(car));
// ["brand", "model", "year"]

// Объекты Задание 5 Напишите функцию removeProperty(obj, key), которая удаляет свойство key из объекта obj, если оно существует.
function removeProperty(obj, key) {
    delete obj[key];
}

const book = { title: "1984", author: "George Orwell", year: 1949 };
removeProperty(book, "year");
console.log(book);
// { title: "1984", author: "George Orwell" }

// Функции Задание 1 Напишите функцию factorial(n), которая принимает число n и возвращает его факториал (n!).
function factorial(n) {
    if (n < 0) {
        return undefined;
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
console.log(factorial(3)); // 6

// Функции Задание 2 Напишите функцию isPrime(n), которая принимает число n и возвращает true, если число простое, и false, если нет.
function isPrime(n) {
    if (n <= 1) return false; // 0 и 1 не являются простыми числами
    if (n === 2) return true; // 2 — единственное чётное простое число
    if (n % 2 === 0) return false; // остальные чётные — не простые

    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

console.log(isPrime(7));  // true
console.log(isPrime(10)); // false
console.log(isPrime(2));  // true

// Функции Задание 3 Напишите функцию sumAll(...numbers), которая принимает любое количество чисел и возвращает их сумму.
function sumAll(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0)
}

console.log(sumAll(1, 2, 3, 4)); // 10
console.log(sumAll(5, 10, 15));  // 30
console.log(sumAll());           // 0

// Функции Задание 4 Напишите функцию reverseString(str), которая принимает строку и возвращает её в обратном порядке.
function reverseString(str) {
    return str.split('').reverse().join('')
}

console.log(reverseString("hello")); // "olleh"
console.log(reverseString("JavaScript")); // "tpircSavaJ"
// Функции Задание 5  Напишите функцию formatName(name), которая принимает строку с именем и возвращает его в формате: первая буква заглавная, остальные строчные.
function formatName(name) {
    let nameArr = name.toLowerCase().split("");
    nameArr[0] = name[0].toUpperCase();
    return nameArr.join('');
}

console.log(formatName("aLiCe")); // "Alice"
console.log(formatName("BOB")); // "Bob"
console.log(formatName("john")); // "John"

// Массивы Задание 1 Напишите функцию findMax(arr), которая принимает массив чисел и возвращает наибольшее число из него.
function findMax(arr) {
    if (arr.length === 0) return undefined;
    return Math.max(...arr);
}

console.log(findMax([3, 7, 2, 9, 5])); // 9
console.log(findMax([-10, -3, -5, -1])); // -1
console.log(findMax([100])); // 100

// Массивы Задание 2 Напишите функцию filterEvenNumbers(arr), которая принимает массив чисел и возвращает новый массив, содержащий только четные числа.
function filterEvenNumbers(arr) {
    return arr.filter((num) => num % 2 === 0);
}

console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6])); // [2, 4, 6]
console.log(filterEvenNumbers([7, 9, 11])); // []
console.log(filterEvenNumbers([12, 14, 15, 17])); // [12, 14]

// Массивы Задание 3 Напишите функцию mergeUnique(arr1, arr2), которая принимает два массива и возвращает новый массив, содержащий все уникальные элементы из обоих массивов.
function mergeUnique(arr1, arr2) {
    let set = new Set();
    arr1.forEach((e) => set.add(e));
    arr2.forEach((e) => set.add(e));
    return Array.from(set);
}

console.log(mergeUnique([1, 2, 3], [3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(mergeUnique([7, 8], [8, 9, 10])); // [7, 8, 9, 10]
console.log(mergeUnique([], [1, 2, 3])); // [1, 2, 3]

// Массивы Задание 4 Напишите функцию reverseArray(arr), которая принимает массив и возвращает новый массив с элементами в обратном порядке.
function reverseArray(arr) {
    return arr.reverse();
}

console.log(reverseArray([1, 2, 3])); // [3, 2, 1]
console.log(reverseArray(["a", "b", "c"])); // ["c", "b", "a"]
console.log(reverseArray([true, false, true])); // [true, false, true]

// Массивы Задание 5 Напишите функцию findIndex(arr, value), которая принимает массив и значение, а затем возвращает индекс первого вхождения этого значения в массиве. Если элемента нет – вернуть -1.
function findIndex(arr, value) {
    return arr.indexOf(value);
}

console.log(findIndex([10, 20, 30, 40], 30)); // 2
console.log(findIndex(["apple", "banana", "cherry"], "banana")); // 1
console.log(findIndex([1, 2, 3], 4)); // -1