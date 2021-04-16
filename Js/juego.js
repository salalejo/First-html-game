//VARIABLES DEL CANVAS Y CONTEXTO
var canvas;
var ctx;
var textoEstadoJuego;
textoEstadoJuego = document.getElementById('estado-juego');
//VARIABLE DE LOS FRAMES PER SECOND
var FPS = 50;

//VARIABLEs DE LA IMAGENES 
var imgDino;
var imgLlave;
var imgPuerta;
var tileMap;
var imgFantasma;

//VARIABLES DEL ANCHO Y ALTO DE LA CASILLA DEL TABLERO
var anchoFichaTablero = 50;
var altoFichaTablero = 50;

var enemigos = [];

//ARRAY DE LAS FICHAS DEL TABLERO
var escenario = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 0, 0, 0, 0, 1, 0],
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
            var tile = escenario[y][x];
            if(escenario[y][x]==0){
                ctx.drawImage(tileMap,5*35,2*34,30,30,50*x,50*y,50,50);
            }
                
            if(escenario[y][x]==1){
                ctx.drawImage(tileMap,8*34.2,0,30,30,50*x,50*y,50,50);
            }
                
            if(escenario[y][x]==2){
                ctx.drawImage(tileMap,3*36,35,30,30,50*x,50*y,50,50);;
            }
               
        //     ctx.fillStyle = color;
        //     ctx.fillRect(x*anchoFichaTablero, y*altoFichaTablero, anchoFichaTablero, altoFichaTablero);
            
            // }
            
        }
    }
    
    

}

function verificarObjeto(x, y){
    
    if(x == (4) && y == (3)){
        textoEstadoJuego.innerHTML = 'Tienes la llave';
        
        protaDino.tieneLlave = true;
        imgLlave.src= '';
    }
    if(x == (8) && y == (1)){
        if(protaDino.tieneLlave == true){
            console.log('GANASTE');
            imgLlave.src = 'images/Llave.png';
            protaDino.tieneLlave = false;
            protaDino.x = 1;
            protaDino.y = 1;
            textoEstadoJuego.innerHTML = '¡Ganaste! \n Intentalo Nuevamente';
        }else{
            console.log('Te falta la llave');
            textoEstadoJuego.innerHTML = 'Te falta la llave :(';
        }
    }

    
}

//CUANDO COLISIONA EL PROTAGONISTA CON UN ENEMIGO
function perder(){
    if(protaDino.x == enemigos[0].x && protaDino.y == enemigos[0].y){
        imgLlave.src = 'images/Llave.png';
        protaDino.tieneLlave = false;
        protaDino.x = 1;
        protaDino.y = 1;
        textoEstadoJuego.innerHTML = "Perdiste, inténtalo nuevamente :("
    }
}

//MODELO PROTAGONISTA
var protagonista = function(){
    this.x = 1;
    this.y = 1;
    this.velocidad = 10;
    this.tieneLlave = false;
    //DIBUJA EL DINO
    this.dibuja = function(){
        ctx.drawImage(imgPuerta, 8*50, 1*50, 50, 50);
        ctx.drawImage(imgDino, this.x*anchoFichaTablero, this.y*altoFichaTablero, 50, 50);
        ctx.drawImage(imgLlave, 4*50, 3*50);
        
    }


    this.arriba = function(){
        if(escenario[this.y-1][this.x] == 2 || escenario[this.y-1][this.x] == 1){
            this.y --;
            
        }
        verificarObjeto(this.x, this.y);   
    }

    this.abajo = function(){
        if(escenario[this.y+1][this.x] == 2 || escenario[this.y+1][this.x] == 1){
            this.y ++;
        }
        verificarObjeto(this.x, this.y);
    }

    this.derecha = function(){
        if(escenario[this.y][this.x+1] == 2 || escenario[this.y][this.x+1] == 1){
            this.x ++;
        }
        verificarObjeto(this.x, this.y);
    }

    this.izquierda = function(){
        if(escenario[this.y][this.x-1] == 2 || escenario[this.y][this.x-1] == 1){
            this.x --;
        }
        verificarObjeto(this.x, this.y);
    }
    

}

//MODELO DEL ENEMIGO
var enemigo = function(x,y,velocidad,direccion){
    
    this.x = x;
    this.y = y;
    this.direccion = direccion;
    this.derecha = true;
    this.izquierda = false;
    this.arriba = true;
    this.abajo= false;
    this.retraso = velocidad;
    this.contadorRetraso = 0;

    console.log('enemigo creado');
    this.dibuja = function(){
        ctx.drawImage(imgFantasma, this.x*anchoFichaTablero, this.y*altoFichaTablero, 50, 50);
        
    }
    
    this.mueve = function(){
        if(this.contadorRetraso < this.retraso){
            this.contadorRetraso++;
        }else{
            //mueve derecha
            if(escenario[this.y][this.x+1] == 2 && this.derecha == true && this.direccion == 'horizontal'){
                this.x++;
                this.contadorRetraso = 0;
            }else{
                this.izquierda = true;
                this.derecha = false;
            }
            
            //mueve izquierda
            if(escenario[this.y][this.x-1] == 2 && this.izquierda ==true && this.direccion == 'horizontal'){
                this.x--;
                this.contadorRetraso = 0;
            }else{
                this.derecha = true;
                this.izquierda = false;
            }

            //mueve arriba
            if(escenario[this.y-1][this.x] == 2 && this.arriba == true && this.direccion == 'vertical'){
                this.y--;
                this.contadorRetraso = 0;
            }else{
                this.abajo = true;
                this.arriba = false;
            }

            //mueve abajo
            if(escenario[this.y+1][this.x] == 2 && this.abajo == true && this.direccion == 'vertical'){
                this.y++;
                this.contadorRetraso = 0;
            }else{
                this.abajo = false;
                this.arriba = true;
            }
        }
        

        
        
    }
    
    
}


//BORRAR EL CANVAS CADA FRAME
function borrarCanvas(){
    canvas.width = '500';
    canvas.height = '400';
}

//CREACION DE OBJETOS PROTAGONISTA Y ENEMIGOS
var protaDino = new protagonista();
enemigos.push(new enemigo(1,5,25,'horizontal'));
enemigos.push(new enemigo(6,6,60,'vertical'));


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
    imgDino.src = 'images/New-Piskel.png';
    tileMap = new Image();
    tileMap.src = 'images/tilemap.png';
    
    //CARGAMOS IMAGEN LLAVE YPUERTA
    imgLlave = new Image();
    imgPuerta = new Image();;
    imgLlave.src = 'images/Llave.png';
    // imgPuerta.src = 'images/Puerta.png';

    //CARGAMOS IMAGEN ENEMIGO
    imgFantasma = new Image();
    imgFantasma.src = 'images/enemigofantasma.png'
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
    for(i=0;i<enemigos.length;i++){
        enemigos[i].dibuja();
        enemigos[i].mueve();
        perder();
    }
    
    
}

