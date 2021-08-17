//Boton de subir, ajeno a la tarjeta
$(document).ready(function (){
   
    var subir = $('.Volver-arriba');
    subir.click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0},500)
    });
});





const tarjeta = document.querySelector('.tarjeta');

//Dar vuelta la tarjeta cuando se hace click
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('activar');
});


// Funcion para asegurarme que cada vez que agrego un dato a la parte del frente esta del lado delantero.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('activar')){
		tarjeta.classList.remove('activar');
	}
}


const formulario = document.querySelector('.formulario-tarjeta')



// Seleccion del año.

const anioActual = new Date().getFullYear();//Busco el año actual y lo guardo en una variable

for(let i = anioActual; i <= anioActual + 8; i++){
    //Defino la variable opcion que crea el elemento.
    let opcion = document.createElement('option');
    //Defino los atributos que requiere la etiqueta opcion.
    opcion.value = i;
    opcion.innerText = i;
    //Le agrego el hijo al formulario, al elemento "selectMes"
    formulario.seleccionAnio.appendChild(opcion);
}


// Seleccion del mes.

for(let i = 1; i <= 12; i++){
    //Defino la variable opcion que crea el elemento.
    let opcion = document.createElement('option');
    //Defino los atributos que requiere la etiqueta opcion.
    opcion.value = i;
    opcion.innerText = i;
    //Le agrego el hijo al formulario, al elemento "selectMes"
    formulario.seleccionMes.appendChild(opcion);
}


// Carga de numero de tarjeta
const numeroTarjeta = document.querySelector('.tarjeta .numero');

formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput

//Explicacion de uso de replace: https://www.it-swarm-es.com/es/java/java-como-reemplazar-2-o-mas-espacios-con-un-solo-espacio-en-cadena-y-eliminar-los-espacios-iniciales-y-finales/969684548/#:~:text=Para%20eliminar%20espacios%20al%20principio,)%2B%22%2C%20%22%20%22)%20.
                            // https://stackoverflow.com/questions/632204/java-string-replace-using-regular-expressions
	
                            // Busca los espacios en blanco y los elimina
	.replace(/\s/g, '')
	// Busca lo que no sean numeros del 0-9 y los elimina
	.replace(/\D/g, '')
	// Busca los numeros y los agrupa cada 4 caracteres
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina y se pone un espacio al final
	.trim();

	numeroTarjeta.textContent = valorInput;

    //Si la persona borra el numero de la tarjeta se vuelve al estado inicial

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}


    //Cambio la imagen del tipo de tarjeta segun el primer numero de la tarjeta
    const logoMarca = document.querySelector('#logo-marca');
	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'visa.svg';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'mastercard.svg';
		logoMarca.appendChild(imagen);
	}
    if (valorInput[0] == 3){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'americanexpress.svg';
        logoMarca.appendChild(imagen);
    }

	//Verifica que se vea el frente de la tarjeta
	mostrarFrente();
});


//Carga de nombre de la tarjeta

const nombreTarjeta = document.querySelector('.tarjeta .nombre');

formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Escriba su Nombre';
	}

	mostrarFrente();
});



//Seleccion del mes

const mesExpiracion = document.querySelector('.tarjeta .mes');


formulario.seleccionMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

//Seleccion del año

const anioExpiracion = document.querySelector('.tarjeta .anio');

formulario.seleccionAnio.addEventListener('change', (e) => {
	anioExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

//carga del codigo de seguridad

const cvv = document.querySelector('.tarjeta .cvv');

formulario.inputCVV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('activar')){
		tarjeta.classList.toggle('activar');
	}

	formulario.inputCVV.value = formulario.inputCVV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	cvv.textContent = formulario.inputCVV.value;
});