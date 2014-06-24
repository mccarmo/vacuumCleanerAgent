function MazeMaker() {
    var context = this;
    var x,y,squareSize,canvasSize,width,height,visitedCells,pivotCell,squareMapCellsToVisit,currentNeighbors;
   
    this.init = function(properties) {
        context.x = properties.x;
        context.y = properties.y;
        context.squareSize = properties.squareSize;
        context.canvasSize = properties.canvasSize;  
        context.width = properties.squareSize;
        context.height = properties.squareSize;   
        context.visitedCells = 0;	
        context.pivotCell = [];
        context.squareMapCellsToVisit = [];
        context.currentNeighbors = [];				
    };
	
    this.initCellsToVisit = function(squareMap) {
        for(var i=0;i<squareMap.length;i++) {	
		   if(squareMap[i][3]==2) {
			  context.squareMapCellsToVisit.push(squareMap[i]);				   
		   }
		}
        //Initialize the pivot cell with a random cell... 
        context.pivotCell = context.squareMapCellsToVisit[Math.floor(Math.random()*context.squareMapCellsToVisit.length)];
    }; 

    this.makeTheMaze = function(squareMap) { 
		//Mark current selected pivot cell as visited...
		if(context.pivotCell[3]==2) {			
			context.markAsVisited(squareMap);
			//With the selected random pivot cell, check for unvisited neighbors... 	         		        
			if(context.hasUnvisitedNeighbors(context.pivotCell)) {                 		  	
				//...if it has unvisited neighbors, choose a random one... 
				var randomNeighbor = context.currentNeighbors[Math.floor(Math.random()*context.currentNeighbors.length)];
				//Destroy the Wall between the pivot cell and the current random cell
				context.breakTheWallBetweenCells(squareMap,context.pivotCell,randomNeighbor);
				//Make the current random cell the pivot cell
				context.pivotCell = randomNeighbor; 	   
			} else {			
				context.pivotCell = context.squareMapCellsToVisit[Math.floor(Math.random()*context.squareMapCellsToVisit.length)];		
			}	
	    }
    }; 	    

    this.hasUnvisitedNeighbors = function (pivotCell) {       
        context.currentNeighbors = [];
        for(var i=0;i<context.squareMapCellsToVisit.length;i++) {
           //UP
           if((context.squareMapCellsToVisit[i][0]==pivotCell[0] && context.squareMapCellsToVisit[i][1]==(pivotCell[1]-(context.squareSize * 2))) ||
             //Down
             (context.squareMapCellsToVisit[i][0]==pivotCell[0] && context.squareMapCellsToVisit[i][1]==(pivotCell[1]+(context.squareSize * 2))) ||
             //Right
             (context.squareMapCellsToVisit[i][0]==(pivotCell[0]+(context.squareSize * 2)) && context.squareMapCellsToVisit[i][1]==pivotCell[1]) ||
             //Left
             (context.squareMapCellsToVisit[i][0]==(pivotCell[0]-(context.squareSize * 2)) && context.squareMapCellsToVisit[i][1]==(pivotCell[1]))) {
               if(context.squareMapCellsToVisit[i][3]==2) {
                   context.currentNeighbors.push(context.squareMapCellsToVisit[i]);
                   return true;
               } 
           }      
        }	
        return false;	
    };    

    this.breakTheWallBetweenCells = function(squareMap,pivotCell,randomNeighbor) {
        var x = 0, y = 0;	
       
        if(randomNeighbor[0] == pivotCell[0]) {
            x = pivotCell[0];            
            if (randomNeighbor[1] < pivotCell[1]) {
                y = pivotCell[1] - context.squareSize;
            } else if (randomNeighbor[1] > pivotCell[1]) {
                y = pivotCell[1] + context.squareSize;
            }         
        }
        
        if(randomNeighbor[1] == pivotCell[1]) {
            y = pivotCell[1];
            if (randomNeighbor[0] < pivotCell[0]) {
                x = pivotCell[0] - context.squareSize;
            } else if (randomNeighbor[0] > pivotCell[0]) {
                x = pivotCell[0] + context.squareSize;
            }         
        } 
        
        for(var i=0;i<squareMap.length;i++) {
            if((x > 0 && y > 0) && (x < context.canvasSize - context.width) && (y < context.canvasSize - context.height)) {
                if(x==squareMap[i][0] && y==squareMap[i][1]) {
                    squareMap[i][2] = (Math.floor(Math.random()*100)%2==0)?'#fff':'#bbb';
					squareMap[i][3] = 0;
                }
            }
        }
        
    };
    
    this.markAsVisited = function(squareMap) {	
		for(var i=0;i<squareMap.length;i++) {	
		    if(squareMap[i][0]==context.pivotCell[0] && squareMap[i][1]==context.pivotCell[1]) {
		        squareMap[i][3]= 0;			   
		    }
		}
	};	
	
    this.hasCellsToVisit = function() {
        for(var i=0;i<context.squareMapCellsToVisit.length;i++) {	
		   if(context.squareMapCellsToVisit[i][3]==2) {
			  return true;				   
		   }
		}
        return false;
    };
}
