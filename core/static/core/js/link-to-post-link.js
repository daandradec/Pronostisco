
function linkStart(){
    /*
    $("a[link-post='true']:not(.disabled)").each(function(){
        $(this).on('click',function(e){
            e.preventDefault();
            if(typeof data_request_django === 'undefined')
                return;
            post($(this).attr("href"),{content: data_request_django});
        })
    })
    */
   $("a[link-post='true']").each(function(){
    $(this).on('click',function(e){
        e.preventDefault();
        // leer el numero, segun el caso retornar el dataset del pronostico n, contra lo que se compara, y la correlacion
        //console.log( getListDataVariable() )
        number = parseInt( $(this).attr('line-chart'))
        flag = parseInt($(this).attr('flag-chart'))
        postNewTab($(this).attr("href"),{content: getListDataVariable(number),compare : flag ? data_django_last_row : django_list_data_chart_01, corre : getCorrelationVariable(number).toString(), period: django_x_label_chart_03, yearlabel: year_label, pronolabel : prono_label, correlabel : corre_label });
    })
})
}

window.addEventListener("load",linkStart,false);