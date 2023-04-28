const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let totalTime = 0; // счетчик

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = (sec) => {
  // вычисляем оставшееся время в часах, минутах, секундах
  const hours = Math.floor(sec / (1000 * 60 * 60))
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((sec / (1000 * 60)) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((sec / 1000) % 60)
    .toString()
    .padStart(2, '0');

  // обновляем интерфейс таймера
  if (totalTime == 0) {
		timerEl.textContent = 'hh:mm:ss';
  } else {
    timerEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
};

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const regex = /^\d+$/; // регулярное выражение для проверки на число
  const value = inputEl.value.split('');
  if (!regex.test(inputEl.value)) {
    value.splice(-1, 1);
    inputEl.value = value.join('');
  }
});

buttonEl.addEventListener('click', () => {
  if (!totalTime == 0) {
    clearInterval(intervalId);
  }
  // получаем введенное количество секунд и переводим в миллисекунды
  totalTime = inputEl.value * 1000;
  // обновляем интерфейс таймера
  createTimerAnimator(totalTime);

  // запускаем интервал обновления времени каждую миллисекунду
  intervalId = setInterval(() => {
    totalTime -= 1000;
    // обновляем интерфейс таймера
    createTimerAnimator(totalTime);

    // если время вышло, останавливаем таймер
    if (totalTime <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);

  inputEl.value = '';
});
