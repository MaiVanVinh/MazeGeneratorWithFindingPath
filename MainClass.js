import { Cell } from "./Cell.js";
import { Player } from "./Player.js";

const wide = 40;
var grid = [];
var cols, rows;
var currentCell;
var stack = [];
var player;

window.setup = function() {
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

    player = new Player(0, 0, wide ,cols, rows);
}

window.draw = function() {
    background(51);

    for (var i = 0; i < grid.length; i++) {
        grid[i].display(wide);
    }

    currentCell.visited = true;

    var nextCell = currentCell.checkNeighbors(grid);

    if (nextCell) {
        nextCell.visited = true;
        stack.push(currentCell);
        removeWalls(currentCell, nextCell);
        currentCell = nextCell;
    } else if (stack.length > 0) {
        currentCell = stack.pop();
    }

    if(stack.length == 0){
       player.drawPlayer();
       player.updateMoving(grid);
    }   
}


window.keyPressed= function() {
    if (keyCode === LEFT_ARROW) player.moving[0] = true;
    if (keyCode === RIGHT_ARROW) player.moving[2] = true;
    if (keyCode === UP_ARROW) player.moving[3] = true;
    if (keyCode === DOWN_ARROW) player.moving[1] = true;
}

window.keyReleased = function()  {
    if (keyCode === LEFT_ARROW) player.moving[0] = false;
    if (keyCode === RIGHT_ARROW) player.moving[2] = false;
    if (keyCode === UP_ARROW) player.moving[3] = false;
    if (keyCode === DOWN_ARROW) player.moving[1] = false;
}


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