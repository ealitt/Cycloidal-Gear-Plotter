var drawSVG;
var cycloid = [];
var polyline;
var cy;

window.onload = function(){
    cy = new Cycloid();          // created new Cycloid
    var gui = new dat.GUI();    // initialize dat gui
    gui.add(cy, 'lobes', 1, 100, 1).onChange(function(){render()}); // add dat gui lobes slider
    gui.add(cy, 'scale', 1, 20, 1).onChange(function(){render()}); // add dat gui scale slider
    render();
};

// initial cycloid conditions
var Cycloid = function(){
    cycloid = [];
    this.lobes = 10; // number of lobes on cycloid: determines gear ratio
    this.scale = 5; // scale factor for viewing size
    this.x = 500;   // centers svg drawing in x direction
    this.y = 500;   // centers svg drawing in y direction
    this.theta = 0.005; // step resolution between generated points
}

function render(){
    cycloid = [];   // refresh list for new cycloid

    fullCircle = 2*Math.PI;     // generate cycloid for full cycle 0 to 2pi

    // creates outline of cycloid in steps of theta
    for(var t = 0; t < fullCircle; t += cy.theta){

        x = cy.scale*(cy.lobes+1)*Math.cos(t)-cy.scale*Math.cos((cy.lobes+1)*(t))+cy.x
        y = cy.scale*(cy.lobes+1)*Math.sin(t)-cy.scale*Math.sin((cy.lobes+1)*(t))+cy.y

        cycloid.push(x, y);  // add to cycloid array
    }
    draw(); // draw svg
};

function draw(){
    clear();    // clears svg before drawing new one
    drawSVG = SVG().addTo('#cycloidGear').size(5000, 5000); // svg container
    polyline = drawSVG.polyline(cycloid);   // trace cycloid from array
    polyline.fill('red');   // color cycloid
    polyline.stroke({ color: 'black', width: 10, linecap: 'round', linejoin: 'round'}); // add stroke to make cycloidal gear
    polyline.svg(); 
    // polyline.animate().rotate(360/cy.lobes).loop();
}

// checks if svg exists and deletes if it does
function clear() {
    var svgCanvas = document.getElementById('cycloidGear').childNodes;
    if(svgCanvas.length > 0){
        document.getElementById('cycloidGear').removeChild(document.getElementById('cycloidGear').childNodes[0]);
    }
}

// dowloading svg
function downloadSVG(e){
  let svg = document.getElementById("cycloidGear");
  let serializer = new XMLSerializer();
  let fileBlobSVG = new Blob([serializer.serializeToString(svg)],
                            {'type': "image/svg+xml"});
  e.target.download = (new Date()).toLocaleTimeString() + ".svg";
  e.target.href = URL.createObjectURL(fileBlobSVG);
}
