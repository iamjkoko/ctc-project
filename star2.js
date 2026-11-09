const video = document.getElementById("star2-video");
const ending = document.getElementById("star2-ending");

video.addEventListener("ended", function () {
  video.hidden = true;
  ending.hidden = false;
});
