
export class DFS{

    constructor(grid,wide){
       this.wide = wide;
       this.stack = [];
       this.grid = grid;
       this.currentCell = grid[0];

    }

    Begin(){


        while(true){
            this.currentCell.visited = true;
            var nextCell = this.currentCell.checkNeighbors(this.grid);
            if (nextCell) {
                nextCell.visited = true;
                this.stack.push(this.currentCell);
                this.removeWalls(this.currentCell, nextCell);
                this.currentCell = nextCell;
            } else if (this.stack.length > 0) {
                this.currentCell = this.stack.pop();
            }

            if(this.stack.length <= 0) break;
        }    


    }

    removeWalls(a, b) {
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
    
}