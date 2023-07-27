
class Zapas {
    constructor(id, autor, titulo, precio, imagen) {

        this.id = id,
            this.autor = autor,
            this.titulo = titulo,
            this.precio = precio,
            this.imagen = imagen,
            this.cantidad = 1


    }
    //métodos
    mostrarInfoZapas() {
        console.log(`El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`)
    }
    sumarUnidad() {
        this.cantidad += 1
    }
    restarUnidad() {
        this.cantidad += 1
    }
}

let estanteria = []

const cargarEstanteria = async () => {

    const response = await fetch("zapas.json")
    const data = await response.json()
    for (let zapas of data) {
        let zapasNuevo = new Zapas(zapas.id, zapas.autor, zapas.titulo, zapas.precio, zapas.imagen)
        estanteria.push(zapasNuevo)
    }
    console.log(estanteria)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}

if (localStorage.getItem("estanteria")) {


    for (let zapas of JSON.parse(localStorage.getItem("estanteria"))) {
        let zapasStorage = new Zapas(zapas.id, zapas.autor, zapas.titulo, zapas.precio, zapas.imagen)
        estanteria.push(zapasStorage)
    }
    console.log(estanteria)
} else {

    console.log("Seteamos por primera vez, entra sólo en la primera vez")
    cargarEstanteria()

}
