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

