
//----------------------------------------------------------------------------------------
//PROYECTO CON DOM:

let librosDiv = document.getElementById("libros")
// let verCatalogoBtn = document.getElementById("verCatalogo")
// let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo")
let guardarLibroBtn = document.getElementById("guardarLibroBtn")
let inputBuscador = document.querySelector("#buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let precioTotal = document.getElementById("precioTotal")
let loaderTexto = document.getElementById("loaderTexto")
let loader = document.getElementById("loader")
let reloj = document.getElementById("reloj")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

//luxon
const DateTime = luxon.DateTime
const fechaHoy = DateTime.now()
let fecha = document.getElementById("fecha")
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
fecha.innerHTML = `${fechaMostrar}`

//array carrito
let productosEnCarrito
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}


//FUNCTIONS PROYECTO DOM
//imprimiendo los objetos en el DOM
function verCatalogo(array){
    //antes que se vuelva a imprimir, resear el div
    librosDiv.innerHTML = ""

    for(let libro of array){
    //código para imprimir el array
        //creamos un div padre de la card
        let nuevoLibroDiv = document.createElement("div")
        nuevoLibroDiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoLibroDiv.innerHTML = `
        <div id="${libro.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
            <div class="card-body">
                <h4 class="card-title">${libro.titulo}</h4>
                <p>Autor: ${libro.autor}</p>
                <p class="${libro.precio <= 2300 && "ofertaLibro"}">Precio: ${libro.precio}</p>
                <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div> 
        `
        librosDiv.appendChild(nuevoLibroDiv)
        let agregarBtn = document.getElementById(`agregarBtn${libro.id}`)
        agregarBtn.onclick = ()=>{
            
            agregarAlCarrito(libro)
        }
    }
}



function agregarAlCarrito(libro){
    // console.log(libro)
    console.log(`El producto ${libro.titulo} de ${libro.autor} ha sido agregado al carrito y vale ${libro.precio}`)
    //sumarlo a productosEnCarrito
    productosEnCarrito.push(libro)
    //setearlo en storage
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    console.log(productosEnCarrito)
    //evaluar si ya existe o no el producto
}

function cargarLibro(array){
    let inputAutor = document.getElementById("autorInput")
    let inputTitulo = document.getElementById("tituloInput")
    let inputPrecio = document.getElementById("precioInput")
    
    //hacerlo con la function constructora
    const nuevoLibro = new Libro(array.length+1, inputAutor.value, inputTitulo.value,parseInt(inputPrecio.value), "libroNuevo.jpg")
    console.log(nuevoLibro)
 
    //pushearlo o sumarlo al array
    array.push(nuevoLibro)
    //guardar en storage:
    localStorage.setItem("estanteria", JSON.stringify(array))
    verCatalogo(array)
    let formAgregarLibro = document.getElementById("formAgregarLibro")
   
    formAgregarLibro.reset()

    //agregado Toastify:
    Toastify({
        text: `El libro ${nuevoLibro.titulo} de ${nuevoLibro.autor} ha sido agregado al stock`,
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black"
          }
  }).showToast()
 }


