function cargarDatos() {
    fetch('../data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un error al cargar los datos.');
            }
            return response.json();
        })
        .then(data => listarRegiones(data))
        .catch(error => console.error(error));
}

function listarRegiones(datos) {
    var regionesLista = document.getElementById('regiones-lista');
    datos.forEach(function(item) {
        var li = document.createElement('li');
        li.textContent = item.region;
        regionesLista.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
});
