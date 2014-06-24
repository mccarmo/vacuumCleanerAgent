vacuumCleanerAgent
==================

Simple vacuum cleaner implementation based on the first two chapters of "Artificial Intelligence: A Modern Approach" book by Stuart J. Russell and Peter Norvig.

There are four samples of agents in the main.js, but here there're a resume of the basic "actions":

1. goDown , goUp, goRight, goLeft, goToRandomDirection -> Self-explanatory? ;)
2. hasDirty -> if there are "dirty" on the floor, this function will return true.
3. cleanIt -> The agent will clean the dirty tile.

This actions can be used in the "chooseDestiny" function of the agents to make then look for the dirty tiles and clean the dirty.

The stages are randomicaly generated in two ways:

1. Totaly random dirty, clean and obstacle tiles.
2. Maze generator algorithm, that is still under development but you can try it!

The Dirty Tiles are the black ones (#000), the clean tiles are the white ones (#fff) and the dirty tiles (#bbb) the gray ones. 

Have fun! And feel free to contact me to make critics or sugestions. 

