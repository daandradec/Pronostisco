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
        default_value = old_selecteds.filter(function(item){ return item.key === default_value});
        handleSelectChange(selects[i]);        
        if(default_value === undefined || default_value.length === 0){
            $(selects[i]).val(0);
            continue;        
        }else if(default_value[0].value !== "0" && getIndexWithBinarySearchJson(parseInt(default_value[0].value),state.componentes) === -1){
            $(selects[i]).val(0);
            continue;        
        }
        
        var id = parseInt($(selects[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement).attr("componente_id"));
        selects[i].innerHTML = generateOptions(id);
        $(selects[i]).val(default_value[0].value);        
    }        

}

function saveSelectsStates(){
    var selects = document.querySelectorAll("select[select-mrp]");
    old_selecteds = []
    for(var i = 0; i < selects.length; ++i)
        old_selecteds.push({id:$(selects[i]).attr("id"),key:$(selects[i]).attr("key"), value:selects[i].value})
    
}




/* MANEJAR EL ONCHANGE DE LOS SELECTS RESCRIBIENDO LOS VERTICES DE UN COMPONENTE O MATERIA AL CAMBIO */
function handleSelectChange(select){
    select.onchange = function(e){
        const tr = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const flag = JSON.parse( tr.getAttribute("flag_component") ); 
        if(flag){
            const id = parseInt(tr.getAttribute("componente_id"));            
            alterParentEdgesComponents(id, "tr[componente_id='"+id+"'] select", addParentComponentExtended);
        }else{
            const id = parseInt(tr.getAttribute("materia_id")); 
            alterParentEdgesComponents(id, "tr[materia_id='"+id+"'] select", addParentMaterExtended);
        }         
    }
}

function alterParentEdgesComponents(id, literal_string_selectsquery, callBackFunction){
    const selects = document.querySelectorAll(literal_string_selectsquery);
    const values = getSelectListValues(selects);
    const keys = getKeyFromValues(values); 
    callBackFunction(id, keys);
}

function getSelectListValues(selectList){
    const list = [];
    for(var i = 0; i < selectList.length; ++i)
        list.push(parseInt(selectList[i].value));
    return list;
}
function getKeyFromValues(values){
    const list = [];
    for(var i = 0;i < values.length; ++i){
        const value = values[i];        
        const key = value === 0 ? state.producto.key : state.componentes[getIndexWithBinarySearchJson(value, state.componentes)].key;        
        list.push(key);
    }
    return list;
}