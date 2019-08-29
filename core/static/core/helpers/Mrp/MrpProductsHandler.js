/* ACTUALIZAR EL STATE AL KEYUP DEL INPUT TEXT DEL EXCEL-CELL DE UN COMPONENTE O MATERIA PRIMA */
function updateStateProduct(e){    
    const tr = e.target.parentElement.parentElement;
    const flag = JSON.parse( tr.getAttribute("flag_component") );   
    if(flag){
        const id = parseInt(tr.getAttribute("componente_id"));
        state.componentes[searchIndexInList(id, state.componentes)].title = e.target.value;
    }else{
        const id = parseInt(tr.getAttribute("materia_id"));
        state.materia[searchIndexInList(id, state.materia)].title = e.target.value;
    }
    saveSelectsStates();
    selectAllSelectsAndSetOptions();
    updateTree("NAME", undefined);
}

function searchIndexInList(id, list){
    var index = 0;
    for(var i = 1;i < list.length; ++i){
        if(list[i].id === id){
            index = i;
            break;
        }
    }
    return index;
}



/* AÑADIR PADRE AL COMPONENTE QUE PERTENECE SIN REPETIDOS */
function addParentComponent(id_component, key_parent){
    var index_component = getIndexWithBinarySearchJson(id_component, state.componentes);
    if(state.componentes[index_component].edges.indexOf(key_parent) === -1)
        state.componentes[index_component].edges.push(key_parent);    
}
function addParentComponentExtended(id_component, keys_parents){
    var index_component = getIndexWithBinarySearchJson(id_component, state.componentes);
    state.componentes[index_component].edges = [];
    for(var i = 0; i < keys_parents.length; ++i){
        if(state.componentes[index_component].edges.indexOf(keys_parents[i]) === -1)
            state.componentes[index_component].edges.push(keys_parents[i]); 
    }   
}

/* AÑADIR PADRE A LA MATERIA PRIMA QUE PERTENECE SIN REPETIDOS */
function addParentMater(id_mater, key_parent){
    var index_mater = getIndexWithBinarySearchJson(id_mater, state.materia);
    if(state.materia[index_mater].edges.indexOf(key_parent) === -1)
        state.materia[index_mater].edges.push(key_parent);    
}
function addParentMaterExtended(id_mater, keys_parents){
    var index_mater = getIndexWithBinarySearchJson(id_mater, state.materia);
    state.materia[index_mater].edges = [];
    for(var i = 0; i < keys_parents.length; ++i){
        if(state.materia[index_mater].edges.indexOf(keys_parents[i]) === -1)
            state.materia[index_mater].edges.push(keys_parents[i]); 
    }   
}