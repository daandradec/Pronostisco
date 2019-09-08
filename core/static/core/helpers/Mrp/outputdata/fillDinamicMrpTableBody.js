function fillBodyMrpTable(table, object, index){
    const tr_list = table.children[0].children;
    const lead = tables.t_general[index][0];
    const Q = tables.t_general[index][3];

    /* REQUERIMIENTO BRUTO */    
    const req_brut = forecast_keys[object.key];        
    fillRowWithData(tr_list[2], req_brut);

    /* RECEPCIONES PROGRAMADAS */
    const recep_prog = Array.from(tables.t_receptions[index]);
    recep_prog.unshift(0);
    leadFunction(leadForecast, index, recep_prog);
    fillRowWithData(tr_list[3], recep_prog);    

    /* STOCK DE SEGURIDAD */
    const stock = tables.t_forecast.map(function(){ return tables.t_general[index][1]});    
    stock.unshift(0);
    leadFunction(leadForecast, index, stock);
    fillRowWithData(tr_list[5], stock);  

    /* INVENTARIO - REQUERIMIENTO NETO - PLAN RECIBIR ORDENES */
    const invent = req_brut.map(function(){ return 0; });
    invent[lead] = tables.t_general[index][2];
    
    const req_net = [0];
    const pla_rec_ord = [0];
    const limit = invent.length;
    
    for(var i = 1; i < limit; ++i){

        const formul_req_net = req_brut[i] + stock[i] - recep_prog[i] - stock[i - 1] - invent[i - 1];
        req_net.push(formul_req_net > 0 ? formul_req_net : 0);

        const formul_pla_rec_ord = Q !== 0 ? Math.ceil(req_net[i] / Q) * Q : 0;
        pla_rec_ord.push(formul_pla_rec_ord);

        if(i > lead){
            const formul_invent = formul_pla_rec_ord + invent[i - 1] + recep_prog[i] + stock[i - 1] - stock[i] - req_brut[i];
            invent[i] = formul_invent;
        }        
    }

    fillRowWithData(tr_list[4], invent);  
    fillRowWithData(tr_list[6], req_net);  
    fillRowWithData(tr_list[7], pla_rec_ord);  
    tr_list[3].innerHTML += '<td total="true">Totales</td>';
    tr_list[4].innerHTML += "<td>"+invent.sum()+"</td>";
    tr_list[5].innerHTML += "<td>"+stock.sum()+"</td>";


    /* PLAN COLOCAR ORDENES */
    const pla_col_ord = [];

    for(var i = 0; i < pla_rec_ord.length; ++i){
        const val_pla_col_ord = (i + lead) < pla_rec_ord.length ? pla_rec_ord[i + lead] : 0;
        pla_col_ord.push(val_pla_col_ord)        
    }
    fillRowWithData(tr_list[8], pla_col_ord);  
    tr_list[8].innerHTML += "<td>"+pla_col_ord.sum()+"</td>"

    /* COSTO ORDENAR EL PRODUCTO */
    const cost_ord_prod = tables.t_forecast.map(function(){ return tables.t_general[index][6]});    
    cost_ord_prod.unshift(0);
    leadFunction(leadForecast, index, cost_ord_prod);
    fillRowWithMoneyData(tr_list[9], cost_ord_prod);
    tr_list[9].innerHTML += "<td>$ "+cost_ord_prod.sum()+"</td>"

    /* COSTO M/TO INV */
    const cost_m_inv = tables.t_forecast.map(function(value, index_map){ return (invent[index_map + lead + 1]+stock[index_map + lead + 1])*tables.t_general[index][5]});    
    cost_m_inv.unshift(0);
    leadFunction(leadForecast, index, cost_m_inv);
    fillRowWithMoneyData(tr_list[10], cost_m_inv);
    tr_list[10].innerHTML += "<td>$ "+cost_m_inv.sum()+"</td>"

    /* COSTO DE LA COMPRA */
    const cost_compr = pla_col_ord.map(function(value){ return value*tables.t_general[index][4]});
    fillRowWithMoneyData(tr_list[11], cost_compr);
    tr_list[11].innerHTML += "<td>$ "+cost_compr.sum()+"</td>"   

    /* COSTO TOTAL */
    const cost_total = cost_compr.map(function(value, index){return value + cost_m_inv[index] + cost_ord_prod[index]});
    fillRowWithMoneyData(tr_list[12], cost_total);
    tr_list[12].innerHTML += "<td>$ "+cost_total.sum()+"</td>"

    all_info_mrp_keys[object.key] = {     
        req_brut: req_brut,
        recep_prog: recep_prog,           
        invent: invent,
        stock: stock,
        req_net: req_net,
        pla_rec_ord: pla_rec_ord,
        pla_col_ord: pla_col_ord,
        cost_ord_prod: cost_ord_prod,
        cost_m_inv: cost_m_inv,
        cost_compr: cost_compr,
        cost_total: cost_total
    }; 

    forecast_keys[object.key] = pla_col_ord;
}