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
    handleInputNumberChange();
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
        updateTree("SELECT", undefined);        
    }
}

function handleInputNumberChange(){
    const inputs = document.querySelectorAll("input[type=number]");
    for(var i = 0; i< inputs.length; ++i){
        inputs[i].onchange = function(e){
            const tr = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            const flag = JSON.parse( tr.getAttribute("flag_component") ); 
            const form = this.parentElement.parentElement.children[0];
            const value_select_associated = parseInt(form.children[form.children.length-1].value);   
            
            if(flag){
                const id = parseInt(tr.getAttribute("componente_id"));            
                const key = value_select_associated === 0 ? state.producto.key : state.componentes[getIndexWithBinarySearchJson(value_select_associated, state.componentes)].key;        
                state.componentes[id-1].amount[key] = generateNewNumberValue("tr[componente_id='"+id+"'] select", value_select_associated);
            }else{
                const id = parseInt(tr.getAttribute("materia_id")); 
                const key = value_select_associated === 0 ? state.producto.key : state.materia[getIndexWithBinarySearchJson(value_select_associated, state.materia)].key;                        
                state.materia[id-1].amount[key] = generateNewNumberValue("tr[materia_id='"+id+"'] select", value_select_associated);
            }  
            console.log(state);      
            //updateTree("SELECT", undefined);             
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

function generateNewNumberValue(literal_string_selectsquery, value_select_associated){
    const selects = document.querySelectorAll(literal_string_selectsquery);
    const values = getSelectListValues(selects);
    var number_value = 0;
    for(var i = 0; i < values.length; ++i){
        if(values[i] === value_select_associated){
            const form = selects[i].parentElement.parentElement.children[1];
            number_value += parseInt(form.children[form.children.length-1].value);
        }
    }
    return number_value;
}