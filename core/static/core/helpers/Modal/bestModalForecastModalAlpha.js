function bestModalForecastModal(){
    $("button[button-best-forecast]").on('click',function(){
        var number = best_index_forecast + 4;
        modal_chart_extended(number,0);
    })
}

window.addEventListener("load", bestModalForecastModal, false);