

function setup(){

    canvas=createCanvas(400, 350);
    canvas.center();

    //Cargamos la cámara al arranque
    camara= createCapture(VIDEO);
    camara.size(400,350);
    camara.hide();

    detector=ml5.objectDetector('cocossd', modelocargado);
    document.getElementById("estatus").innerHTML= "Estatus : Detectando objetos ";
}

estatus="";
objetos=[];

function modelocargado(){
    console.log('Cocossd se ha cargado exitosamente');
    estatus=true;

}



function draw(){
  
    //Ajustamos el tamaño de la cámara al tamaño del lienzo
    image(camara, 0, 0, 400, 350);

               if(estatus != ""){
                            
                //colores rgb , se declaran aqui para que el cambio sea random
                rojos= Math.floor(Math.random() * 255) + 1;
                verdes= Math.floor(Math.random() * 255) + 1;
                azules= Math.floor(Math.random() * 255) + 1;

                //En lugar de detectar la imagen, detecta la cámara
                 detector.detect(camara, gotResult);
         

               for(i=0; i< objetos.length; i++){
      
            document.getElementById("estatus").innerHTML= "Estatus : Objetos detectados ";
            //Establecemos la etiqueta para que lea el valor del tamaño de la matriz
            document.getElementById("cantidad").innerHTML= "Objetos detectados : " + objetos.length;

            //Ponemos el random de colores en fill
            fill(rojos, verdes, azules);
            precision=floor(objetos[i].confidence * 100);

            text(objetos[i].label + precision + "%", objetos[i].x -5, objetos[i].y -5);
            noFill();

            //Ponemos en random de colores en stroke
            stroke(rojos, verdes, azules);
            
            rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height);
        }
       }
    }



function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
           objetos=results;
    }
}


