const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

let keys = {
    ArrowUp :   false ,
    ArrowDown:  false,
    ArrowRight: false,
    ArrowLeft : false,
}

startScreen.addEventListener('click',start);

let player = {speed:5,score : 0 };
document.addEventListener('keydown',keydown);
document.addEventListener('keyup',keyup);



function keydown(e){
    e.preventDefault();  //we dont want js  functionality
    keys[e.key] = true ;
    // console.log(keys);
    
}
function keyup(e){
    e.preventDefault();  //we dont want js  functionality
    keys[e.key] = false ;
    // console.log(keys);

    
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = `<h2>Game Over</h2>
                             <h3>Your Final Score is ${player.score}</h3> <p>Click to start again <p>`

}

function isCollied(a,b){ // ->a represent position of our a and b represent position of enemy car 
aRect = a.getBoundingClientRect();
bRect = b.getBoundingClientRect();

return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) 
|| (aRect.right<bRect.left)  || (aRect.left > bRect.right)
) 

}  

function movelines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
      item.y += player.speed ;
      item.style.top =  item.y + "px" ;
      if(item.y >800){
        item.y-=750 ;
    }
})
}
function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){  
        if(isCollied(car,item)) {
            endGame();
            console.log("Boom Hit ") 
             
        }   
        if(item.y >=750){
            item.y  = -320 ;
            item.style.left = Math.floor(Math.random() * 350)+"px";
        }
        item.y += player.speed ;
        item.style.top =  item.y + "px" ;
    })
}

function gamePlay(){
    let car = document.querySelector('.car');
    const road = gameArea.getBoundingClientRect();
    // console.log(road);
    if(player.start){
       
        movelines();
        moveEnemy(car);
        
        if(keys.ArrowUp && player.y > (road.top + 30) ){
            player.y -= player.speed  ;
            // console.log(player.y)
        }
        if(keys.ArrowDown && player.y < (road.bottom - 75)){
            player.y +=player.speed  ;
            // console.log(player.y)
        }
        if(keys.ArrowLeft && player.x>0){
            player.x -= player.speed  
            // console.log(player.y)
        }
        if(keys.ArrowRight && player.x < (road.width-50) ){
            player.x +=player.speed  ;
            // console.log(player.y)
        }

        car.style.top = player.y + "px" ;
        car.style.left = player.x + "px" ;
        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);
        player.score++ ;
        score.innerText = player.score;
    }

}
function start(){
    startScreen.classList.add('hide')
    gameArea.innerHTML = '';
    player.start = true ;
    player.score = 0 ;
    
for(x = 0 ; x<10 ; x++){

    let roadLine = document.createElement('div');
    roadLine.setAttribute('class','lines');
    roadLine.y = x*150 ;
    roadLine.style.top =  roadLine.y + "px" ;
    gameArea.appendChild(roadLine);
}
function randomColor(){
    function c(){
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0"+String(hex)).substr(-2);
    }

return "#"+c()+c()+c()
}

let car = document.createElement('div');
car.setAttribute('class','car');
// car.innerText= " Hey I 'm you car ";
player.x = car.offsetLeft;
player.y = car.offsetTop;

for(x = 0 ; x<4; x++){
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class','enemy');
    enemyCar.y = ((x+1)*350) * -1  ;
    enemyCar.style.top =  enemyCar.y + "px" ;
    enemyCar.style.backgroundImage = 'url("car4.png")' ;
    // enemyCar.style.backgroundImage = randomColor() ;
    enemyCar.style.left = Math.floor(Math.random() * 350)+"px";
    gameArea.appendChild(enemyCar);
}

    gameArea.appendChild(car);
    window.requestAnimationFrame(gamePlay);

}