function loadSavedDataTree(){
    if(sessionStorage.getItem("tree_mrp") == null)
        return
    tree_mrp = JSON.parse(sessionStorage.getItem("tree_mrp"))
    D3Tree(tree_mrp);  

    // Recargar MRP
    state = JSON.parse(sessionStorage.getItem("state_mrp"))

    $("#nombre-producto")[0].value = state.producto.title;

    for(var i = 0; i < state.componentes.length; ++i){
        var component = state.componentes[i]
        document.querySelector("table[mrptrigger=compo] tbody").innerHTML += 
        "<tr componente_id='"+component.id+"' flag_component='true'>" +
            "<td class='w-20 position-relative'>" +
            "<button type='button' class='close position-absolute' style='top:0px;right:5px;' onclick='removeRowMRP(this)'>" +
            "<span aria-hidden='true'>&times;</span></button>"+
            component.id+"</td>"+
            "<td class='w-40' cell-excel='true'>"+component.title+"</td>"+
            "<td class='w-40 pt-2'>"+
                last_tr +
                "<select class='w-55-100-md' select-mrp key='"+component.key+"' id='"+component.id+"'>"+
                    generateOptions(component.id) +
                "</select>"+       
                last_tr_footer +
                last_tr_button_footer_compo +
            "</td>"+
        "</tr>";
    }

    for(var i = 0; i < state.componentes.length; ++i){
        const component = state.componentes[i]
        const form_select_and_number = document.querySelector("tr[componente_id='"+component.id+"']").children[2].children[0]

        // insertando todos los selects y numbers
        for(var j = 1; j < component.edges.length; ++j){
            form_select_and_number.innerHTML += 
            form_literal_parent_header +
                "<select class='w-55-100-md' select-mrp key='compo_"+component.id+"_"+(form_select_and_number.children.length+1)+"' id='"+component.id+"'>"+
                    generateOptions(component.id) +
                "</select>"+ 
            form_literal_parent_footer;     
        }
        
        // setteando los valores        
        for(var k = 0; k < form_select_and_number.children.length; ++k){
            const form = form_select_and_number.children[k];
            const select = form.children[0].children[0].children[0].querySelector("select")
            const number = form.children[0].children[0].children[1].children[1]               
            select.value = getIdFromKey(component.edges[k], state.componentes); //id obtenido por la llave
            number.value = component.amount[component.edges[k]];
        }
                
        state.componentes[i].amount_backup = Array.from(Object.values(state.componentes[i].amount))
    }
    
    saveSelectsStates();
    selectAllSelectsAndSetOptions();
    switchOffForms();
    initializeMrpParentEvents();

    
    for(var i = 0; i < state.materia.length; ++i){
        var materia = state.materia[i]
        document.querySelector("table[mrptrigger=mater] tbody").innerHTML += 
        "<tr materia_id='"+materia.id+"' flag_component='false'>"+
            "<td class='w-20 position-relative'>" + 
            "<button type='button' class='close position-absolute' style='top:0px;right:5px;' onclick='removeRowMRP(this)'>" +
            "<span aria-hidden='true'>&times;</span></button>"+            
            materia.id+"</td>"+
            "<td class='w-40' cell-excel='true'>"+materia.title+"</td>"+
            "<td class='w-40'>"+
                last_tr +
                "<select class='w-55-100-md' select-mrp key='"+materia.key+"' id='"+materia.id+"'>"+
                    generateOptions(-1) +
                "</select>"+
                last_tr_footer +
                last_tr_button_footer_mater +
            "</td>"+
        "</tr>";
    }        

    for(var i = 0; i < state.materia.length; ++i){
        const materia = state.materia[i]
        const form_select_and_number = document.querySelector("tr[materia_id='"+materia.id+"']").children[2].children[0]

        // insertando todos los selects y numbers
        for(var j = 1; j < materia.edges.length; ++j){
            form_select_and_number.innerHTML += 
            form_literal_parent_header +
                "<select class='w-55-100-md' select-mrp key='mater_"+materia.id+"_"+(form_select_and_number.children.length+1)+"' id='"+materia.id+"'>" +
                    generateOptions(-1) +
                "</select>"+ 
            form_literal_parent_footer;
        }
      
        
        // setteando los valores        
        for(var k = 0; k < form_select_and_number.children.length; ++k){
            const form = form_select_and_number.children[k];
            
            const select = form.children[0].children[0].children[0].querySelector("select")
            const number = form.children[0].children[0].children[1].children[1]               
            select.value = getIdFromKey(materia.edges[k], state.componentes); //id obtenido por la llave
            number.value = materia.amount[materia.edges[k]];
        }
        
        state.materia[i].amount_backup = Array.from(Object.values(state.materia[i].amount))
    }
    
    saveSelectsStates();
    selectAllSelectsAndSetOptions();
    switchOffForms();
    initializeMrpMaterParentEvents();

    componentes_counter = state.componentes.length ? state.componentes[state.componentes.length-1].id+1 : 1
    materia_counter = state.materia.length ? state.materia[state.materia.length-1].id+1 : 1

}








//// LIMPIAR SESION MRP
function cleanMRPSession(){
    $("button[refresh-mrp]").on('click',function(){
        sessionStorage.removeItem("tree_mrp")
        sessionStorage.removeItem("state_mrp")
        sessionStorage.removeItem("table_forecast")
        sessionStorage.removeItem("table_general")
        sessionStorage.removeItem("table_receptions")
        window.location.reload(true)
    });
}