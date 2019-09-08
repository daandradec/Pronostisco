var labels_periods = ["Mes/Semana","Semana/Dia","Año/Mes"];
var headers_periods = [
    ["Semana 1", "Semana 2","Semana 3", "Semana 4"],
    ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"],
    ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
]; 
const td = "<td></td>";
var table_values = [];

var flagGeneralTable = true; /* para ejecutar una sola vez */

function tabsTables(index){    
    for(var i = 0;i < labels_periods.length; ++i){        
        const tables = document.querySelectorAll("table[period-index='"+i+"']");        
        if(i === index)
            $(tables).removeClass("d-none");
        else
            $(tables).addClass("d-none");
    }    
}

function fillTableRowsByCurrentPeriod(){
    const tables = document.querySelectorAll("table[table-excel]");  
    alterRespectiveTable(tables[0], 0, 0);
    alterRespectiveTable(tables[1], 0, 1);
    alterRespectiveTable(tables[2], 0, 2);
    alterRespectiveTable(tables[3], 1, 0);
    alterRespectiveTable(tables[4], 2, 0);
    alterRespectiveTable(tables[5], 2, 1);
    alterRespectiveTable(tables[6], 2, 2);        
    awake();
}

function alterRespectiveTable(table, table_index, index){    
    switch(table_index){
        case 0:
            table.children[0].innerHTML = "<tr><th>"+labels_periods[index]+"</th>"+generateTHPeriod(index)+"</tr>";
            table.children[1].innerHTML = "<tr><td>Demanda</td>"+td.repeat(generateNumberOfPeriod(index))+"</tr>";
            break;
        case 1:
            if(flagGeneralTable){
                table.children[0].innerHTML = "<tr><th>Mrp Tree</th><th>Lead Time <input type='checkbox' id='toggle-lead' checked data-toggle='toggle' data-width='40' data-height='25' data-style='bootstrap-toggle-mrp'></th>"+
                                              "<th>Stock de Seguridad <input type='checkbox' id='toggle-stock' checked data-toggle='toggle' data-width='40' data-height='25' data-style='bootstrap-toggle-mrp'></th><th>Inventario Inicial</th>"+
                                              "<th>Q* <input type='checkbox' id='toggle-q' checked data-toggle='toggle' data-width='40' data-height='25' data-style='bootstrap-toggle-mrp'></th><th>Costo Unitario</th><th>Costo de Mantenimiento</th><th>Costo de ordenar</th></tr>";
                $('#toggle-lead').bootstrapToggle();
                $("#toggle-lead").change(toggleMasterEvent);
                $('#toggle-stock').bootstrapToggle();
                $("#toggle-stock").change(toggleMasterEventStock);
                $('#toggle-q').bootstrapToggle();
                $("#toggle-q").change(toggleMasterEventQStar);                                
                flagGeneralTable = false;
            }
            fillRemainingTable(table, 7);                            
            break;
        case 2:
            table.children[0].innerHTML = "<tr><th>Mrp Tree</th>"+generateTHPeriod(index)+"</tr>";
            fillRemainingTable(table, generateNumberOfPeriod(index));            
            break;
    }
}

function fillRemainingTable(table, replays){

    /* PRIMERA FILA DEL PRODUCTO */
    const save_stated = table_values.length ? table_values.shift() : undefined;            

    if(save_stated !== undefined)
        table.children[1].innerHTML = "<tr producto='true'><td>"+state.producto.title+"</td>"+save_stated[0]+"</tr>";
    else
        table.children[1].innerHTML = "<tr producto='true'><td>"+state.producto.title+"</td>"+td.repeat(replays)+"</tr>";

    /* FILAS DE LOS COMPONENTES */
    const save_stated_compo = table_values.length ? table_values.shift() : undefined;            

    for(var i = 0; i < state.componentes.length; ++i){
        if(save_stated_compo !== undefined && save_stated_compo.hasOwnProperty(state.componentes[i].id)){
            table.children[1].innerHTML += "<tr componente_id='"+state.componentes[i].id+"'><td>"+state.componentes[i].title+"</td>"+save_stated_compo[state.componentes[i].id]+"</tr>";
        }else
            table.children[1].innerHTML += "<tr componente_id='"+state.componentes[i].id+"'><td>"+state.componentes[i].title+"</td>"+td.repeat(replays)+"</tr>";
    }
    
    /* FILAS DE LAS MATERIAS */
    const save_stated_mater = table_values.length ? table_values.shift() : undefined;    

    for(var i = 0; i < state.materia.length; ++i){
        if(save_stated_mater !== undefined && save_stated_mater.hasOwnProperty(state.materia[i].id))
            table.children[1].innerHTML += "<tr materia_id='"+state.materia[i].id+"'><td>"+state.materia[i].title+"</td>"+save_stated_mater[state.materia[i].id]+"</tr>";
        else 
            table.children[1].innerHTML += "<tr materia_id='"+state.materia[i].id+"'><td>"+state.materia[i].title+"</td>"+td.repeat(replays)+"</tr>";
    }        
}

