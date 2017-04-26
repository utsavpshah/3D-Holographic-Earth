function antipode(coord) {
  return [-1 * coord[0], coord[1] - 180];
}

function eastode(coord) {
  return [coord[0], coord[1] + 90];
}

function westode(coord) {
  return [coord[0], coord[1] - 90];
}


var controllerOptions = {
  enableGestures: true
};

var earth, earth1, earth2, earth3;

function initialize() {
  var widthElement = ($("#earth_div_center_top").width() / 2);
  var centerTop = (window.innerWidth / 2) - widthElement;
  var top = (window.innerHeight / 2) - ($("#left").height() / 2);
  var center1 = [0.0, 78.0];

  $("#earth_div_center_top").css({
    top: 0,
    left: centerTop,
    position: 'absolute'
  });
  earth = new WE.map('earth_div_center_top');
  earth.setView(center1, 1);
  WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
    tileSize: 256,
    bounds: [
      [-85, -180],
      [85, 180]
    ],
    minZoom: 0,
    maxZoom: 16,
    attribution: 'WebGLEarth example',
    tms: true
  }).addTo(earth);

  earth1 = new WE.map('earth_div_bottom_center');
  earth1.setView(antipode(center1), 1);
  WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
    tileSize: 256,
    bounds: [
      [-85, -180],
      [85, 180]
    ],
    minZoom: 0,
    maxZoom: 16,
    attribution: 'WebGLEarth example',
    tms: true
  }).addTo(earth1);

  $("#earth_div_bottom_center").css({
    bottom: 0,
    left: centerTop,
    position: 'absolute'
  });
  $("#earth_div_bottom_center")[0].style.WebkitTransform = "scale(-1,1)";
  $("#earth_div_bottom_center")[0].style.WebkitTransform = "rotate(180deg)";

  earth2 = new WE.map('left');
  earth2.setView(eastode(center1), 1);
  WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
    tileSize: 256,
    bounds: [
      [-85, -180],
      [85, 180]
    ],
    minZoom: 0,
    maxZoom: 16,
    attribution: 'WebGLEarth example',
    tms: true
  }).addTo(earth2);
  $("#left").css({
    top: top,
    left: centerTop - (2 * widthElement),
    position: 'absolute'
  });
  $("#left")[0].style.WebkitTransform = "rotate(270deg)";

  earth3 = new WE.map('right');
  earth3.setView(westode(center1), 1);
  WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
    tileSize: 256,
    bounds: [
      [-85, -180],
      [85, 180]
    ],
    minZoom: 0,
    maxZoom: 16,
    attribution: 'WebGLEarth example',
    tms: true
  }).addTo(earth3);

  $("#right").css({
    top: top,
    left: centerTop + (2 * widthElement),
    position: 'absolute'
  });
  $("#right")[0].style.WebkitTransform = "rotate(90deg)";

  var popupContent = $(".we-pp-content");
  for (var count = 0; count < popupContent.length; count++) {
    popupContent[count].style.WebkitTransform = "scale(-1,1)";
  }
}


