// Initialize the Image Classifier method with MobileNet
let mobilenet;
let classifier;
let video;
let prediction = '';

let aButton;
let bButton;
let trainButton;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  // hide the html video element to only display it in the canvas
  video.hide();
  frameRate(25);

  mobilenet = ml5.featureExtractor('MobileNet', modelLoaded);
  classifier = mobilenet.classification(video, videoReady)

  aButton = createButton("happy");
  bButton = createButton("sad");
}

function draw() {
  background(220);
  image(video, 0, 0, 640, 480);

  fill(255, 255, 0);
  textSize(24);
  text(prediction, 20, 24);

}

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

function videoReady(){
  console.log("Video ready")
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
