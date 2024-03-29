function fillBodyMrpTable(table, table_averages, object, index){
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
    invent[lead <= 1 ? 0 : lead-1] = tables.t_general[index][2];
    
    const req_net = [0];
    const pla_rec_ord = [0];
    const limit = invent.length;
    
    for(var i = 1; i < limit; ++i){

        const formul_req_net = req_brut[i] + stock[i] - recep_prog[i] - stock[i - 1] - invent[i - 1];
        req_net.push(formul_req_net > 0 ? formul_req_net : 0);

        const formul_pla_rec_ord = Q !== 0 ? Math.ceil(req_net[i] / Q) * Q : 0;
        pla_rec_ord.push(formul_pla_rec_ord);

        if(i >= lead){
            const formul_invent = formul_pla_rec_ord + invent[i - 1] + recep_prog[i] + stock[i - 1] - stock[i] - req_brut[i];
            invent[i] = formul_invent;
        }        
    }

    fillRowWithData(tr_list[4], invent);  
    fillRowWithData(tr_list[6], req_net);  
    fillRowWithData(tr_list[7], pla_rec_ord);  
    const sum_invent = invent.slice(-1*periods_state).sum();
    const sum_stock = stock.sum();
    tr_list[3].innerHTML += (getCurrentLanguage() === 'ES' ? '<td total="true">Totales</td>' : '<td total="true">Totals</td>') ;
    tr_list[4].innerHTML += "<td>"+sum_invent+"</td>";
    tr_list[5].innerHTML += "<td>"+sum_stock+"</td>";


    /* PLAN COLOCAR ORDENES */
    const pla_col_ord = [];

    for(var i = 0; i < pla_rec_ord.length; ++i){
        const val_pla_col_ord = (i + lead) < pla_rec_ord.length ? pla_rec_ord[i + lead] : 0;
        pla_col_ord.push(val_pla_col_ord)        
    }
    fillRowWithData(tr_list[8], pla_col_ord);  
    const sum_pla_col_ord = pla_col_ord.sum();
    tr_list[8].innerHTML += "<td>"+sum_pla_col_ord+"</td>"

    /* COSTO ORDENAR EL PRODUCTO */
    const cost_ord_prod = [];
    for(var i = 0; i < pla_col_ord.length; ++i){
        if(pla_col_ord[i] > 0)
            cost_ord_prod.push(tables.t_general[index][6]);
        else
            cost_ord_prod.push(0);
    }
    fillRowWithMoneyData(tr_list[9], cost_ord_prod);
    tr_list[9].innerHTML += "<td>$ "+formatMoney(cost_ord_prod.slice(-1*periods_state).sum())+"</td>"

    /* COSTO M/TO INV */
    const cost_m_inv = invent.map(function(value, index_map){ return (value+stock[index_map])*tables.t_general[index][5]});    
    fillRowWithMoneyData(tr_list[10], cost_m_inv);
    tr_list[10].innerHTML += "<td>$ "+formatMoney(cost_m_inv.slice(-1*periods_state).sum())+"</td>"

    /* COSTO DE LA COMPRA */
    const cost_compr = pla_col_ord.map(function(value){ return value*tables.t_general[index][4]});
    fillRowWithMoneyData(tr_list[11], cost_compr);
    tr_list[11].innerHTML += "<td>$ "+formatMoney(cost_compr.slice(-1*periods_state).sum())+"</td>"   

    /* COSTO TOTAL */
    const cost_total = cost_compr.map(function(value, index){return value + cost_m_inv[index] + cost_ord_prod[index]});
    fillRowWithMoneyData(tr_list[12], cost_total);
    tr_list[12].innerHTML += "<td>$ "+formatMoney(cost_total.slice(-1*periods_state).sum())+"</td>"

    /* PROMEDIOS UNITARIOS */
    const uni_per_compr = cost_ord_prod.sum() / (sum_pla_col_ord === 0 ? 1 : sum_pla_col_ord);
    const uni_per_mant = cost_m_inv.sum() / (sum_invent + sum_stock === 0 ? 1 : (sum_invent + sum_stock));
    const uni_per_setup = cost_compr.sum() / (sum_pla_col_ord === 0 ? 1 : sum_pla_col_ord);
    const total_uni_ave = uni_per_compr + uni_per_mant + uni_per_setup;
    const tr_ave_list = table_averages.children[1].children;

    tr_ave_list[0].children[1].innerHTML = "$"+formatMoney(uni_per_compr);
    tr_ave_list[1].children[1].innerHTML = "$"+formatMoney(uni_per_mant);
    tr_ave_list[2].children[1].innerHTML = "$"+formatMoney(uni_per_setup);
    tr_ave_list[3].children[1].innerHTML = "$"+formatMoney(total_uni_ave);



    all_info_mrp_keys[object.key] = {     
        req_brut: req_brut,
        recep_prog: recep_prog,           
        invent: invent,
        total_invent: invent.sum(),
        stock: stock,
        total_stock: stock.sum(),
        req_net: req_net,
        pla_rec_ord: pla_rec_ord,
        pla_col_ord: pla_col_ord,
        total_pla_col_ord: pla_col_ord.sum(),
        cost_ord_prod: cost_ord_prod,
        total_cost_ord_prod: cost_ord_prod.sum(),
        cost_m_inv: cost_m_inv,
        total_cost_m_inv: cost_m_inv.sum(),
        cost_compr: cost_compr,
        total_cost_compr: cost_compr.sum(),
        cost_total: cost_total,
        total_cost_total: cost_total.sum(),
        uni_per_compr: uni_per_compr,
        uni_per_mant: uni_per_mant,
        uni_per_setup: uni_per_setup,
        total_uni_ave: total_uni_ave,
        labels: labels
    }; 

    forecast_keys[object.key] = pla_col_ord;
}