function fillBuyMasterPlan(){
    const table_master = document.getElementById("master")
    const table_buy = document.getElementById("buy")

    fillHeaderPeriods(table_master);
    fillHeaderPeriods(table_buy);

    fillPlan(table_master, mrp.producto.title, 0, all_info_mrp_keys[mrp.producto.key]["pla_col_ord"]);
    var new_counter = 1;

    const components = mrp.componentes;
    for(var i = 0; i < components.length; ++i){
        fillPlan(table_master, components[i].title, new_counter, all_info_mrp_keys[components[i].key]["pla_col_ord"])
        ++new_counter;
    }

    const materia = mrp.materia;
    for(var i = 0; i < materia.length; ++i){
        fillPlan(table_buy, materia[i].title, new_counter, all_info_mrp_keys[materia[i].key]["pla_col_ord"])
        ++new_counter;
    }    
}

function fillPlan(table, object_title, index, data){
    const lead = tables.t_general[index][0];    
    const new_data = data.slice(lead+1);    
    table.children[1].innerHTML += "<tr><td>"+object_title+"</td>"+displayContentRow(new_data)+"<tr>";
}

function displayContentRow(data){
    var html = "";
    for(var i = 0; i < data.length; ++i)
        html += "<td>"+data[i]+"</td>";
    return html;
}




function fillHeaderPeriods(table){
    table.children[0].innerHTML = "<tr><th>"+labels_periods[periods_state]+"</th>"+displayContentRowH(headers_periods[periods_state])+"</tr>"
}

function displayContentRowH(data){
    var html = "";
    for(var i = 0; i < data.length; ++i)
        html += "<th>"+data[i]+"</th>";
    return html;
}