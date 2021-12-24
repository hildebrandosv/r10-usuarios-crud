//╔═════════════════════════════════════════════════════════════════════════════════════╗
//║                              MAIN JAVASCRIPT SCRIPT                                 ║
//║  NOTES:                                                                             ║
//║    ° Random image to test : https://picsum.photos/80/90?random=1024                 ║
//║      Change the numbre after "random=" to generar an image different al the time.   ║
//╚═════════════════════════════════════════════════════════════════════════════════════╝

// *** Import DATA from JS file ***
import { url as endpoint } from './url.js';
//
// *** Import FUNCTIONS from JS file ***
//
// *** CONSTANT definition ***
//
// *** VARIABLES definition ***
//
// *********************************************
// ***           BEGIN MAIN MODULE           ***
// *********************************************
//

document.getElementById('inputId').style.display = 'none';
//3
const ul = document.querySelector('.list-group');
//1 Petición GET
const getUser = async () => {
    const respuesta = await fetch(endpoint);
    const data = await respuesta.json();
    data.forEach(element => {
        const { id, nombre, url, correo } = element;
        ul.innerHTML += `
                        <li class="list-group-item">
                            <div class="container-fluid align-items-center row">
                                <div class= "col-12 col-sm-3 col-md-4 p-0 m-0">
                                    <span class="lead">${nombre}</span>
                                </div>
                                <div class= "col-12 col-sm-1 col-md-2 p-0 m-0">
                                    <img src=${url} width="50px"></img>
                                </div>
                                <div class= "col-12 col-sm-4 col-md-4 p-0 m-0">
                                    <input class="form-control" type="text" placeholder="${correo}" aria-label="Disabled input example" disabled>
                                </div>
                                <div class= "col-12 col-sm-2 col-md-2">
                                    <button id=${id} class="btn btn-dark fs-5 btm-sm float-end ">Borrar</button>
                                </div>
                            </div>
                        </li>
                        `
    });
}

//2
window.addEventListener('DOMContentLoaded', getUser)

//4 Petición DELETE
ul.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('btn-dark');
    if (btnEliminar === true) {
        const id = e.target.id;
        const responseFetch = await fetch(endpoint + id, {
            method: 'DELETE'
        })
        const dataJson = await responseFetch.json()
        console.log(dataJson)
    }
})

//5 Captura de datos del formulario
const capturaDatos = () => {
    const url = document.getElementById('inputUrl').value;
    const nombre = document.getElementById('inputNombre').value;
    const correo = document.getElementById('inputCorreo').value;
    const descripcion = document.getElementById('inputDescripcion').value;
    const user = {
        url,
        nombre,
        correo,
        descripcion
    }
    return user;
}

//6 Petición POST
const form = document.querySelector('.form-group');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const objeto = capturaDatos();
    // Random image generation
    objeto.url = "https://picsum.photos/80/90?random=" + Math.random()
    // Validate email after the data save
    const { correo } = objeto;
    const resp = await fetch(endpoint);
    const lista = await resp.json()
    const buscado = lista.find(u => u.correo.toLowerCase() === correo.toLowerCase())
    console.log("lista", lista)
    console.log("buscado", buscado)
    if (buscado !== undefined) {
        alert('El correo ya existe: Revise pues no deben haber correos duplicados')
    } else {
        await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(objeto),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }
})

// 7 Buscar por correo
const btnCorreo = document.getElementById('btnCorreo');
btnCorreo.addEventListener('click', async () => {
    const input = document.getElementById('inputCorreo').value;
    const resp = await fetch(endpoint);
    const lista = await resp.json()
    const buscado = lista.find(u => u.correo.toLowerCase() === input.toLowerCase())
    if (buscado !== undefined) {
        const { id, nombre, descripcion } = buscado;
        document.getElementById('inputUrl').value = buscado.url;
        document.getElementById('inputNombre').value = nombre;
        document.getElementById('inputDescripcion').value = descripcion;
        document.getElementById('inputId').value = id;
    } else {
        alert('Correo no encontrado')
    }
})

//8 Modificar lo buscado
const btnModificar = document.getElementById('btnModificar');
btnModificar.addEventListener('click', async () => {
    const dataMod = capturaDatos();
    const { url, nombre, correo, descripcion } = dataMod;

    if (url === "", nombre === "", correo === "", descripcion === "") {
        alert('Llenar todos los campos')
    }
    else {
        const id = document.getElementById('inputId').value;
        console.log(dataMod)
        await fetch(endpoint + id, {
            method: 'PUT',
            body: JSON.stringify(dataMod),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }
})
//
// *********************************************
// ***            END MAIN MODULE            ***
// *********************************************
function al(aa) { alert("Aquí voy... ", aa); }
function cl(aa) { console.log("Aquí voy... ", aa); }
//╔════════════════════════════════════════════════╗
//║             FUNCTION DEFINITION                ║
//╚════════════════════════════════════════════════╝
let lDataExist = false
// LLamo la funcion de consulta
lDataExist = fnDataSearch().then(data => {
    console.log('-----------------')
    console.log(data)

        // ¿Cómo debo llamar la función para que en la variable ""
        //  me quede el valor que la función devuelve?

})
// Aquí imprimo lo lo que me devuelve en la variable "lDataExist"
console.log("Existe (lDataExist): ", lDataExist)

async function fnDataSearch(valueFieldToSearch, urlData) {
        const correo = "ehr@gmail.com"
        const resp = await fetch(endpoint);
        const lista = await resp.json()
        const buscado = lista.find(u => u.correo.toLowerCase() === correo.toLowerCase())
        return (buscado !== undefined)

        // ¿Cómo hago para retornar de una vez (desde aquí) TRUE o FALSE?

}


// a1()

// function a1 {
//     fetch(endpoint)
//         .then(response => response.json())
//         .then(data => console.log(data));

// }

// async function postData(url = '', data = {}) {
//     // Opciones por defecto estan marcadas con un *
//     const response = await fetch(url);
//     return response.json(); // parses JSON response into native JavaScript objects
// }

// postData(endpoint, { answer: 42 })
//   .then(data => {
//     console.log(data); // JSON data parsed by `data.json()` call
//   });