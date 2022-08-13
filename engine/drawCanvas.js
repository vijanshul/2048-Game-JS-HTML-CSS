// Inspiration: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

var canvas = {};
var xPositionCenter = 0;
var yPositionCenter = 0;
var elementColor = "";
var containers = document.getElementsByClassName("material-design");

(context = {}),
  (element = {}),
  (radius = 0),
  (requestAnimFrame = (function () {
    return (
      this.requestAnimationFrame ||
      this.mozRequestAnimationFrame ||
      this.oRequestAnimationFrame ||
      this.msRequestAnimationFrame ||
      function (callback) {
        this.setTimeout(callback, 1000 / 60);
      }
    );
  })()),
  (init = function init() {
    this.containers = Array.prototype.slice.call(this.containers);

    for (var i = 0; i < this.containers.length; i++) {
      this.canvas = document.createElement("canvas");
      this.canvas.addEventListener("click", press, false);
      this.containers[i].appendChild(this.canvas);
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }
  }),
  (press = (event) => {
    elementColor = event.toElement.parentElement.dataset.color;
    element = event.toElement;
    context = element.getContext("2d");
    radius = 0;
    xPositionCenter = event.offsetX;
    yPositionCenter = event.offsetY;
    context.clearRect(0, 0, element.width, element.height);
    draw();
  }),
  (draw = (function (_draw) {
    const draw = () => _draw.apply(this, arguments);
    draw.toString = () => _draw.toString();
    return draw;
  })(() => {
    context.beginPath();
    context.arc(
      xPositionCenter,
      yPositionCenter,
      radius,
      0,
      2 * Math.PI,
      false
    );
    context.fillStyle = elementColor;
    context.fill();
    radius += 2;

    if (radius < element.width) {
      requestAnimFrame(draw);
    }
  }));
init();
