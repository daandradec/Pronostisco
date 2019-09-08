var labels_periods = ["Mes/Semana","Semana/Dia","Año/Mes"];
var headers_periods = [
    ["Semana 1", "Semana 2","Semana 3", "Semana 4"],
    ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"],
    ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
];
const td = "<td></td>";
const forecast_keys = {};
const all_info_mrp_keys = {};
var deficit = 0;

function fillDinamicMrpTables(){    
    const div_product_table_zone = document.querySelector("div[mrp-index='0']");
    fillDinamicMrpTable(div_product_table_zone, mrp.producto, 0)

    var new_counter = 1;
    const components = mrp.componentes;
    for(var i = 0; i < components.length; ++i){
        const div_compo_table_zone = document.querySelector("div[mrp-index='"+new_counter+"']");
        fillDinamicMrpTable(div_compo_table_zone, components[i], new_counter)
        ++new_counter;
    }

    const materia = mrp.materia;
    for(var i = 0; i < materia.length; ++i){
        const div_mater_table_zone = document.querySelector("div[mrp-index='"+new_counter+"']");
        fillDinamicMrpTable(div_mater_table_zone, materia[i], new_counter)
        ++new_counter;
    }
}

function fillDinamicMrpTable(div_table_zone, object, index){
    const tables = div_table_zone.children[0].children;        
    fillDemandTable(tables[1], object, index);
    fillBodyMrpTable(tables[1], object, index);
    fillHeadTable(tables[0], object, index);
}

/* HEAD TABLE */
function fillHeadTable(table, object, index){    
    const tr = table.children[0].children[0];
    const t_general = tables.t_general[index];
    var amount = "1", Q = t_general[3], lead = t_general[0];
    if(object.hasOwnProperty("edges"))
        amount = getAmount(object);
    
    const data = all_info_mrp_keys[object.key].pla_rec_ord; 
    leadFunction(countDeficit, index, data);   
    tr.children[1].innerHTML = amount;
    tr.children[3].innerHTML = Q;
    tr.children[5].innerHTML = lead;
    tr.children[7].innerHTML = deficit;
}

function getAmount(object){
    const keys = object.edges;
    var accumulated = 0;
    for(var i = 0; i < keys.length; ++i)
        accumulated += object.amount[keys[i]];
    return accumulated
}



/* FORECAST DEMAND TABLE */
function fillDemandTable(table, object, index){
    const tr_list = table.children[0].children;

    const labels = Array.from(headers_periods[periods_state]);    
    labels.unshift(headers_periods[periods_state][labels.length-1]);
    labels.unshift(labels_periods[periods_state]);
    leadFunction(leadLabels, index, labels);
    fillRowWithData(tr_list[0], labels);

    const forecast = Array.from(tables.t_forecast);
    forecast.unshift(0);
    leadFunction(leadForecast, index, forecast);  

    if(!object.hasOwnProperty("edges")){    
        forecast_keys[object.key] = forecast;     
        fillRowWithData(tr_list[1], forecast);
    }else{
        const keys_edges = object.edges;
        var requeriment_list = forecast.map(function(){return 0;});
        for(var i = 0; i < keys_edges.length; ++i){
            const key = keys_edges[i];
            if(forecast_keys.hasOwnProperty(key)){
                const parent_list = forecast_keys[key];
                requeriment_list = parent_list.map(function(value, index){return requeriment_list[index] + value*object.amount[key];})
            }else
                requeriment_list = forecast.map(function(value, index){return requeriment_list[index] + value;})
        }
        forecast_keys[object.key] = requeriment_list; 
        fillRowWithData(tr_list[1], requeriment_list);        
    }    
}

function fillRowWithData(tr, data){
    for(var i = 0;i < data.length; ++i)
        tr.innerHTML += "<td>"+data[i]+"</td>";
}

function fillRowWithMoneyData(tr, data){
    for(var i = 0;i < data.length; ++i)
        tr.innerHTML += "<td>$ "+data[i]+"</td>";
}

/* LEAD FUNCTIONS */
function leadFunction(leadCallback, index, payload){
    if(leadFlag)
        leadCallback(index, payload);
}

function leadLabels(index, labels){
    const info_labels = headers_periods[periods_state];
    var index_label = info_labels.length - 2;
    const lead = tables.t_general[index][0];
    for(var i = 0;i < lead; ++i){
        labels.splice(1, 0 , info_labels[index_label]);
        --index_label;
        if(index_label < 0)
            index_label += info_labels.length;
    }
}

function leadForecast(index, forecast){
    const lead = tables.t_general[index][0];
    for(var i = 0;i < lead; ++i)
        forecast.unshift(0);    
}

function countDeficit(index, list){
    var lead = tables.t_general[index][0];
    deficit = 0;
    for(var i = lead + 1;i < list.length; ++i){
        if(lead <= 0)
            break;
        deficit += list[i]
        --lead;
    }
}
/*
    prod_0: [5,6,8,9,990]
*/