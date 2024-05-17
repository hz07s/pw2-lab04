// Cargar el gráfico cuando se cargue la API de Google Charts
google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  fetch('../data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un error al cargar los datos.');
      }
      return response.json();
    })
    .then(data => {
      var regionSelect = document.getElementById('region-select');
      var regions = data.map(region => region.region);
      regions.forEach(region => {
        var option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
      });

      function updateChart() {
        var selectedRegions = Array.from(regionSelect.selectedOptions).map(option => option.value);
        var filteredData = data.filter(region => selectedRegions.includes(region.region));

        var chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Fecha');

        filteredData.forEach(region => {
          chartData.addColumn('number', region.region);
        });

        var dates = [];
        filteredData[0].confirmed.forEach(item => {
          dates.push(item.date);
        });
        chartData.addRows(dates.length);

        filteredData.forEach((region, index) => {
          chartData.setColumnLabel(index + 1, region.region);
          region.confirmed.forEach((item, i) => {
            chartData.setValue(i, index + 1, parseInt(item.value));
          });
        });

        var options = {
          title: 'Gráfico Comparativo de Confirmados por Región',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(chartData, options);
      }

      regionSelect.addEventListener('change', updateChart);
      updateChart();
    })
    .catch(error => console.error(error));
}