function seeChangeStateMRPToTable(){
    const tables = document.querySelectorAll("table[table-excel]");
    saveStateTableAndReFill(tables[3], 1, 0);
    saveStateTableAndReFill(tables[4], 2, 0);
    saveStateTableAndReFill(tables[5], 2, 1);
    saveStateTableAndReFill(tables[6], 2, 2);
    awake();
    changeStatusColDisabled($(tables[3].children[1]).find("tr td:nth-child(2)"), toggleFlagLead);
    changeStatusColDisabled($(tables[3].children[1]).find("tr td:nth-child(3)"), toggleFlagStock);
    changeStatusColDisabled($(tables[3].children[1]).find("tr td:nth-child(5)"), toggleFlagQstar);
}

function saveStateTableAndReFill(table, table_index, index){
    const producto = $(table).find("tr[producto]")[0];    
    const componentes = $(table).find("tr[componente_id]");
    const materias = $(table).find("tr[materia_id]");
    const state_componentes = {};
    const state_materias = {};
    for(var i = 0; i < componentes.length; ++i){
        state_componentes[parseInt($(componentes[i]).attr("componente_id"))] = componentes[i].innerHTML.substring(componentes[i].innerHTML.indexOf("</td>")+5,componentes[i].innerHTML.length);}
    for(var i = 0; i< materias.length; ++i)
        state_materias[parseInt($(materias[i]).attr("materia_id"))] = materias[i].innerHTML.substring(materias[i].innerHTML.indexOf("</td>")+5,materias[i].innerHTML.length);
    
    table_values.push({[state.producto.id]:producto.innerHTML.substring(producto.innerHTML.indexOf("</td>")+5,producto.innerHTML.length)})
    table_values.push(state_componentes);
    table_values.push(state_materias);        
    alterRespectiveTable(table, table_index, index);
}

function generateTHPeriod(index){
    switch(index){
        case 0:
            return  "<th>"+headers_periods[0][0]+"</th>"+
                    "<th>"+headers_periods[0][1]+"</th>"+
                    "<th>"+headers_periods[0][2]+"</th>"+
                    "<th>"+headers_periods[0][3]+"</th>"
        case 1:
            return  "<th>"+headers_periods[1][0]+"</th>"+
                    "<th>"+headers_periods[1][1]+"</th>"+
                    "<th>"+headers_periods[1][2]+"</th>"+
                    "<th>"+headers_periods[1][3]+"</th>"+
                    "<th>"+headers_periods[1][4]+"</th>"+
                    "<th>"+headers_periods[1][5]+"</th>"+
                    "<th>"+headers_periods[1][6]+"</th>"
        case 2:
            return  "<th>"+headers_periods[2][0]+"</th>"+
                    "<th>"+headers_periods[2][1]+"</th>"+
                    "<th>"+headers_periods[2][2]+"</th>"+
                    "<th>"+headers_periods[2][3]+"</th>"+
                    "<th>"+headers_periods[2][4]+"</th>"+
                    "<th>"+headers_periods[2][5]+"</th>"+
                    "<th>"+headers_periods[2][6]+"</th>"+
                    "<th>"+headers_periods[2][7]+"</th>"+
                    "<th>"+headers_periods[2][8]+"</th>"+
                    "<th>"+headers_periods[2][9]+"</th>"+
                    "<th>"+headers_periods[2][10]+"</th>"+
                    "<th>"+headers_periods[2][11]+"</th>"
    }
}

function generateNumberOfPeriod(index){
    switch(index){
        case 0: return 4;
        case 1: return 7;
        case 2: return 12;
    }
}




/* GENERAR JSON DE SALIDA CON LOS VALORES DE LAS TABLAS */

function generateJsonTablesMrp(){
    const tables = document.querySelectorAll("table[table-excel]");  
    const table_general = tables[3];
    const table_forecast = tables[current_index];
    const table_receptions = tables[current_index + 4];
    
    return {
        t_general: getValuesOfTable(table_general),
        t_forecast: getValuesSimpleOfTable(table_forecast),
        t_receptions: getValuesOfTable(table_receptions)
    };
}