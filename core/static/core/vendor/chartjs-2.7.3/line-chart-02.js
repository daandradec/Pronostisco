var chart2;

window.addEventListener("load",createChar02,false);
window.chartColorsList = [window.chartColors.red,window.chartColors.orange,window.chartColors.yellow,
	window.chartColors.green,window.chartColors.blue,window.chartColors.purple,window.chartColors.grey]

function createChar02(){
	var canvas = document.getElementById('line-chart-02').getContext('2d');
	chart2 = new Chart(canvas,getChartConfiguration(django_list_labels_chart_02, django_list_data_chart_02))
}

function getChartConfiguration(labels,data){

	var config = {
		type: 'line',
		    data: {
		        labels: labels,
		        datasets: []
		    },
		    options: {
		    	responsive: true,
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true,		                    
		                },
		                scaleLabel: {
		                	display: true,
		                	labelString:tag_graphics,
		                	fontSize: 16,
		                }
		            }],
		            xAxes: [{
		                scaleLabel: {
		                	display: true,
		                	labelString:django_x_label_chart_02,
		                	fontSize: 16,
		                }
		            }]
		        },
				tooltips: {
            		mode: 'nearest'
        		},
		        hover: {
					mode: 'nearest',
					intersect: true
				},
				elements: {
					point: {
						pointStyle: 'rectRot'
					}
				},			
		    }
		}
	var singular_label_chart_02 = django_x_label_chart_02.substring(0, django_x_label_chart_02.length-1)+" ";
	for(var i = 0;i < data.length; ++i){
		config.data.datasets.push(
			{
				label: singular_label_chart_02 + (i+1)+" "+(getCurrentLanguage() == 'ES' ? 'Datos Historicos': 'Historic Data'),
				backgroundColor: window.chartColorsList[i],
				borderColor: window.chartColorsList[i],
				pointRadius: 7,
				pointHoverRadius: 10,
				fill: false,
				data: data[i],
			}
		);
	}
	return config;	
}