// Initialize the Image Classifier method with MobileNet
let mobilenet;
let video;
let prediction = '';


function setup() {
  createCanvas(640, 480);
  mobilenet = ml5.imageClassifier('MobileNet', modelLoaded);
  video = createCapture(VIDEO);
  video.size(640, 480);
  // hide the html video element to only display it in the canvas
  video.hide();
  frameRate(25);
}

function draw() {
  background(220);
  image(video, 0, 0, 640, 480);

  fill(255, 255, 0);
  textSize(24);
  text(prediction, 20, 24);

  mobilenet.classify(video, gotPrediction)

}

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

function gotPrediction(error, results){
    // Display error in the console
    if (error) {
      console.error(error);
    }
    // The resultss are in an array ordered by confidence.
    // console.log(results);
    prediction = results[0].label + " " + results[0].confidence
}
