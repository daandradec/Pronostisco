var current_index;
var callback_function;
var flagAdd, flagDelete;

function startButtonSelectable(){
    current_index = 4;

    $("button[selector-left]").click(function(){
        labelShiftLeft();
        updateTextSelector();
        callback_function(0, flagAdd, flagDelete);
    });

    $("button[selector-right]").click(function(){
        labelShiftRight();
        updateTextSelector();
        callback_function(1, flagAdd, flagDelete);
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