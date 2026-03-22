const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x * 20, part.y * 20, 18, 18);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * canvas.width / 20);
    food.y = Math.floor(Math.random() * canvas.height / 20);
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            direction = { x: 1, y: 0 };
            break;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawSnake();
    drawFood();
    setTimeout(gameLoop, 100);
}

document.addEventListener('keydown', changeDirection);
placeFood();
gameLoop();
