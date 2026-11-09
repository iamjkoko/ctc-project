let earth;
let apollo;
let apolloWidth = 420;
let apolloScale = 1;
let apolloPulsing = true;
let photoWidth;
let photoHeight;
let armstrongAudio;
let astronaut;
let astronautsStarted = false;
let slideProgress = 0;
let slideDuration = 30000;
// Landing spots: left, foreground, and right
let astronautSpots = [
  { x: 0.35, y: 0.82 },
  { x: 0.52, y: 0.98 },
  { x: 0.6, y: 0.9 }
];
let earthWidth = 100;
let horizonHeight = 0.67;
let earthX = 0.5;
let earthY = 0.25;
let haloOffset = 0;

function preload() {
  earth = loadImage("earth.png");
  apollo = loadImage("apollo-11.png");
  astronaut = loadImage("astranaut.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  imageMode(CENTER);
  armstrongAudio = new Audio("neil-armstrong.mp3");
  earth = earth.get(583, 310, 985, 990);
}

function draw() {
  background(8, 10, 12);

  let moonRadius = max(width * 1.5, height * 2);
  fill(195);
  circle(width * 0.5, height * horizonHeight + moonRadius, moonRadius * 2);

  // Craters
  fill(155);
  ellipse(width * 0.25, height * 0.85, width * 0.12, height * 0.035);
  ellipse(width * 0.55, height * 0.92, width * 0.18, height * 0.045);
  ellipse(width * 0.77, height * 0.82, width * 0.09, height * 0.025);

  // Place the Apollo photo on the surface and keep its proportions.
  // Gently pulse by 2% in either direction over four seconds.
  if (apolloPulsing) {
    apolloScale = 1 + 0.06 * Math.sin(millis() * Math.PI * 2 / 4000);
  }
  photoWidth = min(apolloWidth, width * 0.5, height * 0.48) * apolloScale;
  photoHeight = photoWidth * apollo.height / apollo.width;
  image(apollo, width * 0.65, height * 0.75, photoWidth, photoHeight);

  // Slide astronauts in different directions, then stop.
  if (astronautsStarted) {
    slideProgress = min(1, slideProgress + deltaTime / slideDuration);
    let astronautHeight = min(140, height * 0.18, width * 0.2);
    let astronautWidth = astronautHeight * astronaut.width / astronaut.height;
    for (let i = 0; i < 3; i++) {
      let destinationX = width * astronautSpots[i].x;
      let destinationY = height * astronautSpots[i].y;
      let x = lerp(width * 0.65, destinationX, slideProgress);
      let y = lerp(height * 0.85, destinationY, slideProgress);
      image(astronaut, x, y - astronautHeight / 2, astronautWidth, astronautHeight);
    }
  }

  cursor(overEarth() || overApollo() ? HAND : ARROW);
  // Move five halos outward, then restart them behind Earth
  haloOffset = (haloOffset + 0.25) % 120;
  for (let i = 0; i < 5; i++) {
    let haloExtra = (haloOffset + i * 24) % 120;
    // Fade each halo as it spreads into the sky
    let haloAlpha = 25 * (1 - haloExtra / 120);
    fill(170, 215, 255, haloAlpha);
    circle(width * earthX, height * earthY, earthWidth + haloExtra);
  }

  let earthHeight = earthWidth * earth.height / earth.width;
  image(earth, width * earthX, height * earthY, earthWidth, earthHeight);
}

function overEarth() {
  return dist(mouseX, mouseY, width * earthX, height * earthY) < earthWidth / 2;
}

function overApollo() {
  return mouseX > width * 0.65 - photoWidth / 2 &&
    mouseX < width * 0.65 + photoWidth / 2 &&
    mouseY > height * 0.75 - photoHeight / 2 &&
    mouseY < height * 0.75 + photoHeight / 2;
}

function mousePressed() {
  if (overEarth()) {
    window.location.href = "index.html";
  } else if (overApollo()) {
    apolloPulsing = false;
    astronautsStarted = true;
    slideProgress = 0;
    // Restart the recording on each click
    armstrongAudio.currentTime = 0;
    armstrongAudio.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
