
export class Player {
    constructor(i, j, w, c, r) {
        this.w = w;
        this.i = i;
        this.j = j;
        this.c = c;
        this.r = r;
        this.updatePosition();
        this.moving = [false, false, false, false]; // left, down, right, up
    }

    updatePosition(){
        this.x = this.i * this.w + 5;
        this.y = this.j * this.w + 5;
    }

    drawPlayer() {
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y, this.w/2, this.w/2);
    }

    updateMoving(grid,keyCode) {

        let index = this.getIndex(this.i, this.j);
        if (index === -1) return;
    
        let cell = grid[index];
        
        if (keyCode === LEFT_ARROW  && !cell.walls[3]) this.i--; // Left
        if (keyCode === RIGHT_ARROW && !cell.walls[1]) this.i++; // Right
        if (keyCode === UP_ARROW    && !cell.walls[0]) this.j--; // Up
        if (keyCode === DOWN_ARROW  && !cell.walls[2]) this.j++; // Down

        this.updatePosition();

    }



    getIndex(i, j) {
        if (i < 0 || j < 0 || i >= this.c || j >= this.r) return -1;
        return i + j * this.c;
    }
}    
