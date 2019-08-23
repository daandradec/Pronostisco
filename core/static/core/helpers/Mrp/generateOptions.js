old_selecteds = []

function generateOptions(id){
    var options = "<option value='0'>"+state.producto.title+"</option>";
    state.componentes.map(function(json_comp){
        if(json_comp.id === id)
            return;
        options += "<option value='"+json_comp.id+"'>"+json_comp.title+"</option>";
    });
    return options;
}

/* RESCRIBIR EN TODOS LOS SELECTS SUS OPTIONS ALMACENANDO SU VALOR POR DEFECTO */
function selectAllSelectsAndSetOptions(){
    var selects = document.querySelectorAll("select[select-mrp]");
    for(var i = 0; i < selects.length; ++i){
        var default_value = selects[i].getAttribute("key");
        default_value = old_selecteds.filter(function(item){ return item.key == default_value});
        
        if(default_value === undefined || default_value.length === 0)
            continue;        
        
        var id = parseInt($(selects[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement).attr("componente_id"));
        selects[i].innerHTML = generateOptions(id);
        $(selects[i]).val(default_value[0].value);

    }        

}

function saveSelectsStates(){
    var selects = document.querySelectorAll("select[select-mrp]");
    old_selecteds = []
    for(var i = 0; i < selects.length; ++i)
        old_selecteds.push({key:$(selects[i]).attr("key"), value:selects[i].value})
    
}