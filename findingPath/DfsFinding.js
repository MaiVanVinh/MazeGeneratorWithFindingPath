export class DfsFinding {
    Begin(start, end, grid) {
        let visited = new Set();
        let path = [];
        let found = this.dfs(start, end, visited, path, grid);
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
            if (!visited.has(neighbor)) {
                if (this.dfs(neighbor, end, visited, path, grid)) {
                    return true;
                }
            }
        }

        path.pop();
        return false;
    }
}