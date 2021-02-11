window.addEventListener("load",createCharX,false);

function createCharX(){
	var canvas = document.getElementById('line-chart-01').getContext('2d');
	var chart = new Chart(canvas,getChartConfigurationOne(django_list_labels_chart_01,
		django_list_data_chart_01))
}

function getChartConfigurationOne(labels,data){
	return {
		type: 'line',

		    data: {
		        labels: labels,
		        datasets: [
			        {
			            label: "Dinero",
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
		                	labelString:'PESOS',
		                	fontSize: 16,
		                }
		            }],
		            xAxes: [{
		                scaleLabel: {
		                	display: true,
		                	labelString:django_x_label_chart_01,
		                	fontSize: 16,
		                }
		            }]
		        },
		        legend: {
						display: false
				},
		        
		    }
	}
}