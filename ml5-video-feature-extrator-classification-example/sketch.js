// Initialize the Image Classifier method with MobileNet
let mobilenet;
let classifier;

let video;
let prediction = "test";

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

  mobilenet = ml5.featureExtractor("MobileNet", modelLoaded);
  classifier = mobilenet.classification(video, videoReady);

  aButton = createButton("happy");
  aButton.mousePressed(function () {
    classifier.addImage("happy");
  });

  bButton = createButton("sad");
  bButton.mousePressed(function () {
    classifier.addImage("sad");
  });
  
  buttonTrain = createButton("Train the Model");
  buttonTrain.mousePressed(function () {
    classifier.train(whileTraining);
  });
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
  console.log("Model Loaded!");
}

// When the video is ready
function videoReady() {
  console.log("Video is ready!!!");
}

function gotPrediction(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The resultss are in an array ordered by confidence.
    // console.log(results);
    prediction = results[0].label + " " + results[0].confidence;
    classifier.classify(gotPrediction);
  }
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotPrediction);
  } else {
    console.log(loss);
  }
}
