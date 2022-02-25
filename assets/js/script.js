const baseUrl='https://api.github.com/users';
let form = document.getElementById("myForm");

let request = async(url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}

const getUser = async (user) => {
    const url = `${baseUrl}/${user}`;
    return request(url);
}

let getRepo = async (baseUrl, user, pagina, cantidad_repos) => {
    const url = `${baseUrl}/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`;
    return request(url);
}


form.addEventListener("submit", async function(e){
    e.preventDefault()

    try {
        let search = document.getElementById("nombre").value
        let originalName = search.split(' ').join('')
        let pagina = document.getElementById("pagina").value;
        let nRepos = document.getElementById("repoPagina").value;
        
        const data = await getUser(originalName);
        console.log(data);
    
        const data2 = await getRepo(baseUrl, originalName, pagina, nRepos);
        console.log(data2);
    
        document.getElementById("resultados").innerHTML = `
            <div class="col">
                <h4>Datos de Usuario</h4>
                <img class="img-fluid" src ="${data.avatar_url}"/>
                <p>Nombre de Usuario: "${data.name}"</p>
                <p>Nombre de Login: "${data.login}"</p>
                <p>Cantidad de Repositorios: "${data.public_repos}"</p>
                    <p>Localidad: "${data.location}"</p>
                    <p>Tipo de Usuario: "${data.type}"</p>
                </div>
                <div class="col">
                    <h4>Nombre de repositorios</h4>
                    <ul>
                    ${data2.map( (e) => {
                        console.log(e.name);
                        return `<li><a href="${e.homepage}">${e.name}</a></li>`
                    }).join('')}
                    </ul>
                </div>
            `
    } catch (error) {
        alert("Usuario no existe")
    }
})



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