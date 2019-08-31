var chart1,chart3,chart4,chart5,chart6,chart7,chart8,chart9,chart10,chart11,chart12,chart13,chart14,chart15;

function createChars(){
    chart1 = createCharWithLabel('line-chart-01', django_list_labels_chart_01, django_list_data_chart_01,django_x_label_chart_01);
    chart3 = createChar('line-chart-03', django_list_labels_chart_03, django_list_data_chart_03,data_django_last_row);
    $("span[best_corre]").html(best_corre+'%')
    chart4 = createChar('line-chart-04', django_list_labels_chart_04, django_list_data_chart_04,data_django_last_row);
    chart5 = createChar('line-chart-05', django_list_labels_chart_05, django_list_data_chart_05,data_django_last_row);
    chart6 = createChar('line-chart-06', django_list_labels_chart_06, django_list_data_chart_06,data_django_last_row);
    chart7 = createChar('line-chart-07', django_list_labels_chart_07, django_list_data_chart_07,data_django_last_row);
    chart8 = createChar('line-chart-08', django_list_labels_chart_08, django_list_data_chart_08,data_django_last_row);
    chart9 = createChar('line-chart-09', django_list_labels_chart_09, django_list_data_chart_09,data_django_last_row);
    chart10 = createChar('line-chart-10', django_list_labels_chart_10, django_list_data_chart_10,data_django_last_row);
    chart11 = createChar('line-chart-11', django_list_labels_chart_11, django_list_data_chart_11,data_django_last_row);
    chart12 = createChar('line-chart-12', django_list_labels_chart_12, django_list_data_chart_12,data_django_last_row);
    chart13 = createChar('line-chart-13', django_list_labels_chart_13, django_list_data_chart_13,data_django_last_row);
    chart14 = createChar('line-chart-14', django_list_labels_chart_14, django_list_data_chart_14,data_django_last_row);
    chart15 = createChar('line-chart-15', django_list_labels_chart_15, django_list_data_chart_15,data_django_last_row);                        
}

window.addEventListener("load",createChars,false);