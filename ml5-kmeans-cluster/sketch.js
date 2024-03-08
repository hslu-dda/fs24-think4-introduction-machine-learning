/*
A clustering example using Kmeans.
Inspired by the p5 sketch of Tom-Lucas Säger 2021
https://editor.p5js.org/ml5/sketches/KMeans_mouseClustering
*/

let data = [];
let calculated = false;
let kmeans;
let slider, sliderLabel;
let clusterCount = 4;

function setup() {
  createCanvas(400, 400);
  background(0);
  colorMode(HSB);
  noStroke();
  ellipseMode(CENTER);

  // we create some artificial data to cluster
  // you can replace this data with something from the csv for example
  for (let i = 0; i < 30; i++) {
    data.push({ x: random(width), y: random(height) });
  }

  // we draw the created data (white ellipses)
  data.forEach((obj) => {
    console.log("random data x: ", obj.x, " y: ", obj.y);
    ellipse(obj.x, obj.y, 20, 20);
  });

  //A button is added to start clustering the data
  let calculateButton = createButton("Cluster");
  calculateButton.mouseClicked(cluster);
}

// the function that clusters our data
function cluster() {
  // the kmeans clustering options
  const options = {
    k: 3, // how many clusters we want
    maxIter: 500,
    threshold: 0.9,
  };
  kmeans = ml5.kmeans(data, options, clustersCalculated);
}

function clustersCalculated() {
  // when we are done clustering, we set this to true to trigger a redraw
  calculated = true;
}
//When the clustering is done, we recolor the data-points based on their centroid
function draw() {
  if (calculated) {
    for (i = 0; i < kmeans.dataset.length; i++) {
      let centroid = kmeans.dataset[i].centroid;
      let datapointx = kmeans.dataset[i][0];
      let datapointy = kmeans.dataset[i][1];
      //We are using the HSB colorMode here
      fill(centroid * 36, 100, 100);
      ellipse(datapointx, datapointy, 20, 20);
      //We also add a label to the output, so it could be interpreted without the color
      fill(0);
      textAlign(CENTER, CENTER);
      text(centroid + 1, datapointx, datapointy);
    }
  }
}
