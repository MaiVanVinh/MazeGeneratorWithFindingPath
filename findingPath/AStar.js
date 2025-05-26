
export class AStar{
    
    constructor(){
        this.numOfCellVisited = 1;
    }

    Begin(start, end, grid) {
        let openSet = [];
        let closeSet = [];
        let mapCells = new Map(); 
        let shortestPath = [];
        this.numOfCellVisited = 1;

        start.g = 0;
        start.h = this.heuristic(start, end);
        start.f = start.g + start.h;

        openSet.push(start);

        while (openSet.length > 0) {
        
            let index = 0;
            let minValue = Number.MAX_SAFE_INTEGER;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < minValue) {
                    minValue = openSet[i].f;
                    index = i;
                }
            }

            let current = openSet[index];

            if (current === end) {
                let temp = current;
                while (mapCells.has(temp)) {
                    shortestPath.push(temp);
                    temp = mapCells.get(temp);
                }
                shortestPath.push(start);
                shortestPath.reverse();
                console.log("AStart is "+shortestPath.length+" with "+this.numOfCellVisited+" visited cells");
                return shortestPath;
            }

            openSet.splice(index, 1);
            closeSet.push(current);

            let neighbors = current.getNeighbors(grid);
            for (let n of neighbors) {
                if (closeSet.includes(n)) continue;

                let tempG = current.g + 1;

                let newPath = false;
                if (!openSet.includes(n)) {
                    newPath = true;
                    openSet.push(n);
                } else if (tempG < n.g) {
                    newPath = true;
                }

                if (newPath) {
                    mapCells.set(n, current);
                    n.g = tempG;
                    n.h = this.heuristic(n, end);
                    n.f = n.g + n.h;
                }
                this.numOfCellVisited++;
            }
        }

        console.log("No Path Found");
        return [];
    }

    getNumOfVisitedCells(){
        return this.numOfCellVisited;
    }

    heuristic(a,b){
      return abs (a.i - b.i) + abs (a.j - b.j);
    }

}    