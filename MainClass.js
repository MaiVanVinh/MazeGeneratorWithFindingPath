import { Cell }   from "./Cell.js";
import { Player } from "./Player.js";
import { AStar }  from "./findingPath/AStar.js";
import { Eller }  from "./generatingMaze/Eller.js";
import { DFS }    from "./generatingMaze/DFS.js";

// Initialize the grid
const wide = 30;
let grid = [];
let cols, rows;
let cnv;

// Initialize the generator
let ellerSelection = false;
let dfsSelection = false;
let mazeGenerated = false; 

// Initialize player
let player;
let shortestPath = [];
let AStarAlgo = new AStar();

window.setup = function () {
    cnv = createCanvas(1200, 600);
    cnv.position(100, 50);
    cnv.hide();
    frameRate(60);

    cols = floor(width / wide);
    rows = floor(height / wide);

    player = new Player(0, 0, wide, cols, rows);
};

window.draw = function () {
    background(51);

    if (ellerSelection && !mazeGenerated) {
        resetGrid();
        let eller = new Eller(grid, cols, rows);
        grid = eller.EllerAlgo();
        mazeGenerated = true; 
    }else if(dfsSelection && !mazeGenerated){
        resetGrid();
        let dfs = new DFS(grid,wide);
        dfs.Begin();
        mazeGenerated = true; 
    }

    for (let i = 0; i < grid.length; i++) {
        grid[i].display(wide);
        grid[cols-1].hightlightCell(wide);
    }

    player.drawPlayer();
    if (shortestPath.length > 0) {
        drawPath();
    }
};


window.keyPressed = function () {
    if (keyCode === LEFT_ARROW) player.updateMoving(grid, LEFT_ARROW);
    if (keyCode === RIGHT_ARROW) player.updateMoving(grid, RIGHT_ARROW);
    if (keyCode === UP_ARROW) player.updateMoving(grid, UP_ARROW);
    if (keyCode === DOWN_ARROW) player.updateMoving(grid, DOWN_ARROW);
};


function resetGrid(){
    grid.length = 0; 
    shortestPath.length = 0;
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            grid.push(new Cell(i, j, cols, rows));
        }
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

let findingPathButton = document.getElementById('submit');
if (findingPathButton) {
    findingPathButton.addEventListener('click', () => {
        let comboBox = document.getElementById('selectPath');
        let option = comboBox.value;
        if (option === "A* Search") {
            let index = player.getIndex(player.i, player.j);
            shortestPath = AStarAlgo.Begin(grid[index], grid[cols - 1], grid);
        }
             
    });
}

let generatingMaze = document.getElementById('submitMaze');
if (generatingMaze) {
    generatingMaze.addEventListener('click', () => {
        let comboBox = document.getElementById('chooseAlgo');
        let option = comboBox.value;
        if (option === "Eller") {
            ellerSelection = true;
            mazeGenerated = false; 
        } else {
            dfsSelection = true;
            mazeGenerated = false; 
        }
    });
}



const startGame = document.getElementById("removeOverlayButton");
if(startGame){
    let overlay = document.getElementById("overlay");
    startGame.addEventListener("click", () => {
        overlay.classList.add("slide-away");
        setTimeout(() => {
            overlay.style.display = "none"; 
            cnv.show();
        }, 800);
        
    });
}    