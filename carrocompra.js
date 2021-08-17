$(document).ready(function (){
   
    var subir = $('.Volver-arriba');
    subir.click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0},500)
    });
});



$(window).on ('load',function () {
    buscardatos()
});

const buscardatos = async () => {
    try {
        const res = await fetch('productos.json')
        const data = await res.json()
        // console.log(data)
        seleccionarProductos(data)
        detectarBotones(data)
   } catch (error) {
       console.log(error)
    }
}

const containerProductos = document.querySelector('#productos')
const seleccionarProductos = (data) => {
    const template = document.querySelector('#templateProd').content 
    const fragment = document.createDocumentFragment() 
    console.log(template)
    //hago la iteracion para cada producto generando la tarjeta con el item tomado de json
    data.forEach(producto => {
       
        //por medio del query selector tomo las partes del template y les asigno los datos de cada producto del json
        template.querySelector('img').setAttribute('src', producto.imagen)
        template.querySelector('h5').textContent = producto.nombre
        template.querySelector('p span').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id
    //Clono el template porque al ser uno solo tengo que para cada iteración correspondiente a un producto generar uno nuevo
        const clone = template.cloneNode(true)
    //lo que clone lo agrego al fragment que almacena el template 
        fragment.appendChild(clone)
    })
    //Lo agrego al fragment con todos los templates de cada producto al contenedor de productos que se encuentra en el DOM
   containerProductos.appendChild(fragment)
}

//Creo el objeto compra donde voy a guardar las compras hechas
let compra = {}

//Creo el detector de botones al cual ingresa la data del traida de json
const detectarBotones = (data) => {
    //Con query selector all tomo todos los elementos del dom que cumplen con la condicion de estar dentro de la tarjeta y ser un boton
    const botones = document.querySelectorAll('.card button')

    botones.forEach(boton => {
        $(boton).on('click', () => {
            
            const producto = data.find(item => item.id === parseInt(boton.dataset.id))
            
            //le agrego al producto un contador inicializado en 1 cuando ya toca el boton
            producto.cantidad = 1
            //Verifico si compra ya cuenta o no con un elemento con ese id
            if (compra.hasOwnProperty(producto.id)) {
            //como ya existe el producto comprado dentro de compra, aumento el contador en una unidad.
                producto.cantidad = compra[producto.id].cantidad + 1
            }
            compra[producto.id] = { ...producto }
        
            productosComprados()
        })
   
    })
}

const items = document.querySelector('#items');

const productosComprados = () => {
    
// inicializo items en string vacio para asi se va sumando sobre este la cantidad a comprar y no se vuelven a agregar
    items.innerHTML = ''

    const template = document.querySelector('#templateCompra').content
    const fragment = document.createDocumentFragment()
    
//paso de un objeto a un array
    Object.values(compra).forEach(producto => {
        // console.log('producto', producto)
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.nombre
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        template.querySelector('#botonAgregar').dataset.id = producto.id
        template.querySelector('#botonSacar').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

   seleccionarFooter()
   accionBotones()

$(".ocultar").hide();
}

const footer = document.querySelector('#pieCompra')
const seleccionarFooter = () => {

    footer.innerHTML = ''

    const template = document.querySelector('#templatePieCompra').content
    const fragment = document.createDocumentFragment()

    // sumar cantidad de productos comprados  y sumar total a pagar
    const sumaCantidad = Object.values(compra).reduce((acumulador, { cantidad }) => acumulador + cantidad, 0)
    console.log("Cantidad de productos: "+ sumaCantidad);
    const sumaPrecio = Object.values(compra).reduce((acumulador, {cantidad, precio}) => acumulador + cantidad * precio ,0)
    console.log("Precio total a pagar: " + sumaPrecio)

    template.querySelectorAll('td')[0].textContent = sumaCantidad
    template.querySelector('span').textContent = sumaPrecio

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

    footer.appendChild(fragment);

}

const accionBotones = () => {
    const botonAgregar = document.querySelectorAll('#botonAgregar');
    const botonSacar =  document.querySelectorAll('#botonSacar');

    console.log(botonAgregar);

    botonAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            console.log("Se agrego un ítem");
            const producto = compra[boton.dataset.id]
            producto.cantidad ++
            compra[boton.dataset.id] = { ...producto }
            productosComprados()
        })
    })

    botonSacar.forEach(boton => {
        boton.addEventListener('click', () => {
            console.log("Se eliminó un ítem");
            const producto = compra[boton.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete compra[boton.dataset.id]

            } else {
                compra[boton.dataset.id] = { ...producto }
            }
            productosComprados()
        })
    })


}


// document.querySelector('#salado').addEventListener('click',traerSalado());

// function traerSalado(){

// console.log('dentro de la funcion')
// $.get('productos.json',)

// }