const canvas = document.getElementById("gameBorder");
const ctx = canvas.getContext('2d');


let canvasW, canvasH, lp, rp, upp, dp, areaW, areaH, dx, Rx, Ry, dy, score = 0,
    sw, sh, interval, dir;

let snakes = [{ x: 10, y: 30 }]
variable();
gameArea();
snakebody();
// movement();

Start();
// gameStart();
keyboard();
Score();
randPos();
food();
welcome();

function gameStart() {
    if (!interval) {

        interval = setInterval(() => {

            movement();
            const head = { x: snakes[0].x + dx, y: snakes[0].y + dy };
            snakes.unshift(head);
            snakes.pop();
            ctx.clearRect(0, 0, canvasW, canvasH);
            gameArea();
            snakebody();
            keyboard();
            food();
            foodPos();
            Score();
            gameOver();

            //       variable();



        }, 100);
    }
}

function Start() {
    document.addEventListener('keyup', keyStart);

    function keyStart(e) {

        if (e.key == " ") {
            gameStart();

        }
    }
}

function gameOver() {
    if (snakes[0].x < 0 || snakes[0].y < 20 || snakes[0].x >= canvasW || snakes[0].y >= canvasH) {
        alert("GameOver!\nScore:- " + score);
        reset();
        location.reload();
    }
}

function reset() {
    clearInterval(interval);
    interval = null;

    snakes = [{ x: 10, y: 30 }];
    score = 0;
    snakebody();
    randPos();
}

function foodPos() {
    if (Rx === snakes[0].x && Ry === snakes[0].y) {
        snakes.push({ x: sw, y: sh })
        randPos();
        score++;
        console.log(snakes[0].x, snakes[0].y);

    }
}

function keyboard() {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);


    function keyDown(e) {
        // console.log(e.key);
        if (e.key === "ArrowLeft") {
            lp = true;
        }
        if (e.key === "ArrowUp") {
            up = true;
        }
        if (e.key === "ArrowRight") {
            rp = true;
        }
        if (e.key === "ArrowDown") {
            dp = true;
        }
        //    console.log(lp, rp, up, dp);
    }

    function keyUp(e) {

        //console.log(e);
        if (e.key === "ArrowLeft") {
            lp = false;
        }
        if (e.key === "ArrowUp") {
            up = false;
        }
        if (e.key === "ArrowRight") {
            rp = false;
        }
        if (e.key === "ArrowDown") {
            dp = false;
        }

    }

}

function movement() {
    if (lp) {
        dx = -sw
        dy = 0;
    }
    if (up) {
        dy = -sw;
        dx = 0;
        //   console.log("hi");
    }
    if (rp) {
        dx = sw;
        dy = 0;
    }
    if (dp) {
        dy = sh;
        dx = 0;
    }
}

function randPos() {
    Rx = Math.floor(Math.random() * 300 / 5) * 5;
    Ry = Math.floor(Math.random() * 300 / 5) * 5 + 20;
}

function food() {
    ctx.beginPath();
    ctx.rect(Rx, Ry, sw, sh);
    // ctx.arc(Rx, Ry, sw, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
}





function variable() {
    canvasW = canvas.width;
    canvasH = canvas.height;
    areaW = canvasW;
    areaH = canvasH - 20;
    lp = false;
    rp = false;
    up = false;
    dp = false;
    sw = sh = 5;
    dx = sw;
    dy = 0;
}
// console.log(canvasH, areaH);

function snakebody() {
    snakes.forEach(snake => {
        ctx.beginPath();
        ctx.rect(snake.x, snake.y, sw, sh);
        // ctx.arc(snake.x, snake.y, sw, 2 * Math.PI, false);
        ctx.fillStyle = "green";
        ctx.fill();
        //ctx.stroke();
        ctx.closePath();
    })
}

function gameArea(x, y) {
    ctx.beginPath();
    ctx.rect(0, 20, areaW, areaH);
    ctx.fillStyle = "lightgray";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function Score() {
    ctx.fillText("Score:-  " + score, 10, 10, 60);
    ctx.fill();
}

function welcome() {
    ctx.fillText("_____! Welcome !_____", 100, 150, 150);
    ctx.fillText("_____! Press Spacebar to start !_____", 70, 180, 200);
    ctx.fill();
}