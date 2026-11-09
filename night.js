// Empty array
let stars = [];
let glowingStars = [];

let moonX;
let moonY;

let haloSize = 20;
let growing = true;
let skyRevealStarted = false;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Save the position and size of each background star
  // (This is because the draw() function redraws the whole canvas for the halo.)
  for (let i = 0; i < 80; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4)
    });
  }

  moonX = random(40, width * 0.81 - 60);
  moonY = random(40, height * 0.55 - 60);

  glowingStars.push({ x: width * 0.28, y: height * 0.55, page: "star1.html" });
  glowingStars.push({ x: width * 0.58, y: height * 0.78, page: "star2.html" });
  glowingStars.push({ x: width * 0.81, y: height * 0.23, page: "star3.html" });
}

function draw() {
  background(8, 10, 12);
  cursor(getClickablePage() ? HAND : ARROW);

  // Background stars
  fill(245, 242, 225);
  for (let i = 0; i < stars.length; i++) {
    circle(stars[i].x, stars[i].y, stars[i].size);
  }

  // Moon
  fill(255, 237, 187);
  circle(moonX, moonY, 80);

  // Halos and glowing stars
  for (let i = 0; i < glowingStars.length; i++) {
    let star = glowingStars[i];
  
    fill(255, 237, 187, 30);
    circle(star.x, star.y, haloSize);
  
    fill(255, 248, 220);
    circle(star.x, star.y, 10);
  }

  // Grow or shrink the halo each frame
  if (growing) {
    haloSize = haloSize + 0.25;
  } else {
    haloSize = haloSize - 0.25;
  }

  // Switch direction at the largest and smallest sizes
  if (haloSize >= 40) {
    growing = false;
  } else if (haloSize <= 16) {
    growing = true;
  }

  // Wait for page assets and the first sky drawing before revealing it.
  if (
    document.documentElement.classList.contains("ufo-return") &&
    document.readyState === "complete" &&
    !skyRevealStarted
  ) {
    skyRevealStarted = true;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.add("reveal-sky");
      });
    });
  }
}

function getClickablePage() {
  // Moon
  if (
    mouseX > moonX - 40 && mouseX < moonX + 40 &&
    mouseY > moonY - 40 && mouseY < moonY + 40
  ) {
    return "moon.html";
  }

  // Glowing stars
  for (let i = 0; i < glowingStars.length; i++) {
    let star = glowingStars[i];

    if (
      mouseX > star.x - 20 && mouseX < star.x + 20 &&
      mouseY > star.y - 20 && mouseY < star.y + 20
    ) {
      return star.page;
    }
  }
  return null;
}

function mousePressed() {
  let page = getClickablePage();
  if (page) {
    window.location.href = page;
  }
}