Leap.loop(controllerOptions, function(frame) {
  if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];

      if (gesture.type == "swipe") {
        //Classify swipe as either horizontal or vertical
        var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
        //Classify as right-left or up-down
        if (isHorizontal) {
          if (gesture.direction[0] > 0) {
            var before = null;
            var c = earth.getPosition();
            var cB = earth1.getPosition();
            var cE = earth2.getPosition();
            var cW = earth3.getPosition();
            earth.setCenter([c[0], c[1] - 0.1 * (100 / 3)]);
            earth1.setCenter([cB[0], cB[1] - 0.1 * (100 / 3)]);
            //earth1.setCenter([c[0], c[1] - 0.1*(100/3)]);
            earth2.setCenter([cE[0], cE[1] - 0.1 * (100 / 3)]);
            earth3.setCenter([cW[0], cW[1] - 0.1 * (100 / 3)]);

            swipeDirection = "right";
          } else {

            var c = earth.getPosition();
            var cB = earth1.getPosition();
            var cE = earth2.getPosition();
            var cW = earth3.getPosition();

            earth.setCenter([c[0], c[1] + 0.1 * (100 / 3)]);
            earth1.setCenter([cB[0], cB[1] + 0.1 * (100 / 3)]);
            earth2.setCenter([cE[0], cE[1] + 0.1 * (100 / 3)]);
            earth3.setCenter([cW[0], cW[1] + 0.1 * (100 / 3)]);
            swipeDirection = "left";
          }
        } else { //vertical
          if (gesture.direction[1] > 0) {

            var c = earth.getPosition();
            var cB = earth1.getPosition();
            var cE = earth2.getPosition();
            var cW = earth3.getPosition();

            earth.setCenter([c[0] - 0.1 * (100 / 3), c[1]]);
            earth1.setCenter([cB[0] - 0.1 * (100 / 3), cB[1]]);
            earth2.setCenter([cE[0] - 0.1 * (100 / 3), cE[1]]);
            earth3.setCenter([cW[0] - 0.1 * (100 / 3), cW[1]]);
            swipeDirection = "up";
          } else {

            var cB = earth1.getPosition();
            var cE = earth2.getPosition();
            var cW = earth3.getPosition();

            var c = earth.getPosition();
            earth.setCenter([c[0] + 0.1 * (100 / 3), c[1]]);
            earth1.setCenter([cB[0] + 0.1 * (100 / 3), cB[1]]);
            earth2.setCenter([cE[0] + 0.1 * (100 / 3), cE[1]]);
            earth3.setCenter([cW[0] + 0.1 * (100 / 3), cW[1]]);
            swipeDirection = "down";
          }
        }

      }
    }
  }
})

$(document).keydown(function(e) {

  if (e.which == 37) { //left
    var c = earth.getPosition();
    earth.setCenter([c[0], c[1] + 0.1 * (100 / 3)]);
    var opp = antipode(c);
    earth1.setCenter([opp[0], opp[1]]);
    //earth1.setCenter([c[0], c[1] + 0.1*(100/3)]);
    //earth2.setCenter([c[0], c[1] + 0.1*(100/3)]);
    earth2.setCenter(eastode(c));
    //earth3.setCenter([c[0], c[1] + 0.1*(100/3)]);
    earth3.setCenter(westode(c));
  } else if (e.which == 38) { //up

    var c = earth.getPosition();
    earth.setCenter([c[0] - 0.1 * (100 / 3), c[1]]);
    //earth1.setCenter([c[0]- 0.1*(100/3), c[1] ]);
    earth1.setCenter(antipode(c));
    //earth2.setCenter([c[0]- 0.1*(100/3), c[1] ]);
    earth2.setCenter(eastode(c));
    //earth3.setCenter([c[0]- 0.1*(100/3), c[1] ]);
    earth3.setCenter(westode(c));
  } else if (e.which == 39) { //right
    var c = earth.getPosition();
    earth.setCenter([c[0], c[1] - 0.1 * (100 / 3)]);
    //earth1.setCenter([c[0], c[1] - 0.1*(100/3)]);
    earth1.setCenter(antipode(c));
    //earth2.setCenter([c[0], c[1] - 0.1*(100/3)]);
    earth2.setCenter(eastode(c));
    //earth3.setCenter([c[0], c[1] - 0.1*(100/3)]);
    earth3.setCenter(westode(c));
  } else if (e.which == 40) { //down

    var c = earth.getPosition();
    earth.setCenter([c[0] + 0.1 * (100 / 3), c[1]]);
    //earth1.setCenter([c[0] - 0.1*(100/3), c[1]]);
    earth1.setCenter(antipode(c));
    //earth2.setCenter([c[0]+ 0.1*(100/3), c[1] ]);
    earth2.setCenter(eastode(c));
    //earth3.setCenter([c[0]+ 0.1*(100/3), c[1] ]);
    earth3.setCenter(westode(c));
  }
});
