
export class Cell {
    constructor(i, j, c, r) {
        this.i = i;
        this.j = j;
        this.cols = c;
        this.rows = r;
        this.visited = false;
        this.walls = [true, true, true, true]; // top, right, bottom, left
    }

    previousCell(preCell){
       this.preCell = preCell;
    }

    getPreviousCell(){
        return this.preCell;
    }

    hightlight(wide) {
        var x = this.i * wide;
        var y = this.j * wide;
        stroke(0);
        fill(255);
        rect(x, y, wide, wide);
    }

    display(wide) {
        stroke(0);
        strokeWeight(4);
        noFill();
        var x = this.i * wide;
        var y = this.j * wide;

        if (this.walls[0]) line(x, y, x + wide, y);
        if (this.walls[1]) line(x + wide, y, x + wide, y + wide);
        if (this.walls[2]) line(x + wide, y + wide, x, y + wide);
        if (this.walls[3]) line(x, y + wide, x, y);
        

        if (this.visited) {
            noStroke();
            fill(255, 0, 50, 100);
            rect(x, y, wide, wide);
        }
    }

    checkNeighbors(grid) {
        var neighbors = [];

        var top = grid[this.getIndex(this.i, this.j - 1)];
        var right = grid[this.getIndex(this.i + 1, this.j)];
        var bottom = grid[this.getIndex(this.i, this.j + 1)];
        var left = grid[this.getIndex(this.i - 1, this.j)];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length > 0) {
            var randomIndex = floor(random(0, neighbors.length));
            return neighbors[randomIndex];
        }
        return undefined;
    }

    getNeighbors(grid) {
        let neighbors = [];
    
        let top = grid[this.getIndex(this.i, this.j - 1)];
        let right = grid[this.getIndex(this.i + 1, this.j)];
        let bottom = grid[this.getIndex(this.i, this.j + 1)];
        let left = grid[this.getIndex(this.i - 1, this.j)];
    
        if (top && !this.walls[0]) neighbors.push(top);
        if (right && !this.walls[1]) neighbors.push(right);
        if (bottom && !this.walls[2]) neighbors.push(bottom);
        if (left && !this.walls[3]) neighbors.push(left);
    
        return neighbors;
    }
    

    hightlightCell(wide) {
        var x = this.i * wide;
        var y = this.j * wide;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, wide, wide);
    }

    hightlightAnimation(wide){
        var x = this.i * wide;
        var y = this.j * wide;
        noStroke();
        fill('yellow');
        rect(x, y, wide, wide);
    }

    getIndex(i, j) {
        if (i < 0 || j < 0 || i >= this.cols || j >= this.rows) return -1;
        return i + j * this.cols;
    }
}


