function cargarDatos() {
    fetch('../data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un error al cargar los datos.');
            }
            return response.json();
        })
        .then(data => encontrarTopRegiones(data))
        .catch(error => console.error(error));
}

function encontrarTopRegiones(datos) {
    var regionesTotales = [];
    datos.forEach(function(item) {
        var totalConfirmados = calcularTotalConfirmados(item.confirmed);
        regionesTotales.push({region: item.region, total: totalConfirmados});
    });

    regionesTotales.sort((a, b) => b.total - a.total);

    var topRegiones = regionesTotales.slice(0, 10);
    var topRegionesLista = document.getElementById('top-regiones');
    topRegiones.forEach(function(item) {
        var tr = document.createElement('tr');
        tr.innerHTML = `<td>${item.region}</td><td>${item.total}</td>`;
        topRegionesLista.appendChild(tr);
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
