
export class Player {
    constructor(i, j, w, c, r) {
        this.w = w;
        this.i = i;
        this.j = j;
        this.c = c;
        this.r = r;
        this.x = this.i * w + 10;
        this.y = this.j * w + 10;
        this.moving = [false, false, false, false]; // left, down, right, up
    }

    drawPlayer() {
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y, this.w - 20, this.w - 20);
    }

    updateMoving(grid,keyCode) {

        let index = this.getIndex(this.i, this.j);
        if (index === -1) return;
    
        let cell = grid[index];
        
        if (keyCode === LEFT_ARROW  && !cell.walls[3]) this.i--; // Left
        if (keyCode === RIGHT_ARROW && !cell.walls[1]) this.i++; // Right
        if (keyCode === UP_ARROW    && !cell.walls[0]) this.j--; // Up
        if (keyCode === DOWN_ARROW  && !cell.walls[2]) this.j++; // Down

        this.x = this.i * this.w + 10;
        this.y = this.j * this.w + 10;


    }


    getIndex(i, j) {
        if (i < 0 || j < 0 || i >= this.c || j >= this.r) return -1;
        return i + j * this.c;
    }
}    
