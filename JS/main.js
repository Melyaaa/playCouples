import Card from './card.js'
// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
let firstCard = null;
let secondCard = null;
function createNumbersArray(count) {
  let numbersArray = [];

  for (let i = 1; i <= count; i++) {
    numbersArray.push(i, i);
  }

  return numbersArray;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
let cardsArr = [];
let cardsNumArr = [];
function shuffle(arr) {
  let m = arr.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  cardsArr = arr;
}
// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.


function startGame(container) {
  let form = document.querySelector('.form');
  let input = document.querySelector('.input');
  let btn = document.querySelector('.btn');
  btn.disabled = true;

  input.addEventListener('input', function() {
    if (input.value !== ""){
      btn.disabled = false;
    } else {
      btn.disabled = true
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    shuffle(createNumbersArray(input.value));

    for (const cardNumber of cardsArr) {
      cardsNumArr.push(new Card(container, cardNumber, flip))
    }

    input.value = null;
    input.disabled = true;

    function flip(card) {
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number !== secondCard.number) {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
        }
      }

      if (firstCard == null) {
        firstCard = card;
        console.log(firstCard);
      } else {
        if (secondCard == null) {
          secondCard = card
          console.log * (secondCard)
        }
      }

      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number == secondCard.number) {
          firstCard.success = true;
          secondCard.success = true;
          firstCard = null;
          secondCard = null;
        }
      }


      if (document.querySelectorAll('.card.success').length == cardsNumArr.length) {
        alert('Вы выиграли!');
        input.disabled = false;
        container.innerHTML = '';
        cardsArr = [];
        cardsNumArr = [];
        firstCard = null;
        secondCard = null;

        startGame(container);
      }
    }
  });
}

startGame(document.getElementById('game'))

