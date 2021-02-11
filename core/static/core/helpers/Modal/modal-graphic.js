var chart,chart_lin,chart_expo,chart_movil,chart_full_modal;

/* CREAR GRAFICA Y ABRIR MODAL CON LA INFORMACION DINAMICA */
function modal_chart(id_modal,id_canvas,target){
    number = parseInt($(target).attr('btn-line-chart'))
    flag = parseInt($(target).attr('btn-flag-chart'))
    // modificar textos y demas
    $("h5.modal-title").html(getTitle($(target).attr('btn-line-chart')))
    $("td.corre").html(getCorrelationVariable(number)+'%')
    var a = $("a[link-post][line-chart]")
    a.attr('line-chart',number)
    a.attr('flag-chart',flag)
    var button = $("button[image-chart]")
    button.attr('image-chart',number);

    // habilitar modal
    $(id_modal).modal('show')
    return createChar(id_canvas, getListLabelVariable(number), getListDataVariable(number),flag ? data_django_last_row : django_list_data_chart_01);
}

/* CREANDO MODAL Y RELLENANDO LAS TABLAS DINAMICAS CON LOS PRONOSTICOS */
function modal_chart_extended(number,flag){
    // habilitar modal
    $('#modalExample').modal('show')
    // crear canvas
    if(chart !== undefined)
        chart.destroy()


    dataGraph = getListDataVariable(number)
    table_insertion_flag = parseInt($("table[forecast-table]").attr('forecast-alpha'));
    if(table_insertion_flag){
        tbody = document.querySelector("table[forecast-table] tbody tr")
        tbody.innerHTML="<td class='text-white font-size-22px-2c bg-dark' language='true'>Pronostico</td>"
        thead = document.querySelector("table[forecast-table] thead tr")
        thead.innerHTML="<th class='text-white font-size-22px-2c bg-dark' fore-title='true'>Indice</th>"
        for(i = 0;i < dataGraph.length;++i){
            tbody.innerHTML += "<td class='font-quicksand bg-light' style='color:#52524e;'>"+dataGraph[i]+"</td>"
            thead.innerHTML += "<td class='font-quicksand bg-light' style='color:#52524e;'>"+(i+1)+"</td>"
        }
    }else{
        tbody = document.querySelector("table[forecast-table] tbody")
        tbody.innerHTML=""
        for(i = 0;i < dataGraph.length;++i)
            tbody.innerHTML += "<tr><td class='font-quicksand' style='color:#52524e;'>"+(i+1)+"</td><td class='font-quicksand' style='color:#52524e;'>"+dataGraph[i]+"</td></tr>"
    }

    $("th[fore-title]").html(forecasts_labels_x)

    chart = createChar('line-chart-20', getListLabelVariable(number), dataGraph , flag ? data_django_last_row : django_list_data_chart_01);
    // modificar textos y demas
    $("h5.modal-title").html(getTitle(number))
    $("#correlation").html(getCorrelationVariable(number)+'%')
    var a = $("a[link-post][line-chart]")
    a.attr('line-chart',number)
    a.attr('flag-chart',flag)
    var button = $("button[image-chart]")
    button.attr('image-chart',number);    
}

/* INICIALIZAR EVENTOS DE BOTONES QUE ACTIVARAN LOS MODALS LLAMANDO LAS FUNCIONES MODAL_CHART() */
function startEventModal(){
    $("button[btn-line-chart]:not([btn-modal-index])").on('click',function(){
        number = parseInt($(this).attr('btn-line-chart'))
        flag = parseInt($(this).attr('btn-flag-chart'))

        modal_chart_extended(number,flag);
    })
    $("button[btn-modal-index='1']").on('click',function(){
        if(chart_lin !== undefined)
            chart_lin.destroy()

        chart_lin = modal_chart('#modal_lin','line-chart-15',this)
    })
    $("button[btn-modal-index='2']").on('click',function(){
        if(chart_expo !== undefined)
            chart_expo.destroy()

        chart_expo = modal_chart('#modal_expo','line-chart-16',this)
    })
    $("button[btn-modal-index='3']").on('click',function(){
        if(chart_movil !== undefined)
            chart_movil.destroy()

        chart_movil = modal_chart('#modal_movil','line-chart-17',this)
    })

    $("div[graph_full_modal]").on('click',function(){
        number = parseInt($(this).attr('graph_full_modal'))
        if(chart_full_modal !== undefined)
            chart_full_modal.destroy()
        switch(number){
            case 1:
                console.log(django_list_labels_chart_01, django_list_data_chart_01)
                //chart_full_modal = createChar('line-chart-30',django_list_labels_chart_01, django_list_data_chart_01)
                chart_full_modal = createCharWithLabel('line-chart-30', django_list_labels_chart_01, django_list_data_chart_01,django_x_label_chart_01)
            break;
            case 2:
                chart_full_modal = new Chart(document.getElementById('line-chart-30').getContext('2d'),getChartConfiguration(django_list_labels_chart_02, django_list_data_chart_02))
            break;
        }
        $('#modalFull').modal('show')
    })
}

function getListLabelVariable(number){
    switch(number){
        case 4:
        return django_list_labels_chart_04
        case 5:
        return django_list_labels_chart_05
        case 6:
        return django_list_labels_chart_06
        case 7:
        return django_list_labels_chart_07
        case 8:
        return django_list_labels_chart_08
        case 9:
        return django_list_labels_chart_09
        case 10:
        return django_list_labels_chart_10
        case 11:
        return django_list_labels_chart_11
        case 12:
        return django_list_labels_chart_12
        case 13:
        return django_list_labels_chart_13
        case 14:
        return django_list_labels_chart_14
        case 15:
        return django_list_labels_chart_15
    }
}
function getListDataVariable(number){
    switch(number){
        case 4:
        return django_list_data_chart_04
        case 5:
        return django_list_data_chart_05
        case 6:
        return django_list_data_chart_06
        case 7:
        return django_list_data_chart_07
        case 8:
        return django_list_data_chart_08
        case 9:
        return django_list_data_chart_09
        case 10:
        return django_list_data_chart_10
        case 11:
        return django_list_data_chart_11
        case 12:
        return django_list_data_chart_12
        case 13:
        return django_list_data_chart_13
        case 14:
        return django_list_data_chart_14
        case 15:
        return django_list_data_chart_15
    }
}

function getCorrelationVariable(number){
    switch(number){
        case 4:
        return lineal_corre
        case 5:
        return expo_corre
        case 6:
        return cuadra_corre
        case 7:
        return movil_2_corre
        case 8:
        return movil_3_corre
        case 9:
        if(typeof movil_composed_corre !== 'undefined')
            return movil_composed_corre
        return simple_soft_corre
        case 10:
        if(typeof movil_pondered_corre !== 'undefined')
            return movil_pondered_corre
        return double_soft_corre
        case 11:
        return simple_soft_corre
        case 12:
        return double_soft_corre
        case 13:
        return winters_corre
        case 14:
        return jenkin_corre
        case 15:
        return simu_corre
    }
}

function getTitle(id){
    var contents = $("span[title-line-chart="+id+"]").contents()
    for(var i = 0; i < contents.length; ++i){
        if(contents[i].nodeType == Node.TEXT_NODE){
            return contents[i].textContent
        }
    }
    return "Undefined"
}


window.addEventListener('load', startEventModal, false)