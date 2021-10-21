//html variable
var wallHTML1 = '<div id="wall-'
var wallHTML2 = '" class="wall"><div class="upper-wall" id="upper-'
var wallHTML3 = '"></div><div class="mid-wall" id="mid-'
var wallHTML4 = '"></div><div class="lower-wall" id="lower-'
var wallHTML5 = '"></div></div>';
//frame
var boxWidth = document.getElementById("frame").offsetWidth;
var boxHeight = document.getElementById("frame").offsetHeight;
var frame =  document.getElementById("frame")
var score = document.getElementById("score")

//variable
var block = 3;
if(boxWidth<550){
    block = 2
}
var position = []
var id = 1
var newElement = parseInt(boxWidth/block)
var display = newElement
var keyPress = false;
var intervalManager;
var gameRun = true;
var totalScore = 0;

function run(){
    //create new wall
    if(newElement/display==1){
        display = 0;
        totalScore+=1;
        score.innerText = totalScore
        var randomUpper = parseInt(Math.random()*(boxHeight/2-50)+50)
        var randomBottom = parseInt(Math.random()*(boxHeight/2-100)+100)
        frame.innerHTML = frame.innerHTML+wallHTML1+id+wallHTML2+id+wallHTML3+id+wallHTML4+id+wallHTML5
        document.getElementById("upper-"+id).style.height = randomUpper+"px";
        document.getElementById("mid-"+id).style.height = (randomBottom)+"px";
        document.getElementById("lower-"+id).style.height = (boxHeight-(randomUpper+randomBottom))+"px";
        var json = {
            id: id,
            x: randomUpper,
            y: randomBottom,
            right: 0,
        }
        position.push(json)
        id+=1
    }
    display+=1
    //wall position
    for(var i = 0; i<position.length&&!gameRun; i++){
        position[i].right += 1;
        document.getElementById("wall-"+(position[i].id)).style.right = position[i].right+"px"
    }
    if(!gameRun && position[0].right==boxWidth){
        document.getElementById("wall-"+position[0].id).remove()
        position.shift()
    }
    //box position
    var boxTop = document.getElementById("box").style.top.split("p")
    if(keyPress){
        var boxTopPosition = parseInt(boxTop[0])-2
    } else {
        var boxTopPosition = parseInt(boxTop[0])+1
    }
    document.getElementById("box").style.top = boxTopPosition+"px"
    //check box touch upper and lower border
    if(boxTopPosition<0 || boxTopPosition==boxHeight-40){
        gameOver();
    }
    //check box distroy in wall or not
    if(!gameRun && position[0].right>=boxWidth-165 && position[0].right<=boxWidth-85){
        if(boxTopPosition<position[0].x || boxTopPosition>(position[0].x+position[0].y-40)){
            gameOver();
        }
    }
}

function keyPressFunction(){
    keyPress = true;
}
function keyUpFunction(){
    keyPress = false;
    if(gameRun){
        document.body.onkeyup = startGame
        document.body.onmouseup = startGame
        document.body.ontouchend = startGame
    }
}
function gameOver(){
    clearInterval(intervalManager)
    frame.innerHTML = "<h2 class='show-info'>Game Over<br>Double Click for Restart The Game</h2><h4 class='show-info'>Total Score - "+totalScore+"</h4>"
    document.body.onkeydown = null
    document.body.onmousedown = null
    document.body.ontouchstart = null
    position = []
    id = 1
    keyPress = false;
    totalScore = 0;
    display = newElement;
    gameRun = true;
}
function start(){
    frame.innerHTML = '<div class="box" id="box"></div>';
    document.getElementById("box").style.top = boxHeight/2-100+"px"
    document.getElementById("box").style.left = 100+"px"   
    document.body.onkeyup = null
    document.body.onmouseup = null
    document.body.onkeydown = keyPressFunction
    document.body.onkeyup = keyUpFunction
    document.body.onmousedown = keyPressFunction
    document.body.onmouseup = keyUpFunction
    document.body.ontouchstart = keyPressFunction
    document.body.ontouchend = keyUpFunction
    intervalManager = setInterval(run,10)
}
function startGame(){
    if(gameRun){
        start()
        gameRun = false;
    }
}
