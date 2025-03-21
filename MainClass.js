import { Cell } from "./Cell.js";
import { Player } from "./Player.js";
import { AStar } from "./findingPath/AStar.js";


// Initialize the grid
const wide = 40;
var grid = [];
var cols, rows;

// Generate the maze using DFS
var currentCell;
var stack = [];

// Initialize player to escape the maze
var player;

// Finding path Algorithms
var shortestPath = [];
var AStarAlgo = new AStar();


// Handle the submission
var findingPathButton = document.getElementById('summit') 
if (findingPathButton) {
    findingPathButton.addEventListener('click', () => {
        let comboBox = document.getElementById('selectPath') 
        let option = comboBox.value;
        if(option == "A* Search"){
            let index = player.getIndex(player.i,player.j);
            shortestPath = AStarAlgo.Begin(grid[index], grid[grid.length-1],grid);

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
    let index = player.getIndex(player.i,player.j);
    if(grid[index] == grid[grid.length-1])
        console.log("Good boi")
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


