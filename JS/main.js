//PROYECTO CON DOM:

let zapaDiv = document.getElementById("zapa")

let guardarZapasBtn = document.getElementById("guardarZapasBtn")
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


const DateTime = luxon.DateTime
const fechaHoy = DateTime.now()
let fecha = document.getElementById("fecha")
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
fecha.innerHTML = `${fechaMostrar}`

let productosEnCarrito
if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)
}


function verCatalogo(array) {
    zapaDiv.innerHTML = ""

    for (let zapas of array) {

        let nuevoZapasDiv = document.createElement("div")
        nuevoZapasDiv.className = "col-12 col-md-6 col-lg-4 my-3"
        nuevoZapasDiv.innerHTML = `
        <div id="${zapas.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${zapas.imagen}" alt="${zapas.titulo} de ${zapas.autor}">
            <div class="card-body">
                <h4 class="card-title">${zapas.titulo}</h4>
                <p class="${zapas.precio <= 2300 && "ofertazapas"}">Precio: ${zapas.precio}</p>
                <button id="agregarBtn${zapas.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div> 
        `
        zapaDiv.appendChild(nuevoZapasDiv)
        let agregarBtn = document.getElementById(`agregarBtn${zapas.id}`)
        agregarBtn.onclick = () => {

            agregarAlCarrito(zapas)
        }
    }
}



function agregarAlCarrito(zapas) {

    console.log(`El producto ${zapas.titulo} de ${zapas.autor} ha sido agregado al carrito y vale ${zapas.precio}`)

    productosEnCarrito.push(zapas)

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    console.log(productosEnCarrito)

}

function cargarZapas(array) {
    let inputAutor = document.getElementById("autorInput")
    let inputTitulo = document.getElementById("tituloInput")
    let inputPrecio = document.getElementById("precioInput")

    const nuevozapas = new Zapas(array.length + 1, inputAutor.value, inputTitulo.value, parseInt(inputPrecio.value), "zapasNuevo.jpg")
    console.log(nuevozapas)


    array.push(nuevozapas)

    localStorage.setItem("estanteria", JSON.stringify(array))
    verCatalogo(array)
    let formAgregarzapas = document.getElementById("formAgregarzapas")

    formAgregarzapas.reset()


    Toastify({
        text: `El zapas ${nuevozapas.titulo} de ${nuevozapas.autor} ha sido agregado al stock`,
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "black"
        }
    }).showToast()
}


function buscarInfo(buscado, array) {

    let busquedaArray = array.filter(
        (zapas) => zapas.autor.toLowerCase().includes(buscado.toLowerCase()) || zapas.titulo.toLowerCase().includes(buscado.toLowerCase())
    )

    busquedaArray.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, verCatalogo(busquedaArray))
        : (coincidencia.innerHTML = "", verCatalogo(busquedaArray))
}
function cargarProductosCarrito(array) {
    console.log("Funciona btn render carrito")
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoCarrito) => {

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

    array.forEach((productoCarrito) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {

            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()

            let productoEliminar = array.find(zapas => zapas.id == productoCarrito.id)
            console.log(productoEliminar)

            let posicion = array.indexOf(productoEliminar)
            console.log(posicion)

            array.splice(posicion, 1)
            console.log(array)

            localStorage.setItem("carrito", JSON.stringify(array))

            compraTotal(array)
        })
    })
    compraTotal(array)
}
function agregarAlCarrito(zapas) {
    console.log(zapas)

    let zapasAgregado = productosEnCarrito.find((elem) => elem.id == zapas.id)
    if (zapasAgregado == undefined) {
        console.log(`El producto ${zapas.titulo} de ${zapas.autor} ha sido agregado al carrito y vale ${zapas.precio}`)

        productosEnCarrito.push(zapas)

        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

        Swal.fire({
            title: 'Ha agregado un producto :D',
            text: `Las zapas ${zapas.titulo} de ${zapas.autor} ha sido agregado`,
            icon: "info",
            confirmButtonText: "Gracias!",
            confirmButtonColor: "green",

            timer: 3000,

            imageUrl: `assets/${zapas.imagen}`,
            imageHeight: 200
        })

    } else {

        console.log(`El producto ${zapas.titulo} de ${zapas.autor} ya se encuentra en el carrito`)

        Swal.fire({
            text: `Las zapas ${zapas.titulo} de ${zapas.autor} ya existe en el carrito`,
            icon: "info",
            timer: 1500,
            showConfirmButton: false
        })
    }

}
function compraTotal(array) {

    let total = array.reduce((acc, productoCarrito) => acc + productoCarrito.precio, 0)

    total == 0 ?
        precioTotal.innerHTML = `No hay productos agregados` :
        precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`
    return total
}
function finalizarComprar(array) {
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result) => {
        if (result.isConfirmed) {
            let totalFinalizar = compraTotal(array)
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra ha adquirido nuestros productos. Por un total de ${totalFinalizar}`,
            })

            productosEnCarrito = []
            localStorage.removeItem("carrito")

        } else {
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                confirmButtonColor: 'green',
                timer: 3500
            })
        }
    })

}


function ordenarMenorMayor(array) {

    const menorMayor = [].concat(array)
    menorMayor.sort((param1, param2) => param1.precio - param2.precio)
    verCatalogo(menorMayor)
}

function ordenarMayorMenor(array) {

    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => b.precio - a.precio)
    verCatalogo(mayorMenor)

}

function ordenarAlfabeticamenteTitulo(array) {
    const ordenadoAlfabeticamente = [].concat(array)

    ordenadoAlfabeticamente.sort((a, b) => {
        if (a.titulo > b.titulo) {
            return 1
        }
        if (a.titulo < b.titulo) {
            return -1
        }

        return 0
    })
    verCatalogo(ordenadoAlfabeticamente)
}


guardarZapasBtn.addEventListener("click", () => {
    cargarZapas(estanteria)

})



inputBuscador.addEventListener("input", () => {
    buscarInfo(inputBuscador.value.toLowerCase(), estanteria)
})

selectOrden.addEventListener("change", () => {
    // console.log(selectOrden.value)
    if (selectOrden.value == "1") {
        ordenarMayorMenor(estanteria)
    } else if (selectOrden.value == "2") {
        ordenarMenorMayor(estanteria)
    } else if (selectOrden.value == "3") {
        ordenarAlfabeticamenteTitulo(estanteria)
    } else {
        verCatalogo(estanteria)
    }
})

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})
botonFinalizarCompra.addEventListener("click", () => {
    finalizarComprar(productosEnCarrito)
})


setTimeout(() => {
    loaderTexto.innerText = ""
    loader.remove()
    verCatalogo(estanteria)
}, 3000)

setInterval(() => {
    let horaActual = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    reloj.innerHTML = `${horaActual}`
}, 1000)
