function bestModalForecastModal(){
    $("button[button-best-forecast]").on('click',function(){
        var number = 6 - best_index_forecast + 4
        switch(number){
            case 4:
                if(chart_lin !== undefined){chart_lin.destroy()}
                chart_lin = modal_chart('#modal_lin','line-chart-15',this)
            break;
            case 5:
                if(chart_expo !== undefined){chart_expo.destroy()}                        
                chart_expo = modal_chart('#modal_expo','line-chart-16',this)                
            break;
            case 7:
                if(chart_movil !== undefined){chart_movil.destroy()}
                chart_movil = modal_chart('#modal_movil','line-chart-17',this)                
            break;

            case 9:
                modal_chart_extended(number,1);                
            break;
            case 10:
                modal_chart_extended(number,1);
            break;

            default:
                modal_chart_extended(number,0);
            break;
        }
    })
}

window.addEventListener("load", bestModalForecastModal, false);