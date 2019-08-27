function removeRowSelect(button){
    const form = button.parentElement.parentElement.parentElement.parentElement;
    const tr = form.parentElement.parentElement.parentElement;
    const flag = JSON.parse( tr.getAttribute("flag_component") ); 
    $(form).remove();

    if(flag){
        const id = parseInt(tr.getAttribute("componente_id"));            
        alterParentEdgesComponents(id, "tr[componente_id='"+id+"'] select", addParentComponentExtended);
    }else{
        const id = parseInt(tr.getAttribute("materia_id")); 
        alterParentEdgesComponents(id, "tr[materia_id='"+id+"'] select", addParentMaterExtended);
    }  
}