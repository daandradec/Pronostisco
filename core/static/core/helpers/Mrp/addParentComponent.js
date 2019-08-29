/* AÑADIR PADRE AL COMPONENTE QUE PERTENECE SIN REPETIDOS */
function addParentComponent(id_component, key_parent){
    var index_component = getIndexWithBinarySearchJson(id_component, state.componentes);
    if(state.componentes[index_component].edges.indexOf(key_parent) === -1){
        state.componentes[index_component].edges.push(key_parent);
        state.componentes[index_component].amount[key_parent] = 1;
    }else
        state.componentes[index_component].amount[key_parent] += 1;
}
function addParentComponentExtended(id_component, keys_parents){
    var index_component = getIndexWithBinarySearchJson(id_component, state.componentes);
    state.componentes[index_component].edges = [];
    state.componentes[index_component].amount = {};
    for(var i = 0; i < keys_parents.length; ++i){
        if(state.componentes[index_component].edges.indexOf(keys_parents[i]) === -1){
            state.componentes[index_component].edges.push(keys_parents[i]); 
            state.componentes[index_component].amount[keys_parents[i]] = 1;
        }else
            state.componentes[index_component].amount[keys_parents[i]] += 1;
    }   
}

/* AÑADIR PADRE A LA MATERIA PRIMA QUE PERTENECE SIN REPETIDOS */
function addParentMater(id_mater, key_parent){
    var index_mater = getIndexWithBinarySearchJson(id_mater, state.materia);
    if(state.materia[index_mater].edges.indexOf(key_parent) === -1){
        state.materia[index_mater].edges.push(key_parent);    
        state.materia[index_component].amount[key_parent] = 1;
    }else
        state.materia[index_component].amount[key_parent] += 1;        
}
function addParentMaterExtended(id_mater, keys_parents){
    var index_mater = getIndexWithBinarySearchJson(id_mater, state.materia);
    state.materia[index_mater].edges = [];
    for(var i = 0; i < keys_parents.length; ++i){
        if(state.materia[index_mater].edges.indexOf(keys_parents[i]) === -1){
            state.materia[index_mater].edges.push(keys_parents[i]); 
            state.materia[index_component].amount[keys_parents[i]] = 1;
        }else
            state.materia[index_component].amount[keys_parents[i]] += 1;
    }   
}