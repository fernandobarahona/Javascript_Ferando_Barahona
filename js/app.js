var Calculadora = ( function(){
    return {
        achicarTecla: function(){
            document.addEventListener("mousedown", function(ev){
                ev.target.style.transform = "scale(0.95,0.95)";
            });
            document.addEventListener("mouseup", function(ev){
                ev.target.style.transform = "scale(1,1)";
            });
        }
    }
})();

Calculadora.achicarTecla();
