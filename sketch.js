//Create variables here
var dog,dogI;
var happyDog;
var database;
var foodS;
var foodStock;
var fedTime;
var lastFed;
var foodObj;

function preload()
{
  //load images here
  dogI=loadImage("images/Dog.png");
  happyDog=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(100,400);
  database=firebase.database();

  foodObj=new Food();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

    fed =createButton("Feed the Dog");
    fed.position(700,95);
    fed.mousePressed(feedDog);
      
    
    add = createButton("Add Food");
    add.position(800,95);
    add.mousePressed(addFood);

  dog=createSprite(250,250,10,10);
  dog.addImage(dogI);
  dog.scale=0.15;

 // foodStock = database.ref("Food");
  //foodStock.on("value",readStock);

  
  
}


function draw() {  
  background(46,139,87);
   
    textSize=20;
  fill("white");
  stroke("black");
  text("Note : Press UP_ARROW Key To Feed The Dog",200,300);

  foodObj.display();
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  drawSprites();

 }
  
  
  


function readStock(data){
foodS=data.val();
}

function writeStock(x){
if(x<=0){
  x=0;
}
else{
x=x-1;
}

database.ref("/").update({
  Food:x
})
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  });
}

//function to add food in stock
function addFood(){
  foodS++;
  database.ref("/").update({
   Food:foodS 
  })
}

//function to read the Food Stock

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

