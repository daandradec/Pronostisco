var current_index;
var callback_function;
var flagAdd, flagDelete;

function startButtonSelectable(){
    if(sessionStorage.getItem("time_periods")){
        current_index = sessionStorage.getItem("time_periods")
        updateTextSelector();
    }else{
        current_index = 4;
        sessionStorage.setItem("time_periods", current_index);
    }    

    $("button[selector-left]").click(function(){
        labelShiftLeft();
        updateTextSelector();
        callback_function(0, flagAdd, flagDelete);
        sessionStorage.setItem("time_periods", current_index);
    });

    $("button[selector-right]").click(function(){
        labelShiftRight();
        updateTextSelector();
        callback_function(1, flagAdd, flagDelete);
        sessionStorage.setItem("time_periods", current_index);
    });
}

function labelShiftLeft(){
    const old_value = current_index;
    current_index = Math.clip(current_index-1, 4 , 24);
    flagDelete = old_value !== 4;
}

function labelShiftRight(){
    const old_value = current_index;
    current_index = Math.clip(current_index+1, 4, 24);
    flagAdd = old_value !== 24;
}

function updateTextSelector(){
    document.querySelector("p[selector]").innerHTML = current_index + " Periodos";
}


function selectableSetCallbackFunction(func){
    callback_function = func;
}