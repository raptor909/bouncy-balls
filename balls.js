const screen = document.getElementById('screen');
const ctx = screen.getContext('2d');
screen.width = window.innerWidth;
screen.height = window.innerHeight;
const FRAMES_PER_SECOND = 60;

const backgroundColor = '#001';

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

function Ball(x=screen.width/2, y=screen.width/2, r=10, color, speed, degrees=0) {
	this.x = x;
    this.y = y;
	this.r = r;
	this.color = color;
    this.velocityY = Math.sin(degrees) * speed;
	this.velocityX = Math.cos(degrees) * speed;
    this.render = () => {
        drawCircle(this.x, this.y, this.r, this.color);
    }
    this.move = () => {
        this.x += this.velocityX;
        this.y += this.velocityY;

        /* ----------------------------- wall collision ----------------------------- */
        if (this.x+this.r >= screen.width || this.x-this.r <= 0){
            this.velocityX *= -1
        }
        if (this.y >= screen.height || this.y <= 0){
            this.velocityY *= -1
        }
    }
}






const ball = new Ball(screen.width/2, screen.height/2, 10, 'white', 5, 180);

const ball2 = new Ball(screen.width/2, screen.height/2, 10, 'skyblue', 10, 2);
const ball3 = new Ball(screen.width/2, screen.height/2, 10, '#bfb', 2, 10);


const update = () => {
    ball.move();
    ball2.move();
    ball3.move();
}

const render = () => {
    // screen.width = window.innerWidth;
    // screen.height = window.innerHeight;

	// background
	drawRect(0, 0, screen.width, screen.height, backgroundColor);

	//ball
	ball.render();
    ball2.render();
    ball3.render();
}

const game = () => {
	render();
	update();
}


// game loop
setInterval(game, 1000/FRAMES_PER_SECOND);