const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.width = 300;
canvas.height = 200;

let ball = { x: 150, y: 100, dx: 2, dy: 2, radius: 5 };
let paddle = { x: 110, y: 180, width: 80, height: 10 };

document.addEventListener("mousemove", (e) => {
    paddle.x = e.clientX - canvas.offsetLeft - paddle.width / 2;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuixar pilota
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Dibuixar pala
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    // Moviment de la pilota
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x < 0 || ball.x > canvas.width) ball.dx *= -1;
    if (ball.y < 0) ball.dy *= -1;

    // Rebot amb la pala
    if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy *= -1;
    }

    if (ball.y > canvas.height) {
        ball.x = 150;
        ball.y = 100;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
