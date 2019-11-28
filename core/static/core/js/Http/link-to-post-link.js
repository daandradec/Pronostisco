/* FUNCION PARA INICIALIZAR LINKS QUE REALIZAN PETICIONES POSTS */
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
   /* REALIZANDO LA PETICION PERO EN UNA NUEVA PESTAÑA DEL NAVEGADOR */
   $("a[link-post='true']").each(function(){
        $(this).on('click',function(e){
            e.preventDefault();
            // leer el numero, segun el caso retornar el dataset del pronostico n, contra lo que se compara, y la correlacion
            number = parseInt( $(this).attr('line-chart'))
            flag = parseInt($(this).attr('flag-chart'))
            postNewTab($(this).attr("href"),{content: getListDataVariable(number),compare : flag ? data_django_last_row : django_list_data_chart_01, corre : getCorrelationVariable(number).toString(), period: django_x_label_chart_03, yearlabel: year_label, pronolabel : prono_label, correlabel : corre_label });
        })
    })

    $("a[link-mrp-all='true']").each(function(){
        $(this).on('click',function(e){
            e.preventDefault();            
            console.log({all_info_mrp_keys: all_info_mrp_keys})
            postNewTab($(this).attr("href"),{all_info_mrp_keys: JSON.stringify(all_info_mrp_keys)});
        })
    })
}

window.addEventListener("load",linkStart,false);