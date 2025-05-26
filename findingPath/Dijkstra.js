export class Dijkstra {
    constructor(){
        this.numOfCellVisited = 1;
    }

    Begin(start, end, grid) {
        this.numOfCellVisited = 1;
        let dist = new Map();
        let prev = new Map();
        let visited = new Set();
        let queue = [];

        // Initialize distances and queue
        for (let cell of grid) {
            dist.set(cell, Infinity);
            prev.set(cell, null);
            queue.push(cell);
        }
        dist.set(start, 0);

        while (queue.length > 0) {
            
            // Sort queue by shortest distance (mimicking a priority queue)
            queue.sort((a, b) => dist.get(a) - dist.get(b));
            let current = queue.shift();

            if (current === end) {
                // Reconstruct the shortest path
                let path = [];
                let temp = end;
                while (temp !== null) {
                    path.push(temp);
                    temp = prev.get(temp);
                }
                console.log("Dijkstra is "+path.length+" with "+this.numOfCellVisited+" visited cells");
                return path.reverse();
            }

            visited.add(current);

            for (let neighbor of current.getNeighbors(grid)) {
                this.numOfCellVisited++;
                if (visited.has(neighbor)) continue;

                let alt = dist.get(current) + 1; // All edges cost 1
                if (alt < dist.get(neighbor)) {
                    dist.set(neighbor, alt);
                    prev.set(neighbor, current);
                }
            }
        }

        return []; // No path found
    }
}
