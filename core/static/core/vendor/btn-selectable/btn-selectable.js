var current_index;
var callback_function;


function startButtonSelectable(){
    current_index = 4;

    $("button[selector-left]").click(function(){
        labelShiftLeft();
        updateTextSelector();
        callback_function(current_index);
    });

    $("button[selector-right]").click(function(){
        labelShiftRight();
        updateTextSelector();
        callback_function(current_index);
    });
}

function labelShiftLeft(){
    current_index = Math.clip(current_index-1, 4 , 24);
}

function labelShiftRight(){
    current_index = Math.clip(current_index+1, 4, 24);
}

function updateTextSelector(){
    document.querySelector("p[selector]").innerHTML = current_index + " Periodos";
}


function selectableSetCallbackFunction(func){
    callback_function = func;
}