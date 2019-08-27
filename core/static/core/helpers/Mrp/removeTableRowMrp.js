function removeRow(button){
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
        $(tr).remove();
    } 
}