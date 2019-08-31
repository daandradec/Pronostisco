function removeRowMRP(button){    
    const tr = button.parentElement.parentElement;    
    const flag = JSON.parse( tr.getAttribute("flag_component") );     
    if(flag){        
        const id = parseInt(tr.getAttribute("componente_id"));          
        deleteComponente(id);
        saveSelectsStates();
        $(tr).remove();
        selectAllSelectsAndSetOptions();       
    }else{
        const id = parseInt(tr.getAttribute("materia_id")); 
        deleteMateria(id);
        saveSelectsStates();
        $(tr).remove();
        selectAllSelectsAndSetOptions();    
    } 

    for(var i = 0; i < state.componentes.length; ++i){
        const id = state.componentes[i].id;
        alterParentEdgesComponents(id, "tr[componente_id='"+id+"'] select", addParentComponentExtended);
    }
    for(var i = 0; i < state.materia.length; ++i){
        const id = state.materia[i].id;
        alterParentEdgesComponents(id, "tr[materia_id='"+id+"'] select", addParentMaterExtended);
    }    

    updateTree("DELETE", undefined);    
}