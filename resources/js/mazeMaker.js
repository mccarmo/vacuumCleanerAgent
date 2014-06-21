function MazeMaker() {
	var context = this;
    var x,y,color,squareSize,canvasSize,moveCount,pathIndex,directionIndex, directionsArray;
   
    this.init = function(properties) {
        context.x = properties.x;
        context.y = properties.y;
        context.color = properties.color;
        context.squareSize = properties.squareSize;
        context.canvasSize = properties.canvasSize;    
	context.moveCount = 0;
	context.pathIndex = -1;
	context.directionIndex = 0;
	context.directionsArray = [];
	context.directionsArray.push(this.goUp());
	context.directionsArray.push(this.goRight());
	context.directionsArray.push(this.goDown());
	context.directionsArray.push(this.goLeft());				
    };

    this.goRight = function() {	  
        function action() {		    		   
	    if(context.getX() < context.getCanvasSize() - (context.getSquareSize()*2)) {				
		context.setX(context.getX() + context.getSquareSize());								
		return true;
	    } 		
	    return false;
	}
	return action;
    };

    this.goLeft = function() {
	function action() {
	    if(context.getX() > context.getSquareSize()) {
		context.setX(context.getX() - context.getSquareSize());				
		return true;
	    }
	    return false;
	}
	return action;
    };

    this.goUp = function() {
	function action() {
	    if(context.getY() > context.getSquareSize()) {
		context.setY(context.getY() - context.getSquareSize());				
		return true;
	    }
	    return false;
	}
	return action;
    };
    
    this.goDown = function() {
	function action() {
	    if(context.getY() < context.getCanvasSize() - (context.getSquareSize()*2)) {
		context.setY(context.getY() + context.getSquareSize());				
		return true;
	    }
	    return false;
	}
	return action;
    };
	
    this.makeTheMaze = function(squareMap) {	
	var move = context.getDirectionsArray()[context.getDirectionIndex()];		
	if(!move() || context.moveCount == 10) {
	    //if it can't move, randomize the direction...				
	    if(context.getDirectionIndex() < context.getDirectionsArray().length-1) {					
		context.setDirectionIndex(context.getDirectionIndex()+1);
	    } else {
		context.setDirectionIndex(0);
	    }
	    context.moveCount = 0;
	} else {
	    context.moveCount++;
	}
	//If has wall on the floor...
	if(context.hasWall(squareMap)) {
	    //...break the wall.
	    context.breakTheWall(squareMap);			
	} else {
	    context.getDirectionsArray()[Math.floor(Math.random()*context.getDirectionsArray().length)]();	
	}
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
	
	    for(var j=0;j<squareMap.length;j++) {
		if((squareMap[j][0] == squareMap[context.getPathIndex()][0] && squareMap[j][1]== squareMap[context.getPathIndex()][1] + (context.getSquareSize())) ||
		(squareMap[j][0] == squareMap[context.getPathIndex()][0] + (context.getSquareSize()) && squareMap[j][1]== squareMap[context.getPathIndex()][1]) ||
		(squareMap[j][0] == squareMap[context.getPathIndex()][0] + (context.getSquareSize()) && squareMap[j][1]== squareMap[context.getPathIndex()][1] + (context.getSquareSize() * 2))) {
		    if(squareMap[j][2]=='#000') {
			squareMap[j][3] = 1;
		    }								
		}						
	    }	
	
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
