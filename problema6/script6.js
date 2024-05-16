google.charts.load('current', {'packages':['corechart']});
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
      var filteredData = data.filter(region => region.region !== "Lima" && region.region !== "Callao");

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
        title: 'Comparativo de Confirmados por Región (Excluyendo Lima y Callao)',
        curveType: 'function',
        legend: { position: 'bottom' }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(chartData, options);
    })
    .catch(error => console.error(error));
}
