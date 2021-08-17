class Persona {
    
    constructor ( apellido, nombre , edad , altura, peso){
    this.apellido = apellido;
    this.nombre = nombre;
    this.edad = edad;
    this.altura = altura;
    this.peso = peso;
}


indiceMasaCorporal (){
console.log( "Peso ingresado: " + this.peso);
console.log("Altura ingresada: " + this.altura);
let multAltura = this.altura * this.altura;
var IMC = (this.peso * 10000 / multAltura).toFixed(1);
let alertaIMC = this.nombre + ", su indice de masa corporal es de: "+ IMC;
console.log("IMC calculado: " + IMC);
let pIMC = document.createElement("p");
        // Insertar HTML interno
        pIMC.innerHTML = alertaIMC;
        // Añadir el nodo Element como hijo de body
        impresiones.appendChild(pIMC); 
    


let estadoPeso;

    if ((IMC>=0) && (IMC <=18.5))
        {estadoPeso = "Usted esta Bajo Peso.";
        console.log("Peso inferiór");}

        else if ((IMC> 18.5) && (IMC <=24.9)) 
        {estadoPeso = "Su peso se encuentra en el Rango de Normalidad.";
        console.log("Peso normal");}

        else if ((IMC > 25) && (IMC <=29.9)) 
        {estadoPeso = "Usted tiene Sobrepeso.";
        console.log("Sobrepeso.");}

        else if ((IMC > 30) && (IMC <=34.9)) 
        {estadoPeso = "Usted tiene Obesidad de Grado 1.";
        console.log("Obesidad grado 1.");}

        else if ((IMC > 35) && (IMC <=39.9)) 
        {estadoPeso = "Usted tiene Obesidad de Grado 2.";
        console.log("Obesidad grado 2.");}

        else {
        estadoPeso = "Usted tiene Obesidad de Grado 3.";
        console.log("Obesidad grado 3");}

        let pEstadoPeso = document.createElement("p");
        // Insertar HTML interno
        pEstadoPeso.innerHTML = estadoPeso;
        // Añadir el nodo Element como hijo de body
        impresiones.appendChild(pEstadoPeso); 


        //Si esta fuera del peso normal puede consultar su peso ideal

            if ((IMC < 18.5) || (IMC > 25)){
                                       
            var pesoI = (22 * (this.altura/100) * (this.altura/100)).toFixed(1);
            console.log ("Peso Ideal: " + pesoI);
            // Crear nodo de tipo Elemento, etiqueta p
            let pPesoIdeal = document.createElement("p");
            let concatenado = "Su peso Ideal es de: " + pesoI + " kg."
            // Insertar HTML interno
            pPesoIdeal.innerHTML = concatenado;
            // Añadir el nodo Element como hijo de body
            impresiones.appendChild(pPesoIdeal); 
}   }       }   

//Al presionar el ENTER en el formulario se pasa a la proxima casilla 
function capturarEnter(evento , id) {
    if (evento.which == 13 || evento.keyCode == 13) {
      
			document.getElementById(id).focus();
}	}


// Inicio del programa

$(window).on ('load', function() {
    console.log( 'Se cargaron todos los elementos, incluyendo fotos' );
});

$(document).ready(function (){
    $(window).scroll(function (){
        if($(this).scrollTop() >0 ){
            $('header').addClass('header2');}
        else{
            $('header').removeClass('header2');}
    })

    var subir = $('.Volver-arriba');
    subir.click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0},500)
    });
});

function comenzarCargaDatos(){
//Declaro variables que se usan para crear la clase "Persona"
let apellido = $("#apellido").val();
let nombre =$("#nombre").val();
let edad = parseInt($("#edad").val());
let altura = parseInt($("#altura").val());
let peso = parseInt($("#peso").val());

let persona1 = new Persona(apellido,nombre, edad ,altura, peso);

$("#formulario").append('<h3>Gracias por cargar los datos!</h3>' );

$("h3").fadeIn(3000);$("h3").fadeOut("slow", function(){
    
    $("h3").fadeIn(2000);
});

persona1.indiceMasaCorporal();
};