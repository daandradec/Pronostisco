const td = "<td></td>";
var table_values = [];

var flagGeneralTable = true; /* para ejecutar una sola vez */
var flagRewriteTH = true;

function tabsTables(state, flagAdd, flagDelete){
    const tables = document.querySelectorAll("table[table-excel]");
    switch(state){
        case 0:
            if(flagDelete){ // borrar columna
                removeColumn(tables[0]);removeColumn(tables[2]);awake();selectAllTdQueryCellExcelTH();
            }
            break;
        case 1:
            if(flagAdd){ // añadir columna
                addColumn(tables[0]);addColumn(tables[2]);awake();selectAllTdQueryCellExcelTH();
            }
            break;            
    }  
}

function fillTableRowsByCurrentPeriod(){
    const tables = document.querySelectorAll("table[table-excel]");  
    alterRespectiveTable(tables[0], 0);
    alterRespectiveTable(tables[1], 1);
    alterRespectiveTable(tables[2], 2);      
    awake();
    selectAllTdQueryCellExcelTH();
}

function alterRespectiveTable(table, table_index){      
    switch(table_index){
        case 0:
            table.children[0].innerHTML = "<tr><th>PERIODOS</th>"+generateTHPeriod(current_index)+"</tr>";
            table.children[1].innerHTML = "<tr><td>Demanda Producto</td>"+td.repeat(current_index)+"</tr>";
            break;
        case 1:
            if(flagGeneralTable){
                table.children[0].innerHTML = getCurrentLanguage() == 'ES' ? "<tr><th>Mrp Tree</th><th>Lead Time <input type='checkbox' id='toggle-lead' checked data-toggle='toggle' data-width='40' data-height='25' data-style='bootstrap-toggle-mrp'></th>"+
                                              "<th>Stock de Seguridad <input type='checkbox' id='toggle-stock' checked data-toggle='toggle' data-width='40' data-height='25' data-style='bootstrap-toggle-mrp'></th><th>Inventario Inicial</th>"+
                                              "<th>Tamaño De Lote <input type='checkbox' id='toggle-q' checked data-toggle='toggle' data-width='40' data-height='25' data-style='bootstrap-toggle-mrp'></th><th>Costo Unitario</th><th>Costo de Mantenimiento</th><th>Costo de Ordenar</th></tr>"
                                              : "<tr><th>Mrp Tree</th><th>Lead Time <input type='checkbox' id='toggle-lead' checked data-toggle='toggle' data-width='40' data-height='25' data-style='bootstrap-toggle-mrp'></th>"+
                                              "<th>Security Stock<input type='checkbox' id='toggle-stock' checked data-toggle='toggle' data-width='40' data-height='25' data-style='bootstrap-toggle-mrp'></th><th>Initial Inventory</th>"+
                                              "<th>Lot size <input type='checkbox' id='toggle-q' checked data-toggle='toggle' data-width='40' data-height='25' data-style='bootstrap-toggle-mrp'></th><th>Unit cost</th><th>Maintenance Cost</th><th>Ordering Cost</th></tr>";
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
            if(flagRewriteTH){
                table.children[0].innerHTML = "<tr><th>Mrp Tree</th>"+generateTHPeriod(current_index)+"</tr>";    
                flagRewriteTH = false;         
            }            
                
            fillRemainingTable(table, current_index);   
            break;
    }
}
/* LLENAR LA TABLA CON LA INFORMACIÓN ALMACENADA DESPUES DE LA LIMPIEZA O CON UNOS TD.REPEAT VACIOS */
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
/* LLAMADO CUANDO SE HACE UN FADE DE LA VENTANA DEL ARBOL A LA DE LAS TABLAS */
function seeChangeStateMRPToTable(){
    const tables = document.querySelectorAll("table[table-excel]");
    saveStateTableAndReFill(tables[1], 1);
    saveStateTableAndReFill(tables[2], 2);
    awake();
    selectAllTdQueryCellExcelTH();
    changeStatusColDisabled($(tables[1].children[1]).find("tr td:nth-child(2)"), toggleFlagLead);
    changeStatusColDisabled($(tables[1].children[1]).find("tr td:nth-child(3)"), toggleFlagStock);
    changeStatusColDisabled($(tables[1].children[1]).find("tr td:nth-child(5)"), toggleFlagQstar);
}
/* GUARDAR EN UN JSON LOS VALORES QUE TIENEN LAS TABLAS ANTES DE RELLENARLAS DE NUEVO */
function saveStateTableAndReFill(table, table_index){
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
    alterRespectiveTable(table, table_index);    
}

function generateTHPeriod(repeats){
    var th = "";
    for(var i = 1; i <= repeats; ++i)
        th += "<th cell-excel-th='true' cell-index='"+i+"'>"+i+"</th>";
    return th;
}

function addColumn(table){
    const thead = table.children[0].children[0];
    const trows = table.children[1].children;
    thead.innerHTML += "<th cell-excel-th='true' cell-index='"+current_index+"'>"+current_index+"</th>";
    for(var i = 0; i < trows.length; ++i)
        trows[i].innerHTML += "<td></td>";
}

function removeColumn(table){
    const thead = table.children[0].children[0];
    const trows = table.children[1].children;
    thead.innerHTML = thead.innerHTML.substring(0,thead.innerHTML.lastIndexOf("<th cell-excel-th"))
    for(var i = 0; i < trows.length; ++i)
        trows[i].innerHTML = trows[i].innerHTML.substring(0,trows[i].innerHTML.lastIndexOf("<td>"))
}




/* GENERAR JSON DE SALIDA CON LOS VALORES DE LAS TABLAS */

function generateJsonTablesMrp(){
    const tables = document.querySelectorAll("table[table-excel]");  
    const table_forecast = tables[0];
    const table_general = setQto1(getValuesOfTable(tables[1]));
    const table_receptions = tables[2];

    return {
        t_general: table_general,
        t_forecast: getValuesSimpleOfTable(table_forecast),
        t_receptions: getValuesOfTable(table_receptions),
        t_labels: getLabelsOfTable(table_forecast)
    };
}

function setQto1(general_table){
    for(var i = 0;i < general_table.length; ++i){
        if(general_table[i][3] === 0)
            general_table[i][3] = 1
    }
    return general_table
}

function saveStateLocalStorage(){
    const tables = document.querySelectorAll("table[table-excel]");
    table_forecast = tables[0].children[1].innerHTML
    table_general = saveStateTable(tables[1])
    table_receptions = saveStateTable(tables[2])

    sessionStorage.setItem("table_forecast",table_forecast)
    sessionStorage.setItem("table_general",JSON.stringify(table_general))
    sessionStorage.setItem("table_receptions",JSON.stringify(table_receptions))
}

function saveStateTable(table){
    var values = [];
    const producto = $(table).find("tr[producto]")[0];    
    const componentes = $(table).find("tr[componente_id]");
    const materias = $(table).find("tr[materia_id]");
    const state_componentes = {};
    const state_materias = {};
    for(var i = 0; i < componentes.length; ++i){
        state_componentes[parseInt($(componentes[i]).attr("componente_id"))] = componentes[i].innerHTML.substring(componentes[i].innerHTML.indexOf("</td>")+5,componentes[i].innerHTML.length);}
    for(var i = 0; i< materias.length; ++i)
        state_materias[parseInt($(materias[i]).attr("materia_id"))] = materias[i].innerHTML.substring(materias[i].innerHTML.indexOf("</td>")+5,materias[i].innerHTML.length);
    
    values.push({[state.producto.id]:producto.innerHTML.substring(producto.innerHTML.indexOf("</td>")+5,producto.innerHTML.length)})
    values.push(state_componentes);
    values.push(state_materias);
    return values
}