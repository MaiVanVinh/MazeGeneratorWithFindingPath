import { Cell }       from "/mazeGame/Cell.js"; 
import { Player }     from "/mazeGame/Player.js";
import { AStar }      from "/findingPath/AStar.js";
import { Eller }      from "/generatingMaze/Eller.js";
import { DFS }        from "/generatingMaze/DFS.js";
import { Dijkstra }   from "/findingPath/Dijkstra.js";
import { DfsFinding } from "/findingPath/DfsFinding.js";

// Initialize the grid
const wide = 30;
let grid = [];
let cols, rows;
let cnv;

// Initialize the generator
let ellerSelection = false;
let dfsSelection = false;
let mazeGenerated = false; 
let dfs = null;
let eller = null;

// Initialize player
let player;

// Path Finding Options
let shortestPathAStart = [];
let shortestPathDFS = [];
let shortestPathDijkstra = [];


window.setup = function () {
    cnv = createCanvas(1200, 500);
    cnv.position(50, 60);
    cnv.hide();
    frameRate(60);

    cols = floor(width / wide);
    rows = floor(height / wide);

    player = new Player(0, 0, wide, cols, rows);
};

window.draw = function () {
    background(51);
    handleMazeGenerator();
    player.drawPlayer();
    findingPath();
    for (let i = 0; i < grid.length; i++) {
        grid[i].display(wide);
        grid[cols - 1].hightlightCell(wide);
    }
    
};

function handleMazeGenerator(){
    if (ellerSelection && !mazeGenerated) {
        if (!eller) {
            resetGrid();
            eller = new Eller(grid, cols, rows);
        }

        if (!eller.finished) {
            eller.Step();
        } else {
            mazeGenerated = true;
            ellerSelection = false;
            eller = null;
        }
    }

    if (dfsSelection && !mazeGenerated) {
        if (!dfs ) {
            resetGrid();
            dfs = new DFS(grid, wide);
        }

        if (!dfs.finished) {
            dfs.Step(); 
        } else {
            mazeGenerated = true;
            dfsSelection = false;
            dfs = null;
        }
    }
}


window.keyPressed = function () {
    if (keyCode === LEFT_ARROW) player.updateMoving(grid, LEFT_ARROW);
    if (keyCode === RIGHT_ARROW) player.updateMoving(grid, RIGHT_ARROW);
    if (keyCode === UP_ARROW) player.updateMoving(grid, UP_ARROW);
    if (keyCode === DOWN_ARROW) player.updateMoving(grid, DOWN_ARROW);
};


function resetGrid(){
    console.log("\n");
    grid.length = 0; 
    shortestPathAStart.length = 0;
    shortestPathDFS.length = 0;
    shortestPathDijkstra.length = 0;
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            grid.push(new Cell(i, j, cols, rows));
        }
    }
}

function findingPath(){
    if(shortestPathAStart.length > 0) drawPath(shortestPathAStart,0);
    if(shortestPathDFS.length > 0) drawPath(shortestPathDFS,1);
    if(shortestPathDijkstra.length > 0) drawPath(shortestPathDijkstra,2);
}
function drawPath(path ,color) {
    if(color === 0) stroke('white')
    if(color === 1) stroke('yellow')
    if(color === 2) stroke('blue')
    
    strokeWeight(4);
    noFill();
    beginShape();
    for (let cell of path) {
        vertex(cell.i * wide + wide / 2, cell.j * wide + wide / 2);
    }
    endShape();
}

// Handling UI Button

let mainMazeDiv = document.getElementById("generatingMazeButton");
let secondMazeDiv = document.getElementById("generatingMazeContainer");
let optionMaze = document.querySelectorAll(".mazeOption");
let check = false;
function showMazeSecondDiv() {
    secondMazeDiv.style.display = "flex"; 
    setTimeout(() => {
        optionMaze.forEach(option => option.classList.add("show")); 
    }, 10);
}

function hideMazeSecondDiv() {
    optionMaze.forEach(option => option.classList.remove("show")); 
    setTimeout(() => {
        if (!secondMazeDiv.matches(':hover') && !mainMazeDiv.matches(':hover')) 
            secondMazeDiv.style.display = "none";               
    }, 100); 
}

