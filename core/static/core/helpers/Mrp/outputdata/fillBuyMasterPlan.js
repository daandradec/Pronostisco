function fillBuyMasterPlan(){
    const table_master = document.getElementById("master")
    const table_buy = document.getElementById("buy")
    const table_cost = document.getElementById("cost");

    fillHeaderPeriods(table_master);
    fillHeaderPeriods(table_buy);
    fillHeaderPeriods(table_cost);
    
    fillPlan(table_master, table_cost, mrp.producto.title, all_info_mrp_keys[mrp.producto.key]["pla_col_ord"], all_info_mrp_keys[mrp.producto.key]["total_uni_ave"]);
    
    const components = mrp.componentes;
    for(var i = 0; i < components.length; ++i){
        fillPlan(table_master, table_cost, components[i].title, all_info_mrp_keys[components[i].key]["pla_col_ord"], all_info_mrp_keys[components[i].key]["total_uni_ave"])
    }

    const materia = mrp.materia;
    for(var i = 0; i < materia.length; ++i){
        fillPlan(table_buy, table_cost, materia[i].title, all_info_mrp_keys[materia[i].key]["pla_col_ord"], all_info_mrp_keys[materia[i].key]["total_uni_ave"])
    } 
}

function fillPlan(table, table_cost, object_title, data, total_uni_average){
    const new_data = data.slice(-1*periods_state);    
    table.children[1].innerHTML += "<tr><td>"+object_title+"</td>"+displayContentRow(new_data)+"<td>"+formatMoney(new_data.sum())+"</td></tr>";
    const plan_master_cost = new_data.map(function(value){return formatMoney(value*total_uni_average)});
    table_cost.children[1].innerHTML += "<tr><td>"+object_title+"</td>"+displayContentRow(plan_master_cost)+"<td>"+formatMoney(new_data.map(function(value){return value*total_uni_average}).sum())+"</td></tr>";
}

function displayContentRow(data){
    var html = "";
    for(var i = 0; i < data.length; ++i)
        html += "<td>"+data[i]+"</td>";
    return html;
}




function fillHeaderPeriods(table){
    const label = getCurrentLanguage() == 'ES' ? "Periodos" : "Periods";
    table.children[0].innerHTML = "<tr><th>"+label+"</th>"+displayContentRowH(headers_periods)+"<th>Total</th></tr>"
}

function displayContentRowH(data){
    var html = "";
    for(var i = 0; i < data.length; ++i)
        html += "<th>"+data[i]+"</th>";
    return html;
}