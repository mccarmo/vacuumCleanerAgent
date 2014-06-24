function VacuumCleaner() {
    var context = this;
    var x,y,color,squareSize,canvasSize,width,height, dirtyIndex = -1, directionIndex = 0, directionsArray;
   
    this.init = function(properties) {
        context.x = properties.x;
        context.y = properties.y;
		context.color = properties.color;
        context.squareSize = properties.squareSize;
        context.canvasSize = properties.canvasSize;
        context.width = properties.squareSize;
        context.height = properties.squareSize;        
		context.dirtyIndex = -1;
		context.directionIndex = 0;
		context.directionsArray = [];
		context.directionsArray.push(context.goUp());
		context.directionsArray.push(context.goRight());
		context.directionsArray.push(context.goDown());
		context.directionsArray.push(context.goLeft());				
    };
    
    this.goRight = function() {	  
        function action() {		    		   
	    if(context.getX() < context.getCanvasSize() - context.getWidth()) {				
		context.setX(context.getX() + context.getSquareSize());				
		if(context.hasObstacle()) {
		    context.setX(context.getX() - context.getSquareSize());
		    return false; 
		}
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
				if(context.hasObstacle()) {
					context.setX(context.getX() + context.getSquareSize());
					return false; 
				}
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
				if(context.hasObstacle()) {
					context.setY(context.getY() + context.getSquareSize());
					return false; 
				}
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
			if(context.hasObstacle()) {
				context.setY(context.getY() - context.getSquareSize());
				return false; 
			}
			return true;
			}
			return false;
		}
		return action;
    };

    this.goToRandomDirection = function() {
        return context.getDirectionsArray()[Math.floor(Math.random()*context.getDirectionsArray().length)]();
    }	

    this.chooseDestiny = function() {};
 	
    this.hasObstacle = function() {
        for(var i=0;i<squareMap.length;i++) {
			if(squareMap[i][0]==context.getX() && squareMap[i][1]==context.getY()) {
				if(squareMap[i][2]=='#000'){
					return true;	
				} 
			} 
		}
		return false;
    };
  
    this.hasDirty = function(squareMap) {    
        for(var i=0;i<squareMap.length;i++) {
			if(squareMap[i][0]==context.getX() && squareMap[i][1]==context.getY()) {
				if(squareMap[i][2]=='#bbb'){
					context.setDirtyIndex(i);
					return true;	
				} 
			} 
		}
		return false;
    };

    this.cleanIt = function(squareMap) {
        squareMap[context.getDirtyIndex()][2] = '#fff';
        context.setDirtyIndex(-1);
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

    this.getWidth= function() {
	return context.width;
    }

    this.getHeight = function() {
	return context.height;
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

    this.getDirtyIndex = function() {
	return context.dirtyIndex;
    }

    /*Set's*/
    this.setX = function(newX) {
	context.x = newX;
    }

    this.setY = function(newY) {
	context.y = newY;
    }

    this.setWidth = function(newWidth) {
	context.width = newWidth;
    }

    this.setHeight = function(newHeight) {
	context.height = newHeight;
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

    this.setDirtyIndex = function(newDirtyIndex) {
	context.dirtyIndex = newDirtyIndex;
    }
}
