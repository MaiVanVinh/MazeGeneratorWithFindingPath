export class DfsFinding {

    constructor(){
        this.numOfCellVisited = 1;
    }

    Begin(start, end, grid) {
        this.numOfCellVisited = 1;
        let visited = new Set();
        let path = [];
        let found = this.dfs(start, end, visited, path, grid);
        if(found) console.log("DFS cost is " + path.length + " with " + this.numOfCellVisited + " visited cells");
        return found ? path : [];
    }

    dfs(current, end, visited, path, grid) {
        visited.add(current);
        path.push(current);

        if (current === end) {
            return true;
        }

        let neighbors = current.getNeighbors(grid);

        for (let neighbor of neighbors) {
            this.numOfCellVisited++;
            if (!visited.has(neighbor)) {
                if (this.dfs(neighbor, end, visited, path, grid)) {
                    return true; 
                }
            }
        }

        path.pop();
        return false;
    }

    getNumOfVisitedCells(){
        return this.numOfCellVisited;
    }
}