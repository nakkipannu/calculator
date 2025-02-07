document.addEventListener('DOMContentLoaded', function() {
  var formElement = document.forms.myForm;
  var resultDiv = document.getElementById('myResults');

  // Function to ensure only numbers are entered and enforce max value
  function enforceNumericInput(event) {
    var value = event.target.value;
    var max = event.target.max;
    event.target.value = value.replace(/[^0-9]/g, '');
    if (parseInt(event.target.value, 10) > max) {
      event.target.value = max;
    }
  }

  // Add event listeners to input fields
  document.getElementById('cups').addEventListener('input', enforceNumericInput);
  document.getElementById('days').addEventListener('input', enforceNumericInput);

  formElement.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the form from submitting and reloading the page

      var cups = document.getElementById('cups').value;
      var days = document.getElementById('days').value;

      // Check if either field is empty
      if (!cups || !days) {
          showCustomAlert('Both fields need to be filled');
          return;
      }

      var result1 = (parseFloat(cups) * 20) / 1000;
      var result2 = (parseFloat(cups) * parseFloat(days) * 20) / 1000;
      var result3 = result2 * 4;
      var result4 = result2 * 52;
      var result5 = Math.round((result3 / 9) * 11);
      var result6 = Math.round((result4 / 9) * 11);
      document.getElementById('resultDisplay1').innerHTML = result1; // put your results where they need to be
      document.getElementById('resultDisplay2').innerHTML = result2;
      document.getElementById('resultDisplay3').innerHTML = result3;
      document.getElementById('resultDisplay4').innerHTML = result4;
      document.getElementById('resultDisplay5').innerHTML = result5;
      document.getElementById('resultDisplay6').innerHTML = result6;
      resultDiv.style.display = 'inherit'; // make the hidden div visible.

      // Trigger spark effect
      var rect = this.querySelector('.submitButton').getBoundingClientRect();
      var startX = rect.left + (rect.width / 2);
      var startY = rect.top + (rect.height / 2);
      sparkShower(startX, startY, window.innerWidth, window.innerHeight);
  });

  // Add spark effect to submit button
  var submitButton = document.querySelector('.submitButton');
  submitButton.addEventListener('click', function(e) {
      var rect = this.getBoundingClientRect();
      var startX = e.clientX - rect.left;
      var startY = e.clientY - rect.top;
      sparkShower(startX, startY, rect.width, rect.height);
  });
});

// Function to show custom alert
function showCustomAlert(message) {
  var customAlert = document.getElementById('customAlert');
  var customAlertMessage = document.getElementById('customAlertMessage');
  customAlertMessage.innerText = message;
  customAlert.style.display = 'flex';
}

// Function to close custom alert
function closeCustomAlert() {
  var customAlert = document.getElementById('customAlert');
  customAlert.style.display = 'none';
}

// Spark effect logic
var particles = [];
var alreadyRendering = false;

function sparkShower(startx, starty, sparkWidth, sparkHeight) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;
  var colors = ['#AF4A0D', '#FFD064', '#FEFFFD'];
  var gravity = 0.08;
  var floor = height;
  var currentlySparking = false;
  var maxSize = 10;
  var ag = 9.81;

  function initParticles() {
    currentlySparking = true;
    for (var i = 0; i < 50; i++) {
      setTimeout(function() {
        createParticle(i);
        createParticle(i * 2);
      }, i);
    }
  }

  function createParticle(i) {
    var x = startx;
    var y = starty;
    var z = (Math.random() * 2);
    var maxex = Math.random() * 20;
    var vx = (Math.random() * maxex) - (maxex / 2);
    var vy = (Math.random() * -20);
    var vsize = 0;
    var size = 1 + Math.random();
    var color = colors[Math.floor(Math.random() * colors.length)];
    var opacity = 0.5 + Math.random() * 0.5;
    var d = new Date();
    var startTime = d.getTime();
    var p = new Particle(x, y, z, vx, vy, size, vsize, color, opacity, startTime, startTime);
    p.finished = false;
    particles.push(p);
  }

  function Particle(x, y, z, vx, vy, size, vsize, color, opacity, startTime, lastTime) {
    function reset() {
      opacity = 0;
      this.finished = true;
    }

    this.update = function() {
      if (opacity - 0.0005 > 0) opacity -= 0.0005;
      else reset();
      var d = new Date();
      var timeNow = d.getTime();
      if (timeNow > lastTime)
        vy += (ag * ((timeNow - lastTime) / 1000) * 4.7);
      lastTime = timeNow;
      x += vx;
      y += vy;
      if (y > (floor + 10)) this.finished = true;
      if (size < maxSize) size += vsize * z;
      if ((opacity < 0.5) && (y < floor)) {
        vsize = 0.55 - opacity;
      } else {
        vsize = 0;
      }
      if (y > floor) {
        vy = vy * -0.4;
        vx = vx * 0.96;
      }
    };

    this.draw = function() {
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    };
  }

  function render() {
    alreadyRendering = true;
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
      if (typeof particles[i] !== "undefined") {
        if (particles[i].finished === true) {
          particles.splice(i, 1);
        } else {
          particles[i].update();
          particles[i].draw();
        }
      }
    }
    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  initParticles();
  if (!alreadyRendering)
    render();
}