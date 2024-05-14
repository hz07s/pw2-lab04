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
        var tr = document.createElement('tr');
        var totalConfirmados = calcularTotalConfirmados(item.confirmed);
        tr.innerHTML = `<td>${item.region}</td><td>${totalConfirmados}</td>`;
        regionesLista.appendChild(tr);
    });
}

function calcularTotalConfirmados(confirmados) {
    var total = 0;
    confirmados.forEach(function(dia) {
        total += parseInt(dia.value);
    });
    return total;
}

document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
});
