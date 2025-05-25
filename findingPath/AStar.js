
export class AStar{

    Begin(start,end,grid){
        let openSet  = [];
        let closeSet = [];
        let shortestPath = [];
        
        start.g = 0;
        start.h = this.heuristic(start, end);
        start.f = start.g + start.h;

        openSet.push(start);
        
        while(openSet.length > 0){
            // Pick the lowest f value from the openSet
            let index = 0;
            let minValue = Number.MAX_SAFE_INTEGER;
            for(let i = 0; i < openSet.length; i++){
                if(minValue < openSet[i].f){
                    minValue = openSet[i].f;
                    index = i;
                }

            }

            let current = openSet[index];
            
            if(current === end){
                console.log("Path Found");
                let temp = current;
                shortestPath.push(temp);
                while (temp.getPreviousCell()) {
                    shortestPath.push(temp.getPreviousCell());
                    temp = temp.getPreviousCell();
                }
   
                return shortestPath;
            }
            
            openSet.splice(current,1);
            closeSet.push(current);
            
            // Now explore all the neighbors of current node
            let neighbors = current.getNeighbors(grid);
            for(let n of neighbors){
            
                if(closeSet.includes(n))
                    continue;
                let tempG = n.g + 1;
                if(!openSet.includes(n)){
                    n.g = tempG;
                    openSet.push(n);
                }else{
                    if(tempG < n.g){
                    n.g = tempG;
                    }    
                }

                n.previousCell(current);
                n.h = this.heuristic(n,end);
                n.f = n.g + n.h;
                
            }
        
        }
        return [];
        
    }

    heuristic(a,b){
      return abs (a.i - b.i) + abs (a.j - b.j);
    }

}    