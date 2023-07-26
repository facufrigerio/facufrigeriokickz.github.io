//class constructora
class Libro {
    constructor(id, autor, titulo, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.autor = autor,
        this.titulo = titulo,
        this.precio = precio, 
        this.imagen = imagen,
        this.cantidad = 1
        

    }
    //métodos
    mostrarInfoLibro(){
        console.log(`El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`)
    }
    sumarUnidad(){
        this.cantidad += 1
    }
    restarUnidad(){
        this.cantidad += 1
    }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

// const libro1 = new Libro(1,"Jorge Luis Borges","Aleph", 900, "AlephBorges.jpg")

// const libro2 = new Libro(2,"Gabriel García Marquez","Cien años de Soledad", 4500, "CienSoledadMarquez.jpg")

// const libro3 = new Libro(3,"Isabel Allende", "Paula", 2800, "PaulaAllende.jpg")

// const libro4 = new Libro(4,"Jorge Luis Borges","Ficciones", 1400, "FiccionesBorges.jpg")

// const libro5 = new Libro(5,"Mario Benedetti", "Andamios", 2200, "AndamiosBenedetti.jpg")

// const libro6 = new Libro(6, "Mario Vargas Llosa", "La ciudad y los perros", 2400, "CiudadPerrosVargasLlosa.jpg")

//crear un array de objetos: 
let estanteria = []

const cargarEstanteria = async () => {
    //ruta relativa: del HTML al JSON y abrir con liveServer
    const response = await fetch("libros.json")
    const data = await response.json()
    for(let libro of data){
        let libroNuevo = new Libro(libro.id, libro.autor, libro.titulo, libro.precio, libro.imagen)
        estanteria.push(libroNuevo)
    }
    console.log(estanteria)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}
//dos posibilidades que en storage exista algo o que no exista
//condicional que evalue si hay algo
if(localStorage.getItem("estanteria")){
    //si existe algo en el storage entra al if
    
    for(let libro of JSON.parse(localStorage.getItem("estanteria"))){
        let libroStorage = new Libro(libro.id, libro.autor, libro.titulo, libro.precio, libro.imagen)
        estanteria.push(libroStorage)
    }
    console.log(estanteria)
}else{
    //si no existe, entra al else
    console.log("Seteamos por primera vez, entra sólo en la primera vez")
    cargarEstanteria()
    
}
