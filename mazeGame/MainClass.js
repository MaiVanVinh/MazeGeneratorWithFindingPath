import { Cell }   from "/mazeGame/Cell.js"; 
import { Player } from "/mazeGame/Player.js";
import { AStar }  from "/findingPath/AStar.js";
import { Eller }  from "/generatingMaze/Eller.js";
import { DFS }    from "/generatingMaze/DFS.js";
import { Dijkstra }  from "/findingPath/Dijkstra.js";

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


window.setup = function () {
    cnv = createCanvas(1200, 600);
    cnv.position(30, 60);
    cnv.hide();
    frameRate(60);

    cols = floor(width / wide);
    rows = floor(height / wide);

    player = new Player(0, 0, wide, cols, rows);
};

window.draw = function () {
    background(51);

    if (ellerSelection && !mazeGenerated ) {
        resetGrid();
        let eller = new Eller(grid, cols, rows);
        grid = eller.EllerAlgo();
        ellerSelection = false;
        mazeGenerated = true; 
    }else if(dfsSelection && !mazeGenerated){
        resetGrid();
        let dfs = new DFS(grid,wide);
        dfs.Begin();
        dfsSelection = false;
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
            shortestPath = AStarAlgo.Begin(grid[index], grid[cols - 1], grid);
        }
        if (option === "Dijkstra") {
            let dijkstra = new Dijkstra();
            let index = player.getIndex(player.i, player.j);
            shortestPath = dijkstra.Begin(grid[index], grid[cols - 1], grid);
        } 
        findingPathContainer.forEach(e => {
            e.classList.add("disabled");
        });
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