// Constant Variables
var POINTS_TEXT_X = 5;
var POINTS_TEXT_Y_BUFFER = 5;
var POINTS_FONT = "17pt Arial";

var POINTS_TEXT_X = 5;
var POINTS_TEXT_Y_BUFFER = 5;
var POINTS_FONT = "17pt Arial";

var FOOD_DELAY = 6000;
var FOOD_RADIUS = 5;
var FOOD_COLOR = Color.red;

var food;
var points = 0;
var pointsText;

// Funciton will add the food elemts to the canvas at random x , y points 
function drawFood()
{
    // Randomly adds food with respct to the x axis 
    var x = Randomizer.nextInt(FOOD_RADIUS, getWidth()-FOOD_RADIUS);
   
   // Randomly adds food with respct to the y axis
    var y = Randomizer.nextInt(FOOD_RADIUS, getHeight()-FOOD_RADIUS);
    
    // Get type of elemnt at a certain x,y position
    var elem = getElementAt(x,y);
    
    // Check if there is an element present
    // If no element is present add new food
    if(elem == null){
        food = new Circle(FOOD_RADIUS);
        food.setPosition(x, y);
        food.setColor(FOOD_COLOR);
        add(food);  
    }

}

// Snake Values
var SNAKE_DIM = 10;
var SNAKE_COLOR = Color.green;

var NORTH = 0;
var EAST = 1;
var SOUTH = 2;
var WEST = 3;

var DELAY = 100;
var snake;
var direction = EAST;

// Position for the snake
var snake_x = getWidth()/2;
var snake_y = getHeight()/2;

function draw()
{
    // Adds movement to the rectangle/snake
    // Depending where the snake is facing 
    // Will move x units left right up or down
    if(direction == EAST)
    {
        snake_x += SNAKE_DIM;
    }
    else if(direction == WEST)
    {
        snake_x -= SNAKE_DIM;
    }
    else if(direction == NORTH)
    {
        snake_y -= SNAKE_DIM;
    }
    else if(direction == SOUTH)
    {
        snake_y += SNAKE_DIM;
        
    }
    
    // Updates the values for snake_x and snake_y
    // This new values can only can be used in this function
    snake_x = (snake_x + getWidth()) % getWidth();
    snake_y = (snake_y + getHeight()) % getHeight();
    
    // Gets element at certain position
    var elem = getElementAt(snake_x+0.1,snake_y+0.1);
    
    /* Checks if there is an element present
     * If there no element will drae a snake
     * With the paramenters - position x,y and color
    */ 
    if(elem == null){
        drawSnake(snake_x,snake_y,SNAKE_COLOR);
        points++;
        pointsText.setText(points);
    }
    
    /* Else if there is an obejct at the position
     * First get the type of element present
     * If the element is a rectangle type the user loose
     * Adds text With the words "You loose" at the center of the canvas
     * Stops the timer for adding rectangle and food adding
    */ 
    else{
        var type = elem.getType();
        if(type == "Rectangle"){
            var txt = new Text("You Lose", "30pt Arial");
            txt.setPosition(100, 200);
            add(txt);
            stopTimer(draw); 
            stopTimer(drawFood);
        }
        /* If the condition above is nor satisfied 
         * adds the points text and automatically updates
         * + keeps adding the snake
        */
        else
        {
            points+=100;
            pointsText.setText(points);
            remove(elem);
            drawSnake(snake_x,snake_y,SNAKE_COLOR);
        }
    }
    
}
// Function made for the movement of the snake regarding key events
function keyDown(e)
{
    // If Key pressed is left arrow, snake will move West
    if (e.keyCode == Keyboard.LEFT) 
    {
		direction = WEST;
	} 
	// If Key pressed is right arrow, snake will move East
	else if (e.keyCode == Keyboard.RIGHT) 
	{
		direction = EAST;
	}
	// If Key pressed is up arrow, snake will move North
	else if (e.keyCode == Keyboard.UP) 
	{
		direction = NORTH;
	} 
	// If Key pressed is down arrow, snake will move South
	else if (e.keyCode == Keyboard.DOWN) 
	{
		direction = SOUTH;
	}
	
}

/* Function made to draw the snake, takes three parameter 
 * position x,y and color
*/
function drawSnake(x,y,color){
    
    // snake object with width of 10 and height of 10
    snake = new Rectangle(SNAKE_DIM, SNAKE_DIM);
    snake.setPosition(x, y);
    snake.setColor(color);
    add(snake);
}

// Function ment to count the points the user gains through the game 
// First will add text at the bottom left corner of the canvas
// Update the points
function drawPoints(){
    pointsText = new Text(points, "17pt Arial");
    pointsText.setPosition(POINTS_TEXT_X, getHeight() - POINTS_TEXT_Y_BUFFER);
    add(pointsText);
}

// Will call all of the functions before mentioned in order to work
function start(){
    drawPoints();
    drawFood();
    setTimer(drawFood,FOOD_DELAY);
    drawSnake(snake_x,snake_y,SNAKE_COLOR);
    setTimer(draw,DELAY);
    keyDownMethod(keyDown);

}
