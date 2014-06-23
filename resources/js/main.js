var squareMap = [];
var squareTypes = ['#fff','#000','#bbb']; //#fff - clean / 1 - #bbb - dirty / 2 - #000 - obstacle
var squareSize = 30;
var canvasSize = 600;	
var canvas = '';

//Function to draw the agents...
function drawAgent(vacuumCleaner, context) {        
    context.beginPath();
    context.rect(vacuumCleaner.x, vacuumCleaner.y, vacuumCleaner.width, vacuumCleaner.height);
    context.fillStyle = vacuumCleaner.color;
    context.fill();
    context.lineWidth = vacuumCleaner.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();
}

//Function to draw the random dirty room
function createRandomDirtyRoom() {
    for (var x = 0; x < (canvasSize+1); x += squareSize) {
        for (var y = 0; y < (canvasSize+1); y += squareSize) { 								
            if(x == 0 || y == 0 || x >= canvasSize-squareSize || y >= canvasSize-squareSize) {
		squareMap.push([x,y,'#fff',0]);
	    } else {
		squareMap.push([x,y,squareTypes[Math.floor(Math.random()*squareTypes.length)],0]);
            }				
        }
    }    	
}  

//Function to make the Maze with some animation...
function animateTheMaze(maze) {
    
    maze.makeTheMaze(squareMap);

    if(maze.getVisitedCells() < squareMap.length) {	
        /*requestAnimFrame(function() {
            setTimeout(function() {
	        animateTheMaze(maze);
            }, 1);
        });*/			
        animateTheMaze(maze);
    } else {
	//Create the Dirty
        console.log('Finished!');
    }
}

//Function to create the maze dirty room
function createMazeDirtyRoom() {
    //Mark all squares as Walls
    for (var x = 0; x < (canvasSize+1); x += squareSize) {
        for (var y = 0; y < (canvasSize+1); y += squareSize) { 
	    if(x == 0 || y == 0 || x >= canvasSize-squareSize || y >= canvasSize-squareSize) {
		squareMap.push([x,y,'#000',1]);
	    } else {
		squareMap.push([x,y,'#000',0]);
            }	
        }
    }    
				
    var maze = new MazeMaker();
    maze.init({'x': squareSize,'y':squareSize,'squareSize':squareSize,'canvasSize':canvasSize});	
		
    animateTheMaze(maze);
} 

//Function to draw the room
function drawDirtyRoomTiles(context) {
    for (var i = 0; i < squareMap.length; i++) {  
        context.beginPath();
        context.rect(squareMap[i][0],squareMap[i][1], squareSize, squareSize);
        context.fillStyle = squareMap[i][2];
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#bbb';
        context.stroke(); 
   } 
}			

//Function to animate the game!
function animate(vacuumCleanerList, canvas, context) {	
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);
			
    drawDirtyRoomTiles(context);
    
    //Vacuum Cleaner brain goes here...
    vacuumCleanerList.map(function(v){
        v.chooseDestiny(squareMap); 
        drawAgent(v, context);
    });

    // request new frame
    requestAnimFrame(function() {
        setTimeout(function() {
	    animate(vacuumCleanerList, canvas, context);
        }, 100);
    });
}

//Function to generate the requested game type by initializing the room and the agents.
function generateRoom(type) {	
    squareMap = [];
    canvas = document.getElementById('dirtyRoom');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    var context = canvas.getContext('2d');

    window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
		   window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
		   window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
    })();
        
    var vacuumCleanerList = []; 	
    if(type=='random') {
        /*Creating four vacuum cleaner agents on each corner of the 'world' 
          and give then some brain (chooseDestiny function)....*/
        for(var i = 0;i<4;i++) {
	    var vacuumCleaner = new VacuumCleaner();
	    vacuumCleaner.init({'x':0,'y':0,'squareSize':squareSize,'canvasSize':canvasSize});
	    vacuumCleanerList.push(vacuumCleaner);		
	}
		
	var v1 = vacuumCleanerList[0];
	v1.color = '#afa';
	v1.chooseDestiny = function(squareMap) {	    
	    /*
            Random walking example 1
	    Random Agent who cleans the dirty in a continuous direction when the dirty is found!
	    The directionsArray is a internal array that can be used to simplify the code.
  	    The directions on array are: up, right, down, left 
	    The directionIndex, in this example, is the current index of the directionsArray, that initializes at "0". 		
  	    */
	    var move = v1.getDirectionsArray()[v1.getDirectionIndex()];		
	    if(!move()) {
		//if it can't move, randomize the direction...
		v1.setDirectionIndex(Math.floor(Math.random()*v1.getDirectionsArray().length));							
	    }
	    //If has dirty on the floor...
	    if(v1.hasDirty(squareMap)) {
	        //...clean the dirty.
	        v1.cleanIt(squareMap);			
	    } else {
		//if nothing to clean here, randomize the direction...
		v1.setDirectionIndex(Math.floor(Math.random()*v1.getDirectionsArray().length));
	    }					
	};
		
	var v2 = vacuumCleanerList[1];
	v2.color = '#aff';
	v2.x = 0;
	v2.y = (canvasSize - squareSize);
	v2.chooseDestiny = function(squareMap) {
            //Random walking example 2
            if(v2.hasDirty(squareMap)) {
                v2.cleanIt(squareMap);
            }
	    if(v2.goUp()() && v2.hasDirty(squareMap)) {
	        v2.cleanIt(squareMap);
	    } else if(v2.goRight()() && v2.hasDirty(squareMap)) {
                v2.cleanIt(squareMap);
            } else if (v2.goDown()() && v2.hasDirty(squareMap)) {
                v2.cleanIt(squareMap);
            } else if (v2.goLeft()() && v2.hasDirty(squareMap)) {
                v2.cleanIt(squareMap);
            } else {
                v2.goToRandomDirection();	 
            }
	};
	
	var v3 = vacuumCleanerList[2];
	v3.color = '#ffa';
	v3.x = (canvasSize - squareSize);
	v3.y = 0;
	v3.chooseDestiny = function(squareMap) {  
            //Random Walking example 3                                              
            v3.goToRandomDirection();
            if(v3.hasDirty(squareMap)) {
                v3.cleanIt(squareMap);
            }
	};
	
	var v4 = vacuumCleanerList[3];
	v4.color = '#faa';
	v4.x = (canvasSize - squareSize);
	v4.y = (canvasSize - squareSize);
	v4.chooseDestiny = function(squareMap) {
            //Circle walking...
	    if(!v4.getDirectionsArray()[v4.getDirectionIndex()]()) {
                if(v4.getDirectionIndex()<v4.getDirectionsArray().length-1) {
                    v4.setDirectionIndex(v4.getDirectionIndex()+1);
                } else {
                    v4.setDirectionIndex(0); 
                }
            }
            if(v4.hasDirty(squareMap)) {
                v4.cleanIt(squareMap);
            }
	};
	
	createRandomDirtyRoom();
    } else if (type=='maze') {	  
        var v1 = new VacuumCleaner();
	v1.init({'x':squareSize,'y':squareSize,'color':'#ffa','squareSize':squareSize,'canvasSize':canvasSize});	
	v1.chooseDestiny = function(squareMap) {  
            //Random Walking example 3                                              
            v1.goToRandomDirection();
            if(v1.hasDirty(squareMap)) {
                v1.cleanIt(squareMap);
            }
	};    
        vacuumCleanerList.push(v1);
	createMazeDirtyRoom();
    }

    animate(vacuumCleanerList, canvas, context);
}
