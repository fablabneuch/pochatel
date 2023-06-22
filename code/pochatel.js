var makerjs = require('makerjs');

function phoneCase(thinkness, width, height, Font) {
 var radius = 3;
 var DistHolesToBorder = 3;
 var DistHolesToTop = 30;
 var HolesDiameter = 3.5;
 var totalwidth = width+thinkness+2*(DistHolesToBorder+HolesDiameter);
 var closingHeight = height-40;
 var numberOfHoles = 7;

 //Outline
 var faceA = new makerjs.models.RoundRectangle(totalwidth,height,radius);
 var faceB = makerjs.cloneObject(faceA);
 faceB = makerjs.model.move(faceB, [0, height+thinkness]);
 var bottom = new makerjs.models.Rectangle(width,thinkness);
 bottom = makerjs.model.move(bottom, [(totalwidth-width)/2, height]);
 var closure = new makerjs.models.RoundRectangle(width+thinkness,closingHeight+radius,radius);
 closure = makerjs.model.move(closure, [DistHolesToBorder+HolesDiameter, 2*height+thinkness-radius]);
 var outline = makerjs.model.combineUnion(faceA,faceB);
 outline = makerjs.model.combineUnion(outline,bottom);
 outline = makerjs.model.combineUnion(outline,closure);
 outline.layer = "green";

 //holes
 var circle = {paths: {
                    circle: new makerjs.paths.Circle([0,0], HolesDiameter/2)
                  }
             };
 var line_of_round1 = makerjs.layout.cloneToColumn(circle, numberOfHoles, ((height-DistHolesToTop-DistHolesToBorder-HolesDiameter)/(numberOfHoles-1))-HolesDiameter);
 line_of_round1 = makerjs.model.move(line_of_round1, [DistHolesToBorder+HolesDiameter/2,DistHolesToTop+HolesDiameter/2]);

 var line_of_round2 = makerjs.cloneObject(line_of_round1);
 line_of_round2 = makerjs.model.move(line_of_round2, [totalwidth-DistHolesToBorder-HolesDiameter/2,DistHolesToTop+HolesDiameter/2]);

 var FaceAHoles = {
  models: {
    line1: line_of_round1,
    line2: line_of_round2
  }
 };

 var FaceBHoles = makerjs.cloneObject(FaceAHoles);
 FaceBHoles = makerjs.model.move(FaceBHoles, [0,height+thinkness-DistHolesToTop+DistHolesToBorder]);

 var SocketHoles = new makerjs.models.RoundRectangle(39,18,radius);
 SocketHoles = makerjs.model.move(SocketHoles,[(totalwidth-39)/2,2*height+thinkness+closingHeight-18-18]);

 var holes = {
  models: {
    Face1: FaceAHoles,
    Face2: FaceBHoles,
    Socket: SocketHoles
  }
 };
 holes.layer = "blue";

 //folding marks
 var line1 = {
  type: 'line',
  origin: [(totalwidth-width)/2, height],
  end: [((totalwidth-width)/2)+width, height]
 };

 var line2 = {
  type: 'line',
  origin: [(totalwidth-width)/2, height+thinkness],
  end: [((totalwidth-width)/2)+width, height+thinkness]
 };

 var lines_group = [ line1, line2 ];
 var lines = { paths: lines_group };
 lines.layer = "red";

 //Engraving area
 var zone1 = new makerjs.models.Rectangle(width-10,closingHeight-2*18-10);
 zone1 = makerjs.model.move(zone1,[(totalwidth-(width-10))/2,10]);

 var zone2 = new makerjs.models.Rectangle(width-10,height-closingHeight-5);
 zone2 = makerjs.model.move(zone2,[(totalwidth-(width-10))/2,closingHeight]);

 var zone3 = new makerjs.models.Rectangle(width-10,height-10);
 zone3 = makerjs.model.move(zone3,[(totalwidth-(width-10))/2,height+thinkness+5]);

 var zone4 = new makerjs.models.Rectangle(width-10,closingHeight-2*18-5-3);
 zone4 = makerjs.model.move(zone4,[(totalwidth-(width-10))/2,2*height+thinkness+5]);

 var EngravingArea = {
  models: {
    Zone1: zone1,
    Zone2: zone2,
    Zone3: zone3,
    Zone4: zone4
  }
 };

 EngravingArea.layer = "yellow";


 //Elastic length
 var ElasticLenght = (((height-DistHolesToTop-DistHolesToBorder)*2)+width+thinkness)*1.3;

 //EXPORT
 this.models = {
   outline: outline,
   holes: holes,
   lines: lines,
   EngravingArea: EngravingArea
 };

 this.units = makerjs.unitType.Millimeter;
 this.notes = '# Bienvenue \n Tu peux modifier les paramètres en fonction des dimensions de ton smartphone \n # Longueur de ton élastique \n Longueur: '+ElasticLenght+' mm';
 //press enter here to add more blank lines
}

phoneCase.metaParameters = [
    { title: "Epaisseur", type: "range", min: 2, max: 20, step: 0.5, value: 10 },
    { title: "Largeur", type: "range", min: 50, max: 120, step: 1, value: 74 },
    { title: "Hauteur", type: "range", min: 70, max: 200, step: 1, value: 154 }
];

module.exports = phoneCase;
