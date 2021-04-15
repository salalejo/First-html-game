//VARIABLES DEL CANVAS Y CONTEXTO
var canvas;
var ctx;

//VARIABLE DE LOS FRAMES PER SECOND
var FPS = 50;

//VARIABLE DE LA IMAGEN DEL PROTAGONISTA
var imgDino;

//VARIABLES DEL ANCHO Y ALTO DE LA CASILLA DEL TABLERO
var anchoFichaTablero = 50;
var altoFichaTablero = 50;

//ARRAY DE LAS FICHAS DEL TABLERO
var escenario = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 2, 0, 2, 0, 0, 2, 2, 0],
    [0, 0, 2, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//VARIABLES DE LOS COLORES SEGUN EL TIPO DE LAS FICHAS DEL TABLERO
var fichaCesped = '#12d600';
var fichaAgua = '#0043fc';
var fichaTierra = '#c9813a';

//DIBUJA EL ESCENARIO DE JUEGO
function dibujaEscenario(){
    var color;
    for(y=0;y<8;y++){
        for(x=0;x<10;x++){
            if(escenario[y][x]==0){
                color = fichaCesped;
            }
                
            if(escenario[y][x]==1){
                color = fichaAgua;
            }
                
            if(escenario[y][x]==2){
                color = fichaTierra;
            }
               
            ctx.fillStyle = color;
            ctx.fillRect(x*anchoFichaTablero, y*altoFichaTablero, anchoFichaTablero, altoFichaTablero);

        }
    }
}

//MODELO DINO
var protagonista = function(){
    this.x = 1;
    this.y = 1;
    this.velocidad = 10;

    //DIBUJA EL DINO
    this.dibuja = function(){
        // ctx.drawImage(imgDino, this.x, this.y, 50, 50);
        // ctx.font = '20px impact';
        // ctx.fillStyle = '#555555';
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x*anchoFichaTablero, this.y*altoFichaTablero, 50, 50);
        ctx.fillText('X: ' + this.x + 'Y :' + this.y, 50, 50);
    }

    this.arriba = function(){
        if(escenario[this.y-1][this.x] == 2){
            this.y --;
        }
            
    }

    this.abajo = function(){
        if(escenario[this.y+1][this.x] == 2){
            this.y ++;
        }
    }

    this.derecha = function(){
        if(escenario[this.y][this.x+1] == 2){
            this.x ++;
        }
    }

    this.izquierda = function(){
        if(escenario[this.y][this.x-1] == 2){
            this.x --;
        }
    }
    

}

// //MODELO PERSONAJE
// var personaje = function(x,y){
//     this.x = x;
//     this.y = y;
//     this.derecha = true;

//     //FUNCION QUE DIBUJA LOS RECTANGULOS
//     this.dibuja = function(){
//         ctx.fillStyle = '#FF0000';
//         ctx.fillRect(this.x, this.y, 50, 50);
//     }

//     //FUNCION QUE MUEVE LOS RECTANGULOS DE IZQ A DER
//     this.mueve = function(velocidad){
//         if(this.derecha == true){
//             if(this.x < 450){
//                 this.x += velocidad;
//             }else{
//                 this.derecha = false;
//             }    
//         }else{
//             if(this.x>0){
//                 this.x -= velocidad;
//             }else{
//                 this.derecha = true;
//             }
//         }
        
//     }
// }

//BORRAR EL CANVAS CADA FRAME
function borrarCanvas(){
    canvas.width = '500';
    canvas.height = '400';
}

//CREACION DE PERSONAJES
// var p1 = new personaje(10,100);
// var p2 = new personaje(10,200);
// var p3 = new personaje(10,350);
var protaDino = new protagonista();

//EVENTO DE PRESIONAR LAS TECLAS DE MOVIMIENTO PARA MOVER EL PROTAGONISTA
document.addEventListener('keydown', function(tecla){
    //TECLA ARRIBA
    if(tecla.keyCode == 38){
        protaDino.arriba();
    } 

    //TECLA ABAJO
    if(tecla.keyCode == 40){
        protaDino.abajo();
    } 

    //TECLA DERECHA
    if(tecla.keyCode == 39){
        protaDino.derecha();
    } 

    //TECLA IZQUIERDA
    if(tecla.keyCode == 37){
        protaDino.izquierda();
    } 
})


//FUNCION QUE SE CARGA AL CARGAR LA PÁGINA, ESTABLEZCO EL CONTEXTO DEL CANVAS Y LO OBTENGO POR SU ID, ADEMÁS DE ESTABLECER LOS FPS O TASA DE REFRESCO
function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //CARGAMOS LA IMAGEN DEL DINOSAURIO
    imgDino = new Image();
    imgDino.src = 'images/dino.png';
    dibujaEscenario();

    setInterval(function(){
        principal();
    },1000/FPS);
}


//FUNCION MAIN
function principal(){
    borrarCanvas();//ES LO PRIMERO QUE HACE EL BUCLE EN CADA FRAME
    dibujaEscenario();
   
    protaDino.dibuja();
    
}

