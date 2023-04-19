const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
document.addEventListener("keyup", event => {
    //  console.log(event);
    if (event.key === " ") {
        gameStart()
    }
});

let canvasW = canvas.width;
let canvasH = canvas.height;

let x,
    y,
    dx,
    dy,
    px,
    py,
    pw,
    r = 10,
    tr,
    bw,
    bh,
    bo,
    bs,
    score;
let rp = false,
    lp = false;

let interval;
variables();
subvar();
ball();
//gameStart();
cba();
brick();
Score();
paddle();
keyborad();
box();
welcome();

function onSpaceClick(event) {
    console.log(event)
}

function gameStart() {
    console.log('-------------->');
    if (interval == null) {
        interval = setInterval(() => {

            if (rp && px < canvasW - pw) {
                px += 5;
            }
            if (lp && px > 0) {
                px -= 5;
            }
            movement();
            x += dx;
            y += dy;
            // px += dx
            // console.log(x, px);
            ctx.clearRect(0, 0, canvasW, canvasH);
            checkGameOver();
            ball();
            paddle();
            brick();
            Score();
        }, 20);

        //  console.log(interval);
    }
}

function checkGameOver() {
    if (y === canvasH) {
        clearInterval(interval);
        interval = null;
        subvar();
        box();
        endGame();
        variables();
        cba();
    }
}

function checkYouWon() {
    if (score === 36) {
        alert("You Won!!");
        clearInterval(interval);
        variables();
        subvar();
        interval = null;
        cba();
        box();
        won();
    }
}

function subvar() {
    if (tr != null) {
        dx = -5;
        dy += 10;
        dy = -5;
    } else {
        dx = 5;
        dy += 10;
        dy = -5;
    }
}

function variables() {
    bw = 40;
    bh = 10;
    bo = 8;
    bs = [];
    score = 0;

    x = canvasW / 2;
    y = canvasH - 20;
    //dx = 5;

    pw = 60;
    px = canvasW / 2 - pw / 2;
    py = canvasH - 10;
    tr = null;
}

function movement() {
    if (x + dx >= canvasW || x + dx < 0) {
        dx = -dx;
    }
    if (y + dy > canvasH - r) {
        if (x + dx > px && x + dx < px + pw / 2) {
            dy = -dy;
            dx += 0.5;
            tr = 1;
            subvar();
        }

        if (x + dx >= px + pw / 2 && x + dx <= px + pw) {
            dy = -dy;
            dx += 0.5;
            tr = null;
            subvar();
        }
    }

    if (y + dy < 0) {
        dy = -dy;
    }

    for (let b = 0; b < bs.length; b++) {
        for (let i = 0; i < bs[b].length; i++) {
            let bri = bs[b][i];
            if (bri.isVisible) {
                if (x > bri.x && x < bri.x + bw && y > bri.y && y < bri.y + bh) {
                    bs[b][i].isVisible = false;
                    score++;
                    dy = -dy;
                    checkYouWon();
                }
            }
        }
    }
}

function keyborad() {
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUP);
    document.addEventListener("mousemove", (e) => {
        px = e.screenX;
    });
    //document.addEventListener("mo", keyUP);
    function keyDown(e) {
        if (e.key === "ArrowRight") {
            rp = true;
        }
        if (e.key === "ArrowLeft") {
            lp = true;
        }
    }

    function keyUP(e) {
        if (e.key === "ArrowRight") {
            rp = false;
        }
        if (e.key === "ArrowLeft") {
            lp = false;
        }
    }
}

function ball() {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    // ctx.stroke();
}

function cba() {
    for (let i = 0; i < 6; i++) {
        bs[i] = [];
        for (let j = 0; j < 6; j++) {
            bs[i][j] = { x: 0, y: 0, isVisible: true };
        }
    }
}

function brick() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (bs[i][j].isVisible) {
                let bX = 10 + j * (bw + bo),
                    bY = (10 + bo) * (i + 1);
                bs[i][j].x = bX;
                bs[i][j].y = bY;
                ctx.beginPath();
                ctx.rect(bX, bY, bw, bh);
                ctx.fillStyle = "gold";
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    //console.log(bs);
}

function paddle() {
    ctx.beginPath();
    ctx.rect(px, py, pw, 10);
    ctx.fillStyle = "red";
    ctx.stroke;
    ctx.fill();
    ctx.closePath();
}

function Score() {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.fillText("Score:- " + score, 10, 10);
    ctx.closePath();
}

function welcome() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillText("_______!! Welcome! to the Game !!________", 50, 200, 200);
    ctx.fillText("_______!! Highest Score = 36 !!________", 50, 220, 200);
    ctx.fillText("______!! Press Spacebar to start  the game !!______", 50, 240, 200);
    ctx.fill();
    ctx.closePath();
}

function endGame() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillText("_______!! Game Over !!________", 50, 200, 200);
    ctx.fillText("_______!! Score: " + score + " !!_________", 50, 220, 200);
    ctx.fillText("______!! Press Spacebar to start  agin !!______", 50, 240, 200);
    ctx.fill();
    ctx.closePath();
}

function won() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillText("_______!! You Won the Game !!________", 50, 200, 200);
    ctx.fillText("_______!! Score: " + score + " !!_________", 50, 220, 200);
    ctx.fillText("______!! Press Spacebar to start agin!!______", 50, 240, 200);
    ctx.fill();
    ctx.closePath();
}


function box() {
    ctx.beginPath();
    ctx.moveTo(10, 180);
    ctx.lineTo(290, 180);
    ctx.lineTo(290, 260);
    ctx.lineTo(10, 260);
    ctx.lineTo(10, 180);
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}