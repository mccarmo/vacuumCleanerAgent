function MazeMaker() {
	var context = this;
    var x,y,color,squareSize,canvasSize,width,height,moveCount,visitedCells,pathIndex,directionIndex, directionsArray;
   
    this.init = function(properties) {
        context.x = properties.x;
        context.y = properties.y;
        context.color = properties.color;
        context.squareSize = properties.squareSize;
        context.canvasSize = properties.canvasSize;  
        context.width = properties.squareSize;
        context.height = properties.squareSize;   
	context.moveCount = 0;
	context.pathIndex = -1;
	context.directionIndex = 0;
        context.visitedCells = 0;
	context.directionsArray = [];
	context.directionsArray.push(this.goUp());
        context.directionsArray.push(this.goUpLeft());
        context.directionsArray.push(this.goUpRight())
	context.directionsArray.push(this.goRight());
	context.directionsArray.push(this.goDown());
        context.directionsArray.push(this.goDownRight());
        context.directionsArray.push(this.goDownLeft());
	context.directionsArray.push(this.goLeft());				
    };

    this.goRight = function() {	  
        function action() {		    		   
	    if(context.getX() < context.getCanvasSize() - context.getWidth()) {				
		context.setX(context.getX() + context.getSquareSize());				
		return true;
	    } 		
	    return false;
	}
	return action;
    };

    this.goLeft = function() {
        function action() {
            if(context.getX() > 0) {
	        context.setX(context.getX() - context.getSquareSize());
	        return true;
            }
            return false;
        }
        return action;
    };

    this.goUp = function() {
	function action() {
	    if(context.getY() > 0) {
		context.setY(context.getY() - context.getSquareSize());
		return true;
	    }
	    return false;
	}
	return action;
    };
    
    this.goUpLeft = function() {
	function action() {
	    if(context.getY() > 0 && context.getX() > 0) {
                context.setX(context.getX() - context.getSquareSize());
		context.setY(context.getY() - context.getSquareSize());
		return true;
	    }
	    return false;
	}
	return action;
    };

    this.goUpRight = function() {
	function action() {
	    if(context.getY() > 0 && (context.getX() < context.getCanvasSize() - context.getWidth())) {
                context.setX(context.getX() + context.getSquareSize());
		context.setY(context.getY() - context.getSquareSize());
		return true;
	    }
	    return false;
	}
	return action;
    };

    this.goDown = function() {
	function action() {
	    if(context.getY() < context.getCanvasSize() - context.getHeight()) {
		context.setY(context.getY() + context.getSquareSize());
		return true;
	    }
	    return false;
	}
	return action;
    };
       
    this.goDownLeft = function() {
	function action() {
	    if(context.getY() < context.getCanvasSize() - context.getHeight() && (context.getX() > 0)) {
                context.setX(context.getX() - context.getSquareSize());
		context.setY(context.getY() + context.getSquareSize());
		return true;
	    }
	    return false;
	}
	return action;
    };

    this.goDownRight = function() {
	function action() {
	    if(context.getY() < context.getCanvasSize() - context.getHeight() && 
              (context.getX() < context.getCanvasSize() - context.getWidth())) {
                context.setX(context.getX() + context.getSquareSize());	
		context.setY(context.getY() + context.getSquareSize());
		return true;
	    }
	    return false;
	}
	return action;
    };

    this.goToRandomDirection = function() {
        return context.getDirectionsArray()[Math.floor(Math.random()*context.getDirectionsArray().length)]();
    }
	
    this.makeTheMaze = function(squareMap) {	   
        var found = context.hasNeighborsWithAllWalls(squareMap);
        if(found) { 
            context.visitedCells++;
            context.goToRandomDirection();
            if(context.hasWall(squareMap)) {
	        //...break the wall.
	        context.breakTheWall(squareMap);			
	    }
        } else { 
            context.goToRandomDirection();
        }	
    }; 	   
  
    this.hasNeighborsWithAllWalls = function (squareMap) {        
        var allWithWalls = false;
        for(var i=0;i<squareMap.length;i++) {
                //Up 
	    if(((squareMap[i][0]==context.getX()) && (squareMap[i][1]==context.getY()-context.squareSize*2)) ||
               //Down 
               ((squareMap[i][0]==context.getX()) && (squareMap[i][1]==context.getY()+context.squareSize*2)) ||
               //Left
               ((squareMap[i][0]==context.getX()-context.squareSize*2) && (squareMap[i][1]==context.getY())) ||
               //Right
               ((squareMap[i][0]==context.getX()+context.squareSize*2) && (squareMap[i][1]==context.getY())) ||
               //UP-LEFT
               ((squareMap[i][0]==context.getX()-context.squareSize*2) && (squareMap[i][1]==context.getY()-context.squareSize*2)) ||
               //UP-RIGHT
               ((squareMap[i][0]==context.getX()+context.squareSize*2) && (squareMap[i][1]==context.getY()-context.squareSize*2)) ||
               //DOWN-LEFT
               ((squareMap[i][0]==context.getX()-context.squareSize*2) && (squareMap[i][1]==context.getY()+context.squareSize*2)) ||
               //DOWN-RIGHT
               ((squareMap[i][0]==context.getX()+context.squareSize*2) && (squareMap[i][1]==context.getY()+context.squareSize*2))) {
		if(squareMap[i][2]=='#000'){								
                    allWithWalls  = true;	
	        } else {                           
                    return false;                
                }
	    } 
        }        
        return allWithWalls;
    };    

    this.hasWall = function(squareMap) {    
        for(var i=0;i<squareMap.length;i++) {
	    if(squareMap[i][0]==context.getX() && squareMap[i][1]==context.getY()) {
		if(squareMap[i][2]=='#000'){
	  	    context.setPathIndex(i);										
		    return true;	
	        } 
	    } 
	}
	return false;
    };

    this.breakTheWall = function(squareMap) {
	if(squareMap[context.getPathIndex()][3]==0) {
	    squareMap[context.getPathIndex()][2] = (Math.floor(Math.random()*2)%2==0)?'#fff':'#bbb';
            squareMap[context.getPathIndex()][3] = 1;	
	    context.setPathIndex(-1);
	}
    };
	
    /*Get's*/
    this.getX = function() {
	return context.x;
    }
	
    this.getY = function() {
	return context.y;
    }

    this.getWidth= function() {
	return context.width;
    }

    this.getHeight = function() {
	return context.height;
    }

    this.getColor = function() {
	return context.color;
    }		

    this.getCanvasSize = function() {
	return context.canvasSize;
    }

    this.getSquareSize = function() {
	return context.squareSize;
    }

    this.getDirectionsArray = function() {
	return context.directionsArray;
    }

    this.getDirectionIndex = function() {
	return context.directionIndex;
    }	

    this.getPathIndex = function() {
	return context.pathIndex;
    }

    this.getVisitedCells = function() {
	return context.visitedCells;
    }

    /*Set's*/
    this.setX = function(newX) {
	context.x = newX;
    }

    this.setY = function(newY) {
	context.y = newY;
    }

    this.setCanvasSize = function(newCanvasSize) {
	context.canvasSize = newCanvasSize;
    }

    this.setSquareSize = function(newSquareSize) {
	context.squareSize = newSquareSize;
    }

    this.setDirectionsArray = function(newDirectionsArray) {
	context.directionsArray = newDirectionsArray;
    }

    this.setDirectionIndex = function(newDirectionIndex) {
	context.directionIndex = newDirectionIndex;
    }

    this.setPathIndex = function(newPathIndex) {
	context.pathIndex = newPathIndex;
    }
}