function buscarInfo(buscado, array){
        //condición compuesta || &&
        //coincidencia total, ej:
        // libro.autor.toLowerCase() == buscado.toLowerCase() || libro.titulo.toLowerCase() == buscado.toLowerCase()
        // quiero una coincidencia parcial: método includes
    let busquedaArray = array.filter(
            (libro) => libro.autor.toLowerCase().includes(buscado.toLowerCase()) || libro.titulo.toLowerCase().includes(buscado.toLowerCase())
        )
    // if(busquedaArray.length == 0){
    //     coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`
    //     verCatalogo(busquedaArray)
    // }else{
    //     coincidencia.innerHTML = ""
    //     verCatalogo(busquedaArray)
    // }
    //reemplazar por operador ternario
    busquedaArray.length == 0 ? 
    (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, verCatalogo(busquedaArray)) 
    : (coincidencia.innerHTML = "", verCatalogo(busquedaArray))
}
function cargarProductosCarrito(array){
    console.log("Funciona btn render carrito")
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito)=>{
        
        modalBodyCarrito.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.titulo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
        `
        })
     //segundo forEach agregar function eliminar   
     array.forEach((productoCarrito)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", ()=>{
            // console.log("btn eliminar funciona")
            //borrar del DOM
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            //eliminar del array
            //busco prod a eliminar
            let productoEliminar = array.find(libro => libro.id == productoCarrito.id)
            console.log(productoEliminar)
            //busco el indice
            let posicion = array.indexOf(productoEliminar)
            console.log(posicion)
            //splice (posicion donde trabajar, cant de elementos a eliminar)
            array.splice(posicion, 1)
            console.log(array)
            //eliminar storage (volver a setear)
            localStorage.setItem("carrito", JSON.stringify(array))
            //recalcular total
            compraTotal(array)
        })
     })
    compraTotal(array)
}
function agregarAlCarrito(libro){
    console.log(libro)
    //evaluar si ya existe o no el producto
    let libroAgregado = productosEnCarrito.find((elem)=> elem.id == libro.id)
    if(libroAgregado == undefined){
        console.log(`El producto ${libro.titulo} de ${libro.autor} ha sido agregado al carrito y vale ${libro.precio}`)
        //sumarlo a productosEnCarrito
        productosEnCarrito.push(libro)
        //setearlo en storage
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        // console.log(productosEnCarrito)
        //sweetalert para experiencia de usuario
        Swal.fire({
            title: 'Ha agregado un producto :D',
            text: `El libro ${libro.titulo} de ${libro.autor} ha sido agregado`,
            icon: "info",
            confirmButtonText: "Gracias!",
            confirmButtonColor: "green",
            //milisegundo por medida
            timer: 3000,
            //para img
            imageUrl: `assets/${libro.imagen}`,
            imageHeight: 200 
        })

    }else{
        //el producto ya se encuentra
        console.log(`El producto ${libro.titulo} de ${libro.autor} ya se encuentra en el carrito`)
        //OTRA OPCION: logica que acumule cantidad
        //que me avise que ya está en el carrito
        Swal.fire({
            text: `El libro ${libro.titulo} de ${libro.autor} ya existe en el carrito`,
            icon: "info",
            timer: 1500,
            showConfirmButton: false
        })
    }

}
function compraTotal(array){
    // reduce
    // let acumulador = 0
    // for(let book of array){
    //     acumulador = acumulador + book.precio
    // }
    
    //acumulador con reduce
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio ,0)
    // console.log("Acc con reduce " + total)
    //ternario para mostrar en el html
    total == 0 ?
    precioTotal.innerHTML = `No hay productos agregados` :
    precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`
    return total
}
function finalizarComprar(array){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then( (result)=> {
            if(result.isConfirmed){
                let totalFinalizar = compraTotal(array)
                Swal.fire({
                    title: 'Compra realizada',
                    icon: 'success',
                    confirmButtonColor: 'green',
                    text: `Muchas gracias por su compra ha adquirido nuestros productos. Por un total de ${totalFinalizar}`,
                    })
                //nivel array
                productosEnCarrito = []
                localStorage.removeItem("carrito")    
                
            }else{
                Swal.fire({
                    title: 'Compra no realizada',
                    icon: 'info',
                    text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                    confirmButtonColor: 'green',
                    timer:3500
                })
            }
    })

}

//functions ordenar:
function ordenarMenorMayor(array){
    //copia array original, para no modificar estanteria
    const menorMayor = [].concat(array)
    menorMayor.sort((param1, param2)=> param1.precio - param2.precio)
    verCatalogo(menorMayor)
}

function ordenarMayorMenor(array){
    //array que recibe y lo copia
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a,b)=> b.precio - a.precio)
    verCatalogo(mayorMenor)
    
}

function ordenarAlfabeticamenteTitulo(array){
        const ordenadoAlfabeticamente = [].concat(array)
        //ordenar algo que tiene un dato string
        //forma de la a-z ascendente
        ordenadoAlfabeticamente.sort((a, b) => {
            if (a.titulo > b.titulo) {
              return 1
            }
            if (a.titulo < b.titulo) {
              return -1
            }
            // a es igual b
            return 0
          })
          verCatalogo(ordenadoAlfabeticamente)
}


 //EVENTOS:
