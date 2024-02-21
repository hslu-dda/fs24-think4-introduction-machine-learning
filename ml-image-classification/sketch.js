// Initialize the Image Classifier method with MobileNet
let mobilenet;
let img;
let prediction = '';

function preload(){
  img = loadImage('images/border_collie.jpg')
}

function setup() {
  createCanvas(800, 800);
  mobilenet = ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw() {
  background(220);
  image(img, 0, 0)
  fill(255, 255, 0)
  textSize(24)
  text(prediction, 5, 24);
}

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
  mobilenet.classify(img, gotPrediction)
}

function gotPrediction(error, results){
    // Display error in the console
    if (error) {
      console.error(error);
    }
    // The resultss are in an array ordered by confidence.
    console.log(results);
    prediction = results[0].label + " " + results[0].confidence
}
