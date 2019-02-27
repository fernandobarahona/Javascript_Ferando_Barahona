var Calculadora = (function(){
    "use strict";
    //declaracion e inicializacion de variables globales
    var numeroTexto = '0';
    var numeroActual = 0;
    var numeroAnterior = 0;
    var operacionAnterior = "mas";
    var teclaAnterior = "";
    var auxiliarSigno = false;
    var auxiliarIgual = '0';
    var numTooBig = false;

    console.log('teclPres',"----",'numAnter',"----",'opAnter',"----",'numAct',"---------",'numeroTexto');   


    //funcion llamada al hacer click
    var funcionTeclaPresionada = function(ev){
        if(ev.target.classList.contains("tecla")){
            achicarTecla(ev);
            procesarDatos(ev.target.id); 
            console.log("-----",ev.target.id,"---------",numeroAnterior,"---------",operacionAnterior,"---------",numeroActual,"----------",numeroTexto);   
        }
    }
    //funcion para procesar los datos
    var procesarDatos = function(teclaPresionada){
        switch (teclaPresionada) {
            case 'on':
                encerarCalculadora();
                presentarEnDisplay(0);
                break;
            case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
                generarNumeroActual(teclaPresionada);
                presentarEnDisplay(numeroActual);
                break;
            case 'punto':
                anadirPunto();
                break;
            case 'sign':
                cambiarSigno();
                break
            case 'mas':case 'menos':case 'por':case 'dividido':
                procesarTeclaOperacion(teclaPresionada);
                break;
            case 'igual':
                procesarTeclaIgual();
            break;
            default:
                break;
        }
        if (teclaPresionada != 'sign'){
            auxiliarSigno = false;
        }
        teclaAnterior = teclaPresionada;
    }
    var procesarTeclaIgual = function(){
        if(teclaAnterior == 'igual'){
            numeroActual = operar(operacionAnterior,numeroAnterior,auxiliarIgual);
        }
        else{
            auxiliarIgual = numeroActual;
            numeroActual = operar(operacionAnterior,numeroAnterior,numeroActual);
        }
        comprobarLargo(numeroActual);
        numeroTexto = String(numeroActual);
        numeroAnterior = numeroActual;
        presentarEnDisplay(numeroTexto);
        if (numTooBig){
            encerarCalculadora();
            presentarEnDisplay('NumTooBIG');
            numTooBig = false;
        }
    }
    var procesarTeclaOperacion = function(teclaPresionada){
        if(teclaAnterior == 'igual'){
        }
        else if (teclaAnterior == 'sign'){
            numeroAnterior = numeroActual;
        }
        else if(teclaAnterior != 'mas'&&teclaAnterior != 'menos'&&teclaAnterior != 'por'&&teclaAnterior != 'dividido'){
            numeroActual = operar(operacionAnterior,numeroAnterior,numeroActual);
            comprobarLargo(numeroActual);
            numeroAnterior = numeroActual;
        }
        numeroTexto = '';
        presentarEnDisplay(numeroTexto);
        operacionAnterior = teclaPresionada;
        if (numTooBig){
            encerarCalculadora();
            presentarEnDisplay('NumTooBIG');
            numTooBig = false;
        }
    }
    var comprobarLargo = function(numero){
        if(String(numero).length >8){
            if(numero>99999999 || numero<-99999999){
                numTooBig = true;
            }
            else{
                numeroActual = Number(String(numero).substr(0,8));
            }
        }
    }
    var cambiarSigno = function(){
        if (teclaAnterior == 'mas' ||teclaAnterior == 'menos' ||teclaAnterior == 'por' ||teclaAnterior == 'dividido' ||auxiliarSigno == true){
            auxiliarSigno = true;
            numeroTexto = '';
        } 
        else{
            if(numeroTexto.includes('-')){numeroTexto = numeroTexto.substr(1);}
            else{if(numeroTexto == '0'){numeroTexto = '0'}
                else {numeroTexto = '-' + numeroTexto}}
            numeroActual = -numeroActual;
            presentarEnDisplay(numeroTexto);
        }
    }
    //funcion para comprobar si ya hay un punto y si no lo hay anadir un punto en el numero
    var anadirPunto = function(){
        if(String(numeroActual).includes('.')){}
        else{
            generarNumeroActual('.');
            presentarEnDisplay(String(numeroActual)+'.');
        }
    }
    //funcion para recojer cada numero presionado y generar numero actual
    var generarNumeroActual = function(teclaPresionada){
        if (numeroTexto.length < 8){
            if(numeroTexto == "0"||numeroTexto == "-0"){numeroTexto = teclaPresionada}
            else{numeroTexto += teclaPresionada;}
            numeroActual = Number(numeroTexto);
        }
    }
    //funcion para reestablecer los valores iniciales de las variables
    var encerarCalculadora = function(){
        numeroActual = 0;
        numeroTexto = '0';
        numeroAnterior = 0;
        operacionAnterior = "mas";
        console.clear();
        console.log('teclPres',"----",'numAnter',"----",'opAnter',"----",'numAct',"---------",'numeroTexto');   
    }
    //funciones de las operaciones matematicas
    var operar = function(operacion,a,b){
        switch (operacion) {
            case 'mas':       return sumar(a,b);
            case 'menos':     return restar(a,b);
            case 'por':       return multiplicar(a,b);
            case 'dividido':  return dividir(a,b);
            default:
                break;
        }
    }
    var sumar = function(a,b){
        return a+b;
    }
    var restar = function(a,b){
        return a-b;
    }
    var multiplicar = function(a,b){
        return a*b;
    }
    var dividir = function(a,b){
        return a/b;
    }
    //funcion para mostrar en el display 
    var presentarEnDisplay = function(valorAPresentar){
        document.querySelector("#display").innerHTML = valorAPresentar;
    }

    //funciones para animar las Teclas
    var achicarTecla = function(ev){
        ev.target.style.transform = "scale(.9,.9)";
        document.addEventListener("mouseup", agrandarTecla);
    }
    var agrandarTecla = function(ev){
        ev.target.style.transform = "scale(1,1)";
        document.removeEventListener("mouseup", agrandarTecla);
    }
    //listener que escucha que se presiono una tecla
    document.addEventListener("mousedown",funcionTeclaPresionada)
})();