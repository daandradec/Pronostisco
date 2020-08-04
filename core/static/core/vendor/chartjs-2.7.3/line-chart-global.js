function createChar(id, labels, data,data_django_last_row){
	var canvas = document.getElementById(id).getContext('2d');
	var chart = new Chart(canvas,getChartConfigurationX(labels,
		data,data_django_last_row))
	return chart
}

function getChartConfigurationX(labels,data,data_django_last_row){
	return {
		type: 'line',

		    data: {
		        labels: labels,
		        datasets: [
			        {
			            label: getCurrentLanguage() == 'ES' ? 'Pronóstico': 'Forecast',
			            backgroundColor: window.chartColors.green,
						borderColor: window.chartColors.green,
						pointRadius: 5,
						pointHoverRadius: 8,
			            fill: false,
			            data: data,
					},
					{
						label: year_label,
						backgroundColor: window.chartColors.red,
						borderColor: window.chartColors.red,
						pointRadius: 4,
						pointHoverRadius: 8,
						fill:false,
						data: data_django_last_row,
					}
		        ]
		    },
		    options: {
		    	responsive: true,
		        scales: {
		            yAxes: [{		                
		                scaleLabel: {
		                	display: true,
		                	labelString: tag_graphics,
		                	fontSize: 16,
		                }
		            }],
		            xAxes: [{
		                scaleLabel: {
		                	display: true,
		                	labelString:django_x_label_chart_03,
		                	fontSize: 16,
		                }
		            }]
				},/*
		        legend: {
						display: false
				},*/
		        hover: {
					mode: 'nearest',
					intersect: true
				},
		    }
	}
}

function createCharWithLabel(id, labels, data,x_label){
	var canvas = document.getElementById(id).getContext('2d');
	var chart = new Chart(canvas,getChartConfigurationZ(labels,
		data,x_label))
	return chart
}

function getChartConfigurationZ(labels,data,x_label){
	return {
		type: 'line',

		    data: {
		        labels: labels,
		        datasets: [
			        {
			            label: getCurrentLanguage() == 'ES' ? 'Datos Historicos': 'Historic Data',
			            backgroundColor: window.chartColors.green,
						borderColor: window.chartColors.green,
						pointRadius: 5,
						pointHoverRadius: 8,
			            fill: false,
			            data: data,
			        }
		        ]
		    },
		    options: {
		    	responsive: true,
		        scales: {
		            yAxes: [{		                
		                scaleLabel: {
		                	display: true,
		                	labelString: tag_graphics,
		                	fontSize: 16,
		                }
		            }],
		            xAxes: [{
		                scaleLabel: {
		                	display: true,
		                	labelString:x_label,
		                	fontSize: 16,
		                }
		            }]
				},/*
		        legend: {
						display: false
				},*/
		    }
	}
}