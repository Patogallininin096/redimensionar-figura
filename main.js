function setup(){
  video = createCapture(VIDEO);
  video.size(550, 500);
  canvas = createCanvas(550, 420);
  canvas.position(560, 110)
  reconocimiento = ml5.poseNet(video, modelo_listo);
  reconocimiento.on("pose", mostrar_resultado);
}
function modeloListo(){
  console.log("modelo listo");
}
var narizX = 0;
var narizY = 0;
var wrist_izq_X = 0;
var wrist_der_X = 0;
var distancia = 0;

function mostrar_resultado(resultados){
  if(resultados.leght > 0){
    narizX = resultados[0].pose.nose.x;
    narizY = resultados[0].pose.nose.y;
    wrist_der_X = resultados[0].pose.rightWrist.x;
    wrist_izq_X = resultados[0].pose.leftWrist.x;
    distancia = Math.round(wrist_izq_X - wrist_der_X);
  }
}
function draw(){
   document.getElementById("square_side").innerHTML = "El cuadro mide" + distancia + "px de lado";
   fill("lime");
   stroke("blue");
   background("white");
   square(narizX, narizY, distancia);
   box(distancia);
}