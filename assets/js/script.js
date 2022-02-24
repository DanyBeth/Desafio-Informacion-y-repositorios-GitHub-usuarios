/* Requerimientos
1. Crear tres funciones, una request, otra getUser y por último una función getRepo,
todas deben implementar async..await. La función request hará las peticiones a la
API y retorna el resultado, mientras que las funciones getUser y getRepo enviarán
los datos a la función request para obtener la información del usuario y los
repositorios a mostrar. Utiliza una URL base con el valor:
https://api.github.com/users.

2. Agregar una escucha (addEventListener) al formulario, que permita activar una
función en donde se capturen los datos ingresados por el usuario de la página
(nombre de usuario, número de página, repositorio por páginas).

3. Mediante la implementación de una Promesa, realizar el llamado a las dos funciones
al mismo tiempo que permiten conectarse con la API y traer la información en el
caso de existir “getUser” y “getRepo”. Pasando como parámetros los valores
necesarios para cada llamado de la API según la URL.

4. Mostrar los resultados obtenidos de la API en el documento HTML en la sección de
“Resultados”, como se muestra en la figura número dos.

5. En el caso que el mensaje retornado por la API sea “Not Found”, indicar mediante
una ventana emergente que el usuario no existe y no mostrar ningún tipo de
información en la sección de resultado en el documento HTML. */



let baseUrl='https://api.github.com/users';
var form = document.getElementById("myForm")

form.addEventListener("submit", function(e){
    e.preventDefault()

    var search = document.getElementById("nombre").value
    var originalName = search.split(' ').join('')

    document.getElementById("resultados").innerHTML = ""

    fetch('https://api.github.com/users/' + originalName)
    .then((result) => result.json())
    .then((data) => {
        console.log(data)

        document.getElementById("resultados").innerHTML = `
            <a target="_blank" href="https://www.github.com/${originalName}"> <img src ="${data.avatar_url}"/> </a>
        `
    })
})

let request = async(url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}

let getUser = async (user) => {
    const url = `${baseUrl}/${user}`;
    return request(url);
}

let getRepo = async (pagina, cantidad_repos) => {
    const url = `${baseUrl}/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`;
    return request(url);
}

const emitter = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Información Enviada!");
        }, 3000);
    });
};

const llamado = new Promise ((resolve, reject) => {
    if (getUser && getRepo) {
        resolve("No sé qué poner acá");
    }
});

