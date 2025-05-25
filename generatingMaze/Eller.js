export class Eller {
    constructor(g, c, r) {
        this.grid = g;
        this.cols = c;
        this.rows = r;
        this.currentSet = 1;
        this.sets = [];
        this.currentRow = 0;
        this.stepPhase = 'init'; // 'init', 'join', 'connect', 'last', 'done'
        this.finished = false;
    }

    Step() {
        if (this.finished) return;

      
        if (this.currentRow < this.rows - 1) {
            if (this.stepPhase === 'init') {
                this.initializeSet(this.currentRow);
                this.stepPhase = 'join';
            } else if (this.stepPhase === 'join') {
                this.joinAdjacentCell(this.currentRow);
                this.stepPhase = 'connect';
            } else if (this.stepPhase === 'connect') {
                this.sets[this.currentRow + 1] = new Array(this.cols).fill(0);
                this.connectDownwardPath(this.currentRow);
                this.currentRow++;
                this.stepPhase = 'init';
            }
        }

        // Handle last row separately
        else if (this.currentRow === this.rows - 1 && this.stepPhase !== 'done') {
            this.initializeSet(this.currentRow);
            this.joinAdjacentCell(this.currentRow);

            for (let x = 0; x < this.cols - 1; x++) {
                if (this.sets[this.currentRow][x] !== this.sets[this.currentRow][x + 1]) {
                    let leftCell = this.grid[this.getIndex(x, this.currentRow)];
                    let rightCell = this.grid[this.getIndex(x + 1, this.currentRow)];
                    leftCell.walls[1] = false;
                    rightCell.walls[3] = false;
                }
            }

            this.stepPhase = 'done';
            this.finished = true;
        }
    }

    joinAdjacentCell(y) {
        for (let i = 1; i < this.cols; i++) {
            if ((this.sets[y][i] != this.sets[y][i - 1]) && Math.random() < 0.5) {
                let previousCell = this.grid[this.getIndex(i - 1, y)];
                let currentCell = this.grid[this.getIndex(i, y)];
                previousCell.walls[1] = false;
                currentCell.walls[3] = false;
                this.sets[y][i] = this.sets[y][i - 1];
            }
        }
    }

    connectDownwardPath(y) {
        let setGroups = this.groupCellSet(y);

        for (let set in setGroups) {
            let choices = shuffle(setGroups[set]);
            let numConnections = max(1, floor(random(choices.length)));

            for (let i = 0; i < numConnections; i++) {
                let x = choices[i];
                this.grid[x].walls[2] = false;
                this.grid[this.getIndex(this.grid[x].i, y + 1)].walls[0] = false;
                this.sets[y + 1][this.grid[x].i] = this.sets[y][this.grid[x].i];
            }
        }
    }

    groupCellSet(y) {
        let groups = {};

        for (let i = 0; i < this.cols; i++) {
            let setId = this.sets[y][i];
            if (!groups[setId]) groups[setId] = [];
            groups[setId].push(this.getIndex(i, y));
        }

        return groups;
    }

    initializeSet(y) {
        if (!this.sets[y]) this.sets[y] = new Array(this.cols).fill(0);
        for (let i = 0; i < this.cols; i++) {
            if (this.sets[y][i] != 0 && y === this.rows - 1) continue;
            this.sets[y][i] = this.currentSet++;
        }
    }

    getIndex(i, j) {
        if (i < 0 || j < 0 || i >= this.cols || j >= this.rows) return -1;
        return i + j * this.cols;
    }
}
