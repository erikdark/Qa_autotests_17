const carPrices = [
    { min: 500, max: 750, step: 50 },
    { min: 750, max: 1500, step: 100 },
    { min: 15000, max: 25000, step: 1000 }
];

const carCards = document.querySelectorAll('.car-card');
const buyButtons = document.querySelectorAll('.car-card button');
const messages = document.querySelectorAll('.car-card .message');

for (let i = 0; i < carCards.length; i++) {
    const card = carCards[i];
    const priceElement = card.querySelector('#price' + (i + 1));
    const buyButton = buyButtons[i];
    const message = messages[i];

    // Сгенерировать случайную цену в заданном диапазоне
    function generateRandomPrice(range) {
        const min = range.min;
        const max = range.max;
        const step = range.step;
        let price = Math.floor(Math.random() * ((max - min) / step)) * step + min;
        return price;
    }

    let currentPrice = generateRandomPrice(carPrices[i]);
    priceElement.textContent = currentPrice;

    // Снижать цену каждые 1 секунду
    let intervalId = setInterval(() => {
        currentPrice -= 50;

        // Проверка на достижение "выигрышной" цены
        if (currentPrice === 550) {
            // **Изменение:** Сообщение выводится только при нажатии кнопки
            buyButton.addEventListener('click', () => {
                clearInterval(intervalId);
                buyButton.disabled = true;
                message.textContent = 'Вы успешно купили автомобиль!';
                message.classList.add('success');
                message.style.display = 'block';
            });
        }

        // Обновление цены на карточке
        priceElement.textContent = currentPrice;

        // Проверка на то, что цена достигла минимума
        if (currentPrice < carPrices[i].min) {
            clearInterval(intervalId);
            buyButton.disabled = true;
            message.textContent = 'К сожалению, акция закончилась.';
            message.classList.add('error');
            message.style.display = 'block';
        }
    }, 1000);
}
