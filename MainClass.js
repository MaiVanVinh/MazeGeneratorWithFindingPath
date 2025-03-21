import { Cell } from "./Cell.js";
import { Player } from "./Player.js";

const wide = 40;
var grid = [];
var cols, rows;
var currentCell;
var stack = [];
var player;
var shortestPath = [];

var findingPathButton = document.getElementById('summit') 
if (findingPathButton) {
    findingPathButton.addEventListener('click', () => {
        let comboBox = document.getElementById('selectPath') 
        let option = comboBox.value;
        console.log("yes");
        if(option == "A* Search"){
            let index = player.getIndex(player.i,player.j);
            AStarAlgo(grid[index], grid[grid.length-1]);

        }
          
    });
  }

window.setup = function () {
    let cnv = createCanvas(400, 400);
    cnv.position(200, 50);
    frameRate(60);

    cols = floor(width / wide);
    rows = floor(height / wide);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            grid.push(new Cell(i, j, cols, rows));
        }
    }

    currentCell = grid[0];
    player = new Player(0, 0, wide, cols, rows);

};

window.draw = function () {
    background(51);
    
    for (var i = 0; i < grid.length; i++) {
        grid[i].display(wide);
    }
    
    currentCell.visited = true;
    currentCell.hightlightCurrentCell(wide);
    var nextCell = currentCell.checkNeighbors(grid);
    
    if (nextCell) {
        nextCell.visited = true;
        stack.push(currentCell);
        removeWalls(currentCell, nextCell);
        currentCell = nextCell;
    } else if (stack.length > 0) {
        currentCell = stack.pop();
    }

    if (stack.length == 0) {
        if (shortestPath.length > 0) {
            drawPath();
        }
        player.drawPlayer();
    }
};

window.keyPressed = function () {
    if(keyCode === LEFT_ARROW)
        player.updateMoving(grid,LEFT_ARROW);
     if(keyCode === RIGHT_ARROW)
        player.updateMoving(grid,RIGHT_ARROW);
     if(keyCode === UP_ARROW)
        player.updateMoving(grid,UP_ARROW);
     if(keyCode === DOWN_ARROW)
        player.updateMoving(grid,DOWN_ARROW);
        
};



function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function AStarAlgo(start,end){
    let openSet  = [];
    let closeSet = [];
    
    start.g = 0;
    start.h = heuristic(start, end);
    start.f = start.g + start.h;

    openSet.push(start);

    while(openSet.length > 0){
        // Pick the lowest f value from the openSet
        let index = 0;
        let minValue = Number.MAX_SAFE_INTEGER;
        for(let i = 0; i < openSet.length; i++){
            if(minValue < openSet[i].f){
                minValue = openSet[i].f;
                index = i;
            }

        }

        let current = openSet[index];

        if(current === end){
            console.log("Path Found");
            let temp = current;
            shortestPath.push(temp);
            while (temp.getPreviousCell()) {
                shortestPath.push(temp.getPreviousCell());
                temp = temp.getPreviousCell();
            }

            return shortestPath;
        }
        
        openSet.splice(current,1);
        closeSet.push(current);
        
        // Now explore all the neighbors of current node
        let neighbors = current.getNeighbors(grid);
        for(let n of neighbors){
            if(closeSet.includes(n))
                continue;

            let tempG = n.g + 1;
            if(!openSet.includes(n)){
                n.g = tempG;
                openSet.push(n);
            }else{
                if(tempG < n.g){
                   n.g = tempG;
                }    
            }

            n.previousCell(current);
            n.h = heuristic(n,end);
            n.f = n.g + n.h;
            
        }
      
    }return [];
}

function heuristic(a,b){
   return abs (a.i - b.i) + abs (a.j - b.j);
}

function drawPath() {
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let cell of shortestPath) {
        vertex(cell.i * wide + wide / 2, cell.j * wide + wide / 2);
    }
    endShape();
}


