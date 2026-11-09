let ufoX;
let ufoY;

let attempts = 0;
let maxAttempts = 10; 
let returningToSky = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  ufoX = width / 2;
  ufoY = height / 2;
}

function draw() {
  clear();
  cursor(canClickUfo() ? HAND : ARROW);

  // UFO window
  fill(167, 212, 219);
  ellipse(ufoX, ufoY - 12, 48, 42);
  
  // UFO body
  fill(200, 201, 205);
  ellipse(ufoX, ufoY, 114, 33);

  // UFO yellow lights
  fill(255, 220, 0);
  ellipse(ufoX - 30, ufoY, 8, 8);
  ellipse(ufoX, ufoY, 8, 8);
  ellipse(ufoX + 30, ufoY, 8, 8);
}

function mouseMoved() {
  if (attempts >= maxAttempts) {
    return;
  }

  if (dist(mouseX, mouseY, ufoX, ufoY) < 100) {
    // Jump UFO to a random position
    ufoX = random(57, width - 57);
    ufoY = random(33, height - 25);
    attempts++;
  }
}

function canClickUfo() {
  return (
    !returningToSky &&
    attempts >= maxAttempts &&
    mouseX >= ufoX - 38 &&
    mouseX <= ufoX + 38 &&
    mouseY >= ufoY - 22 &&
    mouseY <= ufoY + 11
  );
}

function mousePressed() {
  // Only start the return once.
  if (returningToSky) {
    return;
  }

  if (canClickUfo()) {
    returningToSky = true;
    let overlay = document.getElementById("white-overlay");

    // Return only after the screen is fully white.
    overlay.addEventListener("transitionend", function () {
      sessionStorage.setItem("ufoReturn", "yes");
      window.location.href = "index.html";
    }, { once: true });
    overlay.classList.add("visible");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ufoX = constrain(ufoX, 40, width - 40);
  ufoY = constrain(ufoY, 25, height - 25);
}
