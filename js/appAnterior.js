var Calculadora = ( function(){
    
    // DECLARACION Y INICIALIZACION DE VARIABLES GLOBALES
    var numeroTexto = "0"; 
    var numeroActual = 0;
    var numeroGuardado = 0;
    var operacionAnterior = "mas";
    var operacionAnteriorAux = "";
    var teclaAnterior = "";

    //LA FUNCION QUE SE LLAMA DESDE EL LISTENER
    teclaPresionada = function(ev){
        if (ev.target.classList.contains("tecla")){
            achicarTecla(ev);
            procesarTeclas(ev.target.id);
        }
    }
    //LOS PROCESOS DE LA CALCULADORA
    procesarTeclas = function(tecla){

        // SI APLASTO ON
        if(tecla == 'on'){numeroTexto = '0', numeroActual = 0;numeroGuardado = 0; document.querySelector('#display').innerHTML = 0; operacionAnterior = "mas", teclaAnterior = ""}

        // SI APLASTO UN NUMERO
        else if(tecla == 0 || tecla == 1||tecla == 2 || tecla == 3||tecla == 4 || tecla == 5||tecla == 6 || tecla == 7||tecla == 8 || tecla == 9 || tecla == 'punto'){
            if(tecla == 'punto'){tecla = '.';}
            if(numeroTexto.length < 8){
                if (numeroTexto.length == 0 && tecla == 0){numeroTexto = '0';}
                else { if (numeroTexto == '0'){if(tecla == '.'){numeroTexto = '0'+tecla} else{numeroTexto = tecla;}}
                    else{numeroTexto = numeroTexto + tecla;}}  
            }
            numeroActual = Number(numeroTexto);
            presentarNumero(numeroActual);
        }
        //SI APLASTO UN SIGNO
        else if(tecla == 'sign'){

        }
        //SI APLASTO EL IGUAL
        else if(tecla == 'igual'){
            switch (operacionAnteriorAux) {
                case 'mas': numeroGuardado = numeroGuardado + Number(numeroActual); break;
                case 'menos': numeroGuardado = numeroGuardado - Number(numeroActual); break;
                case 'por': numeroGuardado = numeroGuardado * Number(numeroActual); break;
                case 'dividido': numeroGuardado = numeroGuardado / Number(numeroActual); break;
            }
            operacionAnterior = 'igual';
            presentarNumero(Number(numeroGuardado.toFixed(2)));
        }
        //SI APLASTO UNA OPERACION 
        else{
 
            if (operacionAnterior != 'igual'){
                switch (operacionAnterior) {
                    case 'mas': numeroGuardado = numeroGuardado + Number(numeroActual); break;
                    case 'menos': numeroGuardado = numeroGuardado - Number(numeroActual); break;
                    case 'por': numeroGuardado = numeroGuardado * Number(numeroActual); break;
                    case 'dividido': numeroGuardado = numeroGuardado / Number(numeroActual); break;
                }
            }
                operacionAnteriorAux = operacionAnterior = tecla;
                numeroTexto = "";
                presentarNumero(Number(numeroGuardado.toFixed(2)));
        }
        console.log("--" ,numeroTexto,"--" , numeroGuardado, tecla, "-", teclaAnterior, "-" , operacionAnterior);                    
        teclaAnterior = tecla;     
    }



















    //FUNCION PARA PRESENTAR EL NUMERO
    presentarNumero = function(numero){
        document.querySelector('#display').innerHTML = numero;
    }
    //FUNCIONES PARA VISUALIZAR QUE SE APLASTA UNA TECLA
    achicarTecla = function(ev){
            ev.target.style.transform = "scale(0.95,0.95)";
            document.addEventListener("mouseup", agrandarTecla);
    }
    agrandarTecla = function(ev){
        ev.target.style.transform = "scale(1,1)";
        ev.target.removeEventListener("mouseup", agrandarTecla);
    }
    //LLAMADO AL LISTENER DE LOS CLICKS EN LAS TECLAS
    document.addEventListener("mousedown", teclaPresionada);
})();


