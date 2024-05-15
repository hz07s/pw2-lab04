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
      var arequipaData = data.find(item => item.region === "Arequipa");
      var confirmedData = [['Fecha', 'Confirmados']];
      arequipaData.confirmed.forEach(item => {
        confirmedData.push([item.date, parseInt(item.value)]);
      });

      var chartData = google.visualization.arrayToDataTable(confirmedData);

      var options = {
        title: 'Confirmados en Arequipa',
        curveType: 'function',
        legend: { position: 'bottom' }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(chartData, options);
    })
    .catch(error => console.error(error));
}
