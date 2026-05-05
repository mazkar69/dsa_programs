function uniquePathsWithObstacles(obstacleGrid: number[][]): number {

    let rowLen:number = obstacleGrid.length;
    let colLen:number = obstacleGrid[0].length;

    let map = new Map<string,number>();
    
    function findPossiblePath(row:number,col:number):number{
        if(map.has(`${row}${col}`)){
            return map.get(`${row}${col}`)!
        }
        if(row >= rowLen || col >= colLen || obstacleGrid[row][col] === 1){
            return 0;
        }
        if(row == rowLen -1 && col === colLen -1){  
            return 1;
        }

        let path1 = findPossiblePath(row+1, col);
        map.set(`${row+1}${col}`, path1)
        let path2 = findPossiblePath(row, col+1);
        map.set(`${row}${col+1}`, path2)

        return path1 + path2;
    }

    return findPossiblePath(0,0)
};