mainMazeDiv.addEventListener("mouseenter", showMazeSecondDiv);

mainMazeDiv.addEventListener("mouseleave", function() {
    setTimeout(() => {
        if (!secondMazeDiv.matches(':hover')) hideMazeSecondDiv();
    }, 100);
});

secondMazeDiv.addEventListener("mouseleave", hideMazeSecondDiv);

let generatingMaze = document.querySelectorAll(".mazeOption");
generatingMaze.forEach(element => {
    element.addEventListener("click", () => {
        let option = element.textContent.trim(); 
        check = true;  
        document.getElementById('findingPathButton').addEventListener("mouseenter",showSecondDiv);
        document.getElementById('findingPathButton').innerText = 'Finding Path'; 
        document.getElementById("findingPathButton").addEventListener("mouseenter", showSecondDiv); 
        if (option === "Eller") {
            ellerSelection = true;
            dfsSelection = false; 
            mazeGenerated = false;
        } else if (option === "DFS") {
            dfsSelection = true;
            ellerSelection = false; 
            mazeGenerated = false;
        }
        player.resetPosition();
        if(findingPathContainer !== undefined){
            findingPathContainer.forEach(e => {
                e.classList.remove("disabled");
            });
        }    
    });
});


let mainPathDiv = document.getElementById("findingPathButton");
let secondPathDiv = document.getElementById("findingPathContainer");
let optionFindingSearch = document.querySelectorAll(".pathOption");

function showSecondDiv() {
    secondPathDiv.style.display = "flex"; 
    setTimeout(() => {
        optionFindingSearch.forEach(option => option.classList.add("show")); 
    }, 10);
}

function hideSecondDiv() {
    optionFindingSearch.forEach(option => option.classList.remove("show")); 
    setTimeout(() => {
        if (!secondPathDiv.matches(':hover') && !mainPathDiv.matches(':hover')) {
            secondPathDiv.style.display = "none"; 
        }
    }, 100); 
}

    mainPathDiv.removeEventListener("mouseenter", showSecondDiv);

    mainPathDiv.addEventListener("mouseleave", function() {
        setTimeout(() => {
            if (!secondPathDiv.matches(':hover')) hideSecondDiv();
        }, 100);
    });

    secondPathDiv.addEventListener("mouseleave", hideSecondDiv);

let findingPathButton = document.getElementById('findingPathButton');
findingPathButton.addEventListener('click', () => {
    if(!check)
        window.alert("You should create a maze first");
});

let findingPathContainer = document.querySelectorAll(".pathOption");
findingPathContainer.forEach(element => {
    element.addEventListener("click", () => {
        let option = element.textContent.trim();  
        document.getElementById('findingPathButton').innerText = option;      
        if (option === "A* Search") {
            let AStarAlgo = new AStar();
            let index = player.getIndex(player.i, player.j);
            shortestPathAStart = AStarAlgo.Begin(grid[index], grid[cols - 1], grid);
        }
        if (option === "Dijkstra") {
            let dijkstra = new Dijkstra();
            let index = player.getIndex(player.i, player.j);
            shortestPathDijkstra = dijkstra.Begin(grid[index], grid[cols - 1], grid);
        } 
        if (option === "DFS"){
            let dfs = new DfsFinding();
            let index = player.getIndex(player.i, player.j);
            shortestPathDFS = dfs.Begin(grid[index], grid[cols - 1], grid);
        }
        // findingPathContainer.forEach(e => {
        //     e.classList.add("disabled");
        // });
    });
});



const startGame = document.getElementById("removeOverlayButton");
if(startGame){
    let overlay = document.getElementById("overlay");
    let findingPathButton = document.getElementById("findingPathButton");
    let generatingMazeButton = document.getElementById("generatingMazeButton");
    startGame.addEventListener("click", () => {
        overlay.classList.add("slide-away");
        setTimeout(() => {
            overlay.style.display = "none"; 
            findingPathButton.style.display = "flex"; 
            generatingMazeButton.style.display = "flex"; 
            cnv.show();
        }, 800);
        
    });
}    