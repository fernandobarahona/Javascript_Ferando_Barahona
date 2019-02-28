var Calculadora = (function(){
    "use strict";
    //declaracion e inicializacion de VARIABLES GLOBALES
    var numeroTexto = '0';
    var numeroActual = 0;
    var numeroAnterior = 0;
    var operacionAnterior = "mas";
    var teclaAnterior = "";
    var auxiliarSigno = false;
    var auxiliarIgual = '0';
    var numTooBig = false;

    //presento los titulos en consola para la revision 
    console.log('teclPres',"----",'numAnter',"----",'opAnter',"----",'numAct',"---------",'numeroTexto');   

    //declaracion de TODAS LAS FUNCIONES

    //funcion llamada al hacer click
    var funcionTeclaPresionada = function(ev){
        if(ev.target.classList.contains("tecla")){
            achicarTecla(ev);
            procesarDatos(ev.target.id);
            //presento los datos necesarios para revisar en consola para cualquier cambio 
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
        }
        {/*
            Ver la exlicacion de auxiliarSigno en la funcion cambiarSigno().
            Aca lo reseteo cuando aplasto otra tecla.
        */}
        if (teclaPresionada != 'sign'){
            auxiliarSigno = false;
        }
        teclaAnterior = teclaPresionada;
    }
    //funcion para procesar cuando aplasto =
    var procesarTeclaIgual = function(){
        {/*
            Proceso con la operacion anterior el numAnterior y el numActual.
                Cuando aplaste igual antes, proceso por con mismo numeroActual de antes, 
                por esto necesito auxiliarIgual, que no se cambia cuando se aplasta la segunda vez igual.
            De ahi siempre se comprueba el largo, se configura numeroTexto se pasa el numActual al numAnterior
                y se presenta en el display. Pero si el numero fue muy grande al comprobar, encero la calcu
                presento una alerta y reseteo la bantera numTooBig. (ver comprobar largo)
        */}
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
    //funcion para procesar cuando aplasto +-*/ 
    var procesarTeclaOperacion = function(teclaPresionada){
        {/*
            Siempre pongo el numTexto = '' para presentarlo y resetear la entrada del numero siguiente;
                guardo la operacion que voy a hacer luego que es igual a teclaPresionada
                Y compruebo si la alerta NumTooBig esta activa, en cuyo caso reseteo (ver comprobarLargo()).
            Si aplaste igual y luego aplasto una operacion, no pasa nada mas que eso (tengo que ponerle porque el otro if 
                es un if de != a otros y 'igual' tambien es diferente)
            Si aplaste signo es como estar recien tipeado un numero entonces no proceso pero si grabo numAct en NumAnter
            Y si recien esta tipeado un numero opero y compruebo y luego grabo numAct en NumAnter
        */}
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
    //funcion para comprobar el largo
    var comprobarLargo = function(numero){
        {/*
            Compruebo si la longitud es mayor. Si si: 
            Si el valor absoluto es mayor que 99999999 osea ya no se puede presentar en la pantalla activo la bandera numTooBig
                que uso en procesarIgua y procesarTeclaOperacion.
            Si solo es por los decimales entonces solo dejo 8 caracteres.
        */}
        if(String(numero).length >8){
            if(numero>99999999 || numero<-99999999){
                numTooBig = true;
            }
            else{
                numeroActual = Number(String(numero).substr(0,8));
            }
        }
    }
    //funcion para cambiar el signo. 
    var cambiarSigno = function(){
        {/*
            No se pone signo cuando aplasto +-, esto lo hago con if (teclaAnterior = '+') etc, 
                pero si vuelvo a aplastar signo tampoco tengo que poner. Entonces uso auxiliarSigno, 
                el cual se resetea arriba, al principio del codigo.
            Para poner el signo verifico si tiene signo para quitar el signo de numeroTexto. Tambien verifico si es cero para que el 
                cero no tenga signo. 
            Y cambiar el signo de NumAct es facil, solo igual a - y presento de una vez. 
        */}
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
        {/*
            Compruebo si es 0 el numero porque no puedo pasar . a generar numero porque . no es un numero.
            Compruebo si el numero ya tiene punto y no hago nada. 
            Sino genero el numero actual y de paso ya lo presento con el punto.
        */}
        if(numeroTexto == '0'|| numeroTexto == ''){
            numeroActual = 0.0;
            numeroTexto = '0.'
            presentarEnDisplay(numeroTexto);
        }
        else if(String(numeroActual).includes('.')){}
        else{
            generarNumeroActual('.');
            presentarEnDisplay(String(numeroActual)+'.');
        }
    }
    //funcion para recojer cada numero presionado y generar numero actual
    var generarNumeroActual = function(teclaPresionada){
        {/*
            Solo genero si tiene menos de 9 caracteres. 
            Si es 0 o -0, el numero es igual a la tecla presionada.
            Caso contrario anado el caracter al numero y lo vuelvo a transformar a tipo Number
        */}
        if (numeroTexto.length < 8){
            if(numeroTexto == "0"||numeroTexto == "-0"){numeroTexto = teclaPresionada}
            else{numeroTexto += teclaPresionada;}
            numeroActual = Number(numeroTexto);
        }
    }
    //funcion para reestablecer los valores iniciales de las variables
    var encerarCalculadora = function(){
        {/*
            Pongo todos los valores de las variables globales a sus valores iniciales
                y reseteo la consola y le pongo los titulos de la consola. 
        */}
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
        {/*
            Le achico y anado un listener de quitar el mouse.
            Luego en agrandar (que pasa cuando quito el mouse)
                quito el listener para ahorrar recursos del sistema 
        */}
    var achicarTecla = function(ev){
        ev.target.style.transform = "scale(.9,.9)";
        document.addEventListener("mouseup", agrandarTecla);
    }
    var agrandarTecla = function(ev){
        ev.target.style.transform = "scale(1,1)";
        document.removeEventListener("mouseup", agrandarTecla);
    }

    //listener que escucha que se presiono una tecla
    {/* 
        Como es una funcion autollamada se ejecuta de una. 
        Y esta la unica linea de codigo que no es una declaracion de variable o funcion, 
            esta activa a las demas funciones y utiliza las variables
    */}
    document.addEventListener("mousedown",funcionTeclaPresionada)
})();