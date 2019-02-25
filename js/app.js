var Calculadora = (function(){
    "use strict";
    console.log('numeroAnterior','operacionAnterior','numeroActual');
    //declaracion e inicializacion de variables globales
    var numeroTexto = "0";
    var numeroActual = 0;
    var numeroAnterior = 0;
    var operacionAnterior = "mas";
    var teclaAnterior = "";

    //funcion llamada al hacer click
    var teclaPresionada = function(ev){
        if(ev.target.classList.contains("tecla")){
            achicarTecla(ev);
            procesarDatos(ev.target.id); 
            console.log("---------",numeroAnterior,"---------",operacionAnterior,"---------",numeroActual,"---------");   
        }
    }
    //funcion para procesar los datos
    var procesarDatos = function(teclaPresionada){
        switch (teclaPresionada) {
            case 'on':
            //en caso de aplastar ON se resetea la calculadora
                encerarCalculadora();
                presentarEnDisplay(0);
                break;
            case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
            //en caso de aplastar UN NUMERO se va generando el numero completo actual
                generarNumeroActual(teclaPresionada);
                break;
            case 'punto':
                var numeroProvisional = String(numeroActual); 
                var salir = false;               
                for (let ii = 0; ii < numeroProvisional.length; ii++) {
                    if (numeroProvisional[ii] == '.'){
                        salir = true;
                    }
                }
                if (salir == false){
                    generarNumeroActual('.');
                }
                break;
            case 'sign':
                if (teclaAnterior == 'mas' ||teclaAnterior == 'menos' ||teclaAnterior == 'por' ||teclaAnterior == 'dividido' || teclaAnterior == 'igual'){
                    //numeroAnterior = (comprobarLargo(-numeroAnterior));
                    //presentarEnDisplay(numeroAnterior);
                } else{
                    numeroActual = (comprobarLargo(-numeroActual));
                    presentarEnDisplay(numeroActual);
                }
                break
            case 'mas':case 'menos':case 'por':case 'dividido':
            //en caso de aplastar MAS MENOS POR o DIVIDIDO se procesa la operacion anterior
            //luego se guarda el numeroActual en numeroAnterior y la funcion matematica MAS o -*/ para la siguiente operacion; y vacio el texto para el siguiente ingreso de numeros
            //el if sirve paa que no pase nada cuando aplastamos operaciones varias veces
                if (teclaAnterior != teclaPresionada){
                    if(teclaAnterior == 'igual'){
                        numeroTexto = '0';
                        operacionAnterior = teclaPresionada;
                    } else if (teclaAnterior == 'sign'){
                        numeroTexto = "0";
                        numeroAnterior = numeroActual;
                        operacionAnterior = teclaPresionada;
                    } else if(teclaAnterior != 'mas'&&teclaAnterior != 'menos'&&teclaAnterior != 'por'&&teclaAnterior != 'dividido'){
                        //opero
                        numeroActual = operar(operacionAnterior,numeroAnterior,numeroActual);                                 
                        //seteo para la proxima
                        numeroTexto = "0";
                        numeroAnterior = numeroActual;
                        operacionAnterior = teclaPresionada;
                        //presento
                        //presentarEnDisplay(numeroActual); // no presento porque asi dice la instruccion 
                    }  else{
                        //si es +-*/ seteo para el proximo texto y la operacion
                        operacionAnterior = teclaPresionada;
                    }                   
                }
                numeroActual = comprobarLargo(numeroActual);
                presentarEnDisplay("");
                break;
            case 'igual':
            //en caso de aplastar IGUAL proceso la operacion anterior
            //en caso de ser la primera vez: grabo el actual en un provisional, opero y luego paso el provisional al anterior
            //de esta forma en las siguientes veces solo opero y anterior siempre va a ser el que quiero
                numeroAnterior = operar(operacionAnterior,numeroAnterior,numeroActual);
                numeroAnterior = comprobarLargo(numeroAnterior);
                presentarEnDisplay(numeroAnterior);
            break;
            default:
                break;
        }
        teclaAnterior = teclaPresionada;
    }
    var comprobarLargo = function(numero){
        if(String(numero).length >8){
            if(numero>99999999 || numero<-9999999){
                presentarEnDisplay('NumTooBIG');
                encerarCalculadora();
            }
            else{
                numero = Number(String(numero).substr(0,8));
                return numero;
            }
        }
        else{
            return numero;
        }
    }
    //funcion para reestablecer los valores iniciales de las variables
    var encerarCalculadora = function(){
        numeroTexto = "0";
        numeroActual = 0;
        numeroAnterior = 0;
        operacionAnterior = "mas";
    }
    //funcion para recojer cada numero presionado y generar numero actual
    var generarNumeroActual = function(teclaPresionada){
        if (numeroTexto.length < 8){
            if(numeroTexto == "0"){numeroTexto = teclaPresionada}
            else{numeroTexto += teclaPresionada;}
            numeroActual = Number(numeroTexto);
            presentarEnDisplay(numeroActual);
        }
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
    document.addEventListener("mousedown",teclaPresionada)
})();