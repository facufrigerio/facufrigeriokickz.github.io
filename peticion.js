//captura DOM
let divProductos = document.getElementById("productos")
fetch("https://hp-api.onrender.com/api/characters/students")
.then((res)=> res.json())
.then((data) =>{
    
    for(let personaje of data){
        let nuevoPersonaje = document.createElement("div")
        nuevoPersonaje.innerHTML = `
        <div id="" class="card" style="width: 18rem;">
                <img class="card-img-top " src="${personaje.image}">
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="">${personaje.name}</p>
                    <p class="">${personaje.house}</p>
                    <p class="">${personaje.actor}</p>
                </div>
            </div>
        `
        divProductos.appendChild(nuevoPersonaje)
    }
})

{/* <div id="" class="card" style="width: 18rem;">
                <img class="card-img-top " src="">
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class=""></p>
                    <p class=""></p>
                    <p class=""></p>
                </div>
            </div> */}