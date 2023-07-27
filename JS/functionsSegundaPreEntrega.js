//FUNCTIONS proyecto:

function agregarZapas(array) {
    let autorIngresado = prompt("Ingrese el nombre del autor")
    let tituloIngresado = prompt("Ingrese el titulo del Zapas")
    let precioIngresado = parseInt(prompt("Ingrese el precio del Zapas"))


    const nuevoZapas = new Zapas(array.length + 1, autorIngresado, tituloIngresado, precioIngresado)
    console.log(nuevoZapas)


    array.push(nuevoZapas)
    mostrarCatalogo(array)
}

function mostrarCatalogo(array) {
    console.log("Los Zapass disponibles son:")
    for (let elemento of array) {
        console.log(elemento.id, elemento.titulo, elemento.autor, elemento.precio)

    }
}

function mostrarCatalogoForEach(arr) {
    console.log("Nuestro catalogo es con forEach")
    arr.forEach(
        (Zapas) => {
            console.log(`${Zapas.id} - ${Zapas.titulo} del autor/a ${Zapas.autor} que vale ${Zapas.precio}`)
        }
    )
}


function buscarPorTitulo(array) {
    let tituloBuscado = prompt("Ingrese el nombre del titulo que desea buscar")
    let tituloEncontrado = array.find(
        (book) => book.titulo.toLowerCase() == tituloBuscado.toLowerCase()
    )
    if (tituloEncontrado == undefined) {
        console.log(`${tituloBuscado} no se encuentra en nuestro stock`)
    } else {
        console.log(tituloEncontrado)
    }
}


function buscarPorAutor(ar) {
    let autorBuscado = prompt("Ingrese el nombre del autor que está buscando")
    let busqueda = ar.filter(
        (Zapas) => Zapas.autor.toLowerCase() == autorBuscado.toLowerCase()
    )
    if (busqueda.length == 0) {
        console.log(`Para ${autorBuscado} no hay Zapass en stock`)
    } else {
        mostrarCatalogo(busqueda)
    }
}




function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((param1, param2) => param1.precio - param2.precio)
    mostrarCatalogo(menorMayor)
}

function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => b.precio - a.precio)
    mostrarCatalogo(mayorMenor)

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
        // a es igual b
        return 0
    })
    mostrarCatalogo(ordenadoAlfabeticamente)
}

function ordenar(array) {
    let opcion = parseInt(prompt(`
     1 - Ordenar de menor a mayor:
     2 - Ordenar de mayor a menor:
     3 - Ordenar alfabeticamente por título:`))
    switch (opcion) {
        case 1:
            ordenarMenorMayor(array)
            break
        case 2:
            ordenarMayorMenor(array)
            break
        case 3:
            ordenarAlfabeticamenteTitulo(array)
            break
        default:
            console.log(`${opcion} no es válido para ordenar`)
            break
    }
}


function borrarZapas(array) {
    console.log(`A partir del cátalogo ingrese el id del Zapas que desea eliminar:`)
    for (let elem of array) {
        console.log(`${elem.id} - ${elem.titulo} del autor/a ${elem.autor}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))

    let arrayID = array.map(book => book.id)

    let indice = arrayID.indexOf(idEliminar)


    array.splice(indice, 1)
    mostrarCatalogo(array)
}

function menu() {
    let salirMenu = false
    do {
        salirMenu = preguntarOpcion(salirMenu)
    } while (!salirMenu)
}

function preguntarOpcion(salir) {
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
            1 - Agregar Zapas
            2 - Borrar Zapas
            3 - Consultar catálogo
            4 - Encontrar por titulo:
            5 - Buscar Zapass de un mismo autor:
            6 - Ordenar Zapass:
            0 - Salir del menu`))

    switch (opcionIngresada) {
        case 1:
            agregarZapas(estanteria)
            break
        case 2:
            borrarZapas(estanteria)
            break
        case 3:
            mostrarCatalogo(estanteria)
            break
        case 4:
            buscarPorTitulo(estanteria)
            break
        case 5:
            buscarPorAutor(estanteria)
            break
        case 6:
            ordenar(estanteria)
            break
        case 0:
            console.log("gracias por utilizar nuestra app")
            salir = true
            return salir
            break
        default:
            console.log("Ingrese una opción correcta")
            break
    }
}