guardarLibroBtn.addEventListener("click", ()=>{
    cargarLibro(estanteria)

})


//por cada evento, averiguar su funcionamiento, luego pasarle function con instrucciones a realizar
inputBuscador.addEventListener("input", ()=>{
    buscarInfo(inputBuscador.value.toLowerCase(), estanteria)
})
//select para ordenar
selectOrden.addEventListener("change", ()=>{
    // console.log(selectOrden.value)
    if(selectOrden.value == "1"){
        ordenarMayorMenor(estanteria)
    }else if(selectOrden.value =="2"){
        ordenarMenorMayor(estanteria)
    }else if(selectOrden.value == "3"){
        ordenarAlfabeticamenteTitulo(estanteria)
    }else{
        verCatalogo(estanteria)
    }
})

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
botonFinalizarCompra.addEventListener("click", ()=>{
    finalizarComprar(productosEnCarrito)
})

//CODIGO:
setTimeout(()=>{
    loaderTexto.innerText =""
    loader.remove()
    verCatalogo(estanteria)
},3000)

setInterval(()=>{
    let horaActual = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    reloj.innerHTML = `${horaActual}`
}, 1000)

//CLASE 8 
//ASINCRONIA

//setTimeout
//dos parametros (function, tiempo en miliseg)

// console.log("Inicio del proceso")
// setTimeout(()=>{
//     console.log("Mitad del proceso")
// }, 0)
// console.log("Fin del proceso")

// let timer = 0
// for(let letra of "hola coder"){
//     timer+=1000
//     setTimeout(()=>{
//         console.log(letra)

//     }, timer)
// }

//setInterval (misma sinxtaxis que setTimeout)
//clear
// let i = 0
// let intervalo = setInterval(()=>{
//     i++
//     console.log("Tic " + i)
//     if(i >= 10){
//         clearInterval(intervalo)
//         console.log("Fin de los tics")
//     }
// },1000)

//Promesas

// //pendiente
// const eventoFuturo = () => {
//     return new Promise( (resolve, reject)=>{

//     }) 
// }
// console.log(eventoFuturo())


// const eventoFuturo = (valor) => {
//     return new Promise( (resolve, reject)=>{

//         if(valor == true){
//             resolve("Promesa se ha cumplido :D")
//         }else{
//             reject("La promesa se ha rechazado :(")
//         }
//     }) 
// }
// console.log(eventoFuturo(true))
// console.log(eventoFuturo(false))
// console.log(" ver si sigue ejecutandose el código")

// const eventoFuturo = (valor) => {
//     return new Promise( (resolve, reject)=>{
//         setTimeout(()=>{
//             if(valor == true){
//                 resolve("Promesa se ha cumplido :D")
//             }else{
//                 reject("La promesa se ha rechazado :(")
//             }

//         }, 2000)
//     }) 
// }

// //solucionar la asincrónia, evitar el pending
// eventoFuturo(false)
// //then relacionado con el resolve
// .then( (resp)=>{
//     console.log(resp)
// })
// //el catch con el reject
// .catch( (error) => {
//     console.log(error)
// })
// .finally(()=>{
//     console.log("Se finalizó la promesa, no sé si bien o mal. Terminó")
// })


// function simularCargaLibros(resultado){
//     return new Promise((res, rej)=>{
//         if(resultado == true){
//             setTimeout(()=>{
//                 res(estanteria)
//             },3000)
//         }else{
//             setTimeout(()=>{
//                 rej("No se pudo cargar tus libros :(")
//             },1500)
//         }
//     })
// }

// simularCargaLibros(true)
// .then((respuesta)=>{
//     console.log("Tu catalogo es:")
//     console.log(respuesta)
// })
// .catch((err)=>{
//     console.log(err)
// })
// .finally(()=>{
//     console.log("La carga de estanteria ha finalizado")
// })