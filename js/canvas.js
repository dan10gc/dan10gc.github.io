const canvas = document.getElementById("canvas"),
    parent = document.getElementById("parent",)
    context = canvas.getContext("2d"),
    colorPallete = ["#ff1783", "#6701BE", "#558DFC", "#FFD23F", "#5EFC8D"];

let width = canvas.width = parent.offsetWidth,
    height = canvas.height = parent.offsetHeight,
    origin = { x: width / 2, y: height / 2 },
    mouse = { x: width / 2, y: height / 2 },
    balls = [],
    count = 0,
    randomCount = 1;

window.onresize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    origin = { x: width / 2, y: height / 2 };
}

class Ball {
    constructor() {
        this.x = origin.x;
        this.y = origin.y;
        this.angle = Math.PI * 2 * Math.random();
        this.vx = (1.3 + Math.random() * .3) * Math.cos(this.angle);
        this.vy = (1.3 + Math.random() * .3) * Math.sin(this.angle);
        this.r = 7 + 3 * Math.random();
        this.color = colorPallete[Math.floor(Math.random() * colorPallete.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.r -= 0.01;
    }
}

//end constructor

loop();
function loop() {
    context.clearRect(0, 0, width, height);
    if (count === randomCount) {
        balls.push(new Ball());
        count = 0;
        randomCount = 2 + Math.floor(Math.random() * 5);
    }
    count++;
    for (var i = 0; i < balls.length; i++) {
        let ball = balls[i];
        context.fillStyle = ball.color;
        context.beginPath();
        context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, false);
        context.fill();
        ball.update();
    }

    context.fillStyle = "#FFD23F";
    context.beginPath();
    context.arc(origin.x, origin.y, 30, 0, Math.PI * 2, false);
    context.fill();

    removeBall();
    requestAnimationFrame(loop);
}

function removeBall() {
    for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        if (
            b.x + b.r < 0 ||
            b.x - b.r > width ||
            b.y + b.r < 0 ||
            b.y - b.r > height ||
            b.r <= 0
        ) {
            balls.splice(i, 1);
        }
    }
}


