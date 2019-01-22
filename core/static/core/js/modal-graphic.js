var chart,chart_lin,chart_expo,chart_movil;

function modal_chart(id_modal,id_canvas,target){
    number = parseInt($(target).attr('btn-line-chart'))
    flag = parseInt($(target).attr('btn-flag-chart'))
    // modificar textos y demas
    $("h5.modal-title").html(getTitle($(target).attr('btn-line-chart')))
    $("td.corre").html(getCorrelationVariable(number))
    var a = $("a[link-post][line-chart]")
    a.attr('line-chart',$(target).attr('btn-line-chart'))
    a.attr('flag-chart',$(target).attr('btn-flag-chart'))
    // habilitar modal
    $(id_modal).modal('show')
    return createChar(id_canvas, getListLabelVariable(number), getListDataVariable(number),flag ? data_django_last_row : django_list_data_chart_01);
}

function startEventModal(){
    $("button[btn-line-chart]:not([btn-modal-index])").on('click',function(){
        number = parseInt($(this).attr('btn-line-chart'))
        flag = parseInt($(this).attr('btn-flag-chart'))

        // habilitar modal
        $('#modalExample').modal('show')
        // crear canvas
        if(chart !== undefined)
            chart.destroy()
        
        chart = createChar('line-chart-14', getListLabelVariable(number), getListDataVariable(number),flag ? data_django_last_row : django_list_data_chart_01);
        // modificar textos y demas
        $("h5.modal-title").html(getTitle($(this).attr('btn-line-chart')))
        $("#correlation").html(getCorrelationVariable(number))
        var a = $("a[link-post][line-chart]")
        a.attr('line-chart',$(this).attr('btn-line-chart'))
        a.attr('flag-chart',$(this).attr('btn-flag-chart'))
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
}
/*
function enableModal(modalIndex){
    switch(modalIndex){
        case 0:
            $('#modalExample').modal('show')
            break;
        case 1:
            $('#modal_lin').modal('show')   
            break;
        case 2:
            $('#modalExample').modal('show')
            break;
        case 3:
            $('#modalExample').modal('show')
            break;
        
    }
}*/
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
        return simple_soft_corre
        case 10:
        return double_soft_corre
        case 11:
        return winters_corre
        case 12:
        return jenkin_corre
        case 13:
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