var dh = 25;
var dw = 50;
var dS = 0.2;
var myUAV;
function setup(){
	createCanvas(800,600);
	frameRate(30);
	myUAV = new UAV();
}
function draw(){
	background(51);
	checkKeyboardInput();
	myUAV.update();
	myUAV.show();
	console.log("Speed: " + myUAV.speed.mag() + " test");
}

function UAV(){
	this.pos = createVector(width/2,height/2);
	this.speed = createVector(0,0);
	
	this.update = function(){
		this.pos.add(this.speed);
		
		if (this.pos.x > width-dw/2){
			this.pos.x = width-dw/2;
			this.speed.x = 0;
		}
		if (this.pos.x < dw/2){
			this.pos.x = dw/2;
			this.speed.x = 0;
		}
		if (this.pos.y < dh/2){
			this.pos.y = dh/2;
			this.speed.y = 0;
		}
		if (this.pos.y > height-dh/2){
			this.pos.y = height-dh/2;
			this.speed.y = 0;
		}
		
		this.speed.limit(20);
		this.speed.div(1.05);
		if (this.speed.mag() < 0.25)
			this.speed.setMag(0);
	}
	this.show = function(){
		ellipse(this.pos.x,this.pos.y,dw,dh);
	}
}

function checkKeyboardInput(){
	if (keyIsDown(LEFT_ARROW))
		myUAV.speed.x -= 1;
	if (keyIsDown(RIGHT_ARROW))
		myUAV.speed.x += 1;
	if (keyIsDown(DOWN_ARROW))
		myUAV.speed.y += 1;
	if (keyIsDown(UP_ARROW))
		myUAV.speed.y -= 1;
}