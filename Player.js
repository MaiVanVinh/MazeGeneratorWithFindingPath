
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
        this.speed = 3; 
    }

    drawPlayer() {
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y, this.w - 20, this.w - 20);
    }

    updateMoving(grid) {
        let nextX = this.x;
        let nextY = this.y;
    
        if (this.moving[0]) nextX -= this.speed; // Move left
        if (this.moving[2]) nextX += this.speed; // Move right
        if (this.moving[3]) nextY -= this.speed; // Move up
        if (this.moving[1]) nextY += this.speed; // Move down
    
        if (this.canMove(nextX, nextY, grid)) {  
            this.x = nextX;
            this.y = nextY;
        }
    }
    
    canMove(a, b, grid) {
        let nextX = floor(a / this.w);
        let nextY = floor(b / this.w);
    
        let index = this.getIndex(nextX, nextY);
        if (index === -1) return false;
    
        let cell = grid[index];
    
        let touchingRightWall = cell.walls[1] && a + this.w - 20 > (cell.i + 1) * this.w;
        let touchingLeftWall = cell.walls[3] && a < cell.i * this.w;
        let touchingUpWall = cell.walls[0] && b < cell.j * this.w;
        let touchingDownWall = cell.walls[2] && b + this.w - 20 > (cell.j + 1) * this.w;
    
        let touchingLeftEdge = a <= 0;
        let touchingRightEdge = a + this.w - 20 >= width;
        let touchingTopEdge = b <= 0;
        let touchingBottomEdge = b + this.w - 20 >= height;
    
        return !(
            touchingRightWall ||
            touchingLeftWall ||
            touchingUpWall ||
            touchingDownWall ||
            touchingLeftEdge ||
            touchingRightEdge ||
            touchingTopEdge ||
            touchingBottomEdge
        );
    }

    getIndex(i, j) {
        if (i < 0 || j < 0 || i >= this.c || j >= this.r) return -1;
        return i + j * this.c;
    }
}    
