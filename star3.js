let brightSize = 180;
let darkSize = 190;
let alignmentTolerance = 10;
let haloFadeDistance = 200;
let spaceAudio;
let audioFadeDistance = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  spaceAudio = document.getElementById("space-audio");
}

function draw() {
  background(8, 10, 12);

  drawHalos();
  updateVolume();

  fill(255, 248, 220);
  circle(width / 2, height / 2, brightSize);

  // Draw the cursor's dark circle last to create the eclipse
  fill(20, 23, 28);
  circle(mouseX, mouseY, darkSize);

  if (dist(mouseX, mouseY, width / 2, height / 2) < alignmentTolerance) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function drawHalos() {
  let distanceToMoon = dist(mouseX, mouseY, width / 2, height / 2);
  // Fade from full glow to no glow as the cursor reaches the center
  let haloStrength = constrain(distanceToMoon / haloFadeDistance, 0, 1);

  // Halos 
  fill(255, 237, 187, 4 * haloStrength);
  circle(width / 2, height / 2, brightSize + 200);
  fill(255, 237, 187, 6 * haloStrength);
  circle(width / 2, height / 2, brightSize + 160);
  fill(255, 237, 187, 9 * haloStrength);
  circle(width / 2, height / 2, brightSize + 120);
  fill(255, 237, 187, 12 * haloStrength);
  circle(width / 2, height / 2, brightSize + 80);
  fill(255, 237, 187, 24 * haloStrength);
  circle(width / 2, height / 2, brightSize + 40);
}

function updateVolume() {
  let distanceToMoon = dist(mouseX, mouseY, width / 2, height / 2);
  // Full volume far away, fading to silence at the center
  spaceAudio.volume = constrain(distanceToMoon / audioFadeDistance, 0, 1);
}

function mousePressed() {
  if (dist(mouseX, mouseY, width / 2, height / 2) < alignmentTolerance) {
    window.location.href = "index.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
