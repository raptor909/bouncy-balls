const screen = document.getElementById('screen');
const ctx = screen.getContext('2d');
screen.width = window.innerWidth;
screen.height = window.innerHeight;
const FRAMES_PER_SECOND = 60;
const backgroundColor = '#001';
const collision = false;
const gravity = true;
const gravityBounceMultiplier = 0.75;
const drawRect = (x, y, w, h, color) => {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fill();
}

const drawCircle = (x, y, r, color) => {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*4);
	ctx.closePath();
	ctx.fill();
}

const drawText = (text, x, y, color) => {
    ctx.fillStyle = color;
    ctx.font = '30px Arial';
    ctx.fillText(text, x, y);
}

function Ball(x=screen.width/2, y=screen.width/2, r=10, color='fff', velX, velY) {
	this.x = x;
    this.y = y;
	this.r = r;
	this.color = color;
	this.velocityX = velX;
    this.velocityY = velY;


    this.render = () => {
        drawCircle(this.x, this.y, this.r, this.color);
    }


    this.move = () => {

        if (gravity) this.velocityY += 1;

        this.x += this.velocityX;
        this.y += this.velocityY;

        /* ----------------------------- wall collision ----------------------------- */
        if (this.x+this.r >= screen.width || this.x-this.r <= 0){
            this.velocityX *= -1 * (gravity ? (gravityBounceMultiplier) : 1)
        }
        if (this.y >= screen.height || this.y <= 0){
            this.velocityY *= -1 * (gravity ? (gravityBounceMultiplier) : 1)
        }

        /* ----------------------- bottom of screen (gravity) ----------------------- */
        if (gravity && (this.y+this.r >= screen.height && this.velocityY >= 0)){
            this.y = screen.height-this.r;
            this.velocityY = 0;
        }

        /* ----------------------------- ball out of screen ----------------------------- */
        if (this.x > screen.width+50 || this.x < -50 || this.y > screen.height+50 || this.y < -50) {
            balls.splice(balls.indexOf(this), 1);
        }



        /* ----------------------------- ball collision ----------------------------- */
        if (!collision) {
            return;
        }
        balls.forEach(ball => {
            if (this === ball) {
                return;
            }
            if (Math.sqrt(Math.pow(this.x-ball.x, 2) + Math.pow(this.y-ball.y, 2)) <= this.r+ball.r) {
                this.velocityX *= -1;
                this.velocityY *= -1;
                ball.velocityX *= -1;
                ball.velocityY *= -1;
            }
        });
    }
}


const balls = [];
const addBall = () => {
    balls.push(new Ball(
        // x
        mouseX,
        // y
        mouseY,

        // radius
        // min: 10, max: 25
        Math.floor(Math.random() * (25 - 10)) + 10,
        

        // color
        '#'+Math.floor(Math.random()*(0xffffff + 1)).toString(16),

        // velocityX
        Math.random()*10-5,
        // velocityY
        Math.random()*10-5
    ));
}


let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('keydown', e => {
    switch (e.key) {
        case ' ':
            // add 50 balls
            for (let i = 0; i < 1; i++) {
                addBall();
            }
            break;
        case 'Backspace':
            for(let i = 0; i < balls.length; i++) {
                balls.splice(i, 1);
            }
            break;
    }
});


document.addEventListener('mousedown', () => {for(let i = 0; i < 50; i++) addBall()});





const update = () => {
   for (let i = 0; i < balls.length; i++) {
         balls[i].move();
    }
}

const render = () => {
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;

	// background
	drawRect(0, 0, screen.width, screen.height, backgroundColor);

	//ball
	for (let i = 0; i < balls.length; i++) {
        balls[i].render();
    }

    // ball counter
    drawText(balls.length, 0+30, 0+30, '#fff');
}

const game = () => {
    render();
	update();
}


// game loop
setInterval(game, 1000/FRAMES_PER_SECOND